
const express = require("express");
const { db } = require("../config/firebase");
const authenticate = require("../middleware/authenticate");
const { geohashQueryBounds, distanceBetween } = require("geofire-common");

const router = express.Router();

function isInsideViewport(latitude, longitude, bounds) {
    return (
        latitude >= bounds.minLat &&
        latitude <= bounds.maxLat &&
        longitude >= bounds.minLng &&
        longitude <= bounds.maxLng
    );
}

function pointInPolygon(latitude, longitude, polygon) {
    let inside = false;

    for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
        const xi = polygon[i].longitude;
        const yi = polygon[i].latitude;
        const xj = polygon[j].longitude;
        const yj = polygon[j].latitude;

        const intersects =
            (yi > latitude) !== (yj > latitude) &&
            longitude < ((xj - xi) * (latitude - yi)) / (yj - yi) + xi;

        if (intersects) inside = !inside;
    }

    return inside;
}

function orientation(a, b, c) {
    return (
        (b.longitude - a.longitude) * (c.latitude - a.latitude) -
        (b.latitude - a.latitude) * (c.longitude - a.longitude)
    );
}

function segmentsIntersect(a, b, c, d) {
    const o1 = orientation(a, b, c);
    const o2 = orientation(a, b, d);
    const o3 = orientation(c, d, a);
    const o4 = orientation(c, d, b);

    return o1 * o2 <= 0 && o3 * o4 <= 0;
}

function zoneIntersectsViewport(boundaries, bounds) {
    if (!Array.isArray(boundaries) || boundaries.length < 3) {
        return false;
    }

    const polygon = boundaries.map(point => ({
        latitude: point.latitude,
        longitude: point.longitude
    }));

    if (polygon.some(point =>
        isInsideViewport(point.latitude, point.longitude, bounds)
    )) {
        return true;
    }

    const corners = [
        { latitude: bounds.minLat, longitude: bounds.minLng },
        { latitude: bounds.minLat, longitude: bounds.maxLng },
        { latitude: bounds.maxLat, longitude: bounds.maxLng },
        { latitude: bounds.maxLat, longitude: bounds.minLng }
    ];

    if (corners.some(corner =>
        pointInPolygon(corner.latitude, corner.longitude, polygon)
    )) {
        return true;
    }

    const viewportEdges = corners.map((corner, i) => [
        corner,
        corners[(i + 1) % corners.length]
    ]);

    for (let i = 0; i < polygon.length; i++) {
        const a = polygon[i];
        const b = polygon[(i + 1) % polygon.length];

        for (const [c, d] of viewportEdges) {
            if (segmentsIntersect(a, b, c, d)) {
                return true;
            }
        }
    }

    return false;
}

function serializeGeoPoint(point) {
    return {
        latitude: point.latitude,
        longitude: point.longitude
    };
}

router.get("/", authenticate, async (req, res) => {
    try {
        const bounds = {
            minLat: Number(req.query.minLat),
            maxLat: Number(req.query.maxLat),
            minLng: Number(req.query.minLng),
            maxLng: Number(req.query.maxLng)
        };

        if (
            Object.values(bounds).some(value => !Number.isFinite(value)) ||
            bounds.minLat < -90 ||
            bounds.maxLat > 90 ||
            bounds.minLng < -180 ||
            bounds.maxLng > 180 ||
            bounds.minLat >= bounds.maxLat ||
            bounds.minLng >= bounds.maxLng
        ) {
            return res.status(400).json({
                error: "Invalid viewport boundaries"
            });
        }

        const zonesSnapshot = await db.collection("zones").get();

        const zones = zonesSnapshot.docs
            .filter(doc =>
                zoneIntersectsViewport(
                    doc.data().boundaries,
                    bounds
                )
            )
            .map(doc => {
                const data = doc.data();

                return {
                    id: doc.id,
                    name: data.name,
                    description: data.description,
                    boundaries: data.boundaries.map(serializeGeoPoint)
                };
            });

        const center = [
            (bounds.minLat + bounds.maxLat) / 2,
            (bounds.minLng + bounds.maxLng) / 2
        ];

        const corners = [
            [bounds.minLat, bounds.minLng],
            [bounds.minLat, bounds.maxLng],
            [bounds.maxLat, bounds.minLng],
            [bounds.maxLat, bounds.maxLng]
        ];

        const radius = Math.max(
            ...corners.map(corner => distanceBetween(center, corner))
        ) * 1000;

        const queryBounds = geohashQueryBounds(center, radius);

        const locationSnapshots = await Promise.all(
            queryBounds.map(([start, end]) =>
                db.collectionGroup("locations")
                    .orderBy("geohash")
                    .startAt(start)
                    .endAt(end)
                    .get()
            )
        );

        const locationMap = new Map();

        for (const snapshot of locationSnapshots) {
            for (const doc of snapshot.docs) {
                if (locationMap.has(doc.ref.path)) continue;

                const data = doc.data();

                if (!data.coordinates || !data.geohash) continue;

                const latitude = data.coordinates.latitude;
                const longitude = data.coordinates.longitude;

                if (!isInsideViewport(latitude, longitude, bounds)) {
                    continue;
                }

                locationMap.set(doc.ref.path, {
                    id: doc.id,
                    name: data.name,
                    description: data.description,
                    imageUrl: data.imageUrl,
                    type: data.type,
                    coordinates: serializeGeoPoint(data.coordinates)
                });
            }
        }

        res.status(200).json({
            zones,
            locations: Array.from(locationMap.values())
        });

    } catch (error) {
        console.error("Get map data error:", error);

        res.status(500).json({
            error: "Could not retrieve map data"
        });
    }
});

module.exports = router;
