const {
    geohashQueryBounds,
    distanceBetween
} = require("geofire-common");

async function getLocationsInBounds(bounds) {
    const centerLat = (bounds.north + bounds.south) / 2;
    const centerLng = (bounds.east + bounds.west) / 2;

    const corners = [
        [bounds.north, bounds.east],
        [bounds.north, bounds.west],
        [bounds.south, bounds.east],
        [bounds.south, bounds.west]
    ];

    const radius = Math.max(
        ...corners.map(corner =>
            distanceBetween(
                [centerLat, centerLng],
                corner
            )
        )
    ) * 1000;

    const ranges = geohashQueryBounds(
        [centerLat, centerLng],
        radius
    );

    const snapshots = await Promise.all(
        ranges.map(([start, end]) =>
            db.collection("locations")
                .orderBy("geohash")
                .startAt(start)
                .endAt(end)
                .limit(100)
                .get()
        )
    );

    const locations = new Map();

    snapshots.forEach(snapshot => {
        snapshot.docs.forEach(doc => {
            const data = doc.data();
            const lat = data.coordinate.latitude;
            const lng = data.coordinate.longitude;

            if (
                lat >= bounds.south &&
                lat <= bounds.north &&
                lng >= bounds.west &&
                lng <= bounds.east
            ) {
                locations.set(doc.id, {
                    id: doc.id,
                    ...data
                });
            }
        });
    });

    return Array.from(locations.values());
}