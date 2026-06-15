import { useEffect, useState } from "react";

import {
    MapContainer,
    TileLayer,
    Marker,
    Popup,
    Polygon,
} from "react-leaflet";

import { getZones } from "../services/zoneService";
import { getTreasures } from "../services/treasureService";

export default function Map() {
    const [zones, setZones] = useState<any[]>([]);
    const [treasures, setTreasures] = useState<any[]>([]);

    useEffect(() => {
        async function load() {
            try {
                const z = await getZones();
                const t = await getTreasures();

                // 🔥 NORMALIZA ZONES
                const safeZones = z
                    .map((zone: any) => {
                        let geom = zone.geometry;

                        if (typeof geom === "string") {
                            try {
                                geom = JSON.parse(geom);
                            } catch {
                                return null;
                            }
                        }

                        if (!Array.isArray(geom)) return null;

                        const valid = geom.every(
                            (p: any) =>
                                Array.isArray(p) &&
                                typeof p[0] === "number" &&
                                typeof p[1] === "number"
                        );

                        if (!valid) return null;

                        return {
                            ...zone,
                            geometry: geom,
                        };
                    })
                    .filter(Boolean);

                // 🔥 NORMALIZA TREASURES
                const safeTreasures = t
                    .map((treasure: any) => {
                        let coord = treasure.coordinate;

                        if (typeof coord === "string") {
                            try {
                                coord = JSON.parse(coord);
                            } catch {
                                return null;
                            }
                        }

                        if (
                            !Array.isArray(coord) ||
                            typeof coord[0] !== "number" ||
                            typeof coord[1] !== "number"
                        ) {
                            return null;
                        }

                        return {
                            ...treasure,
                            coordinate: coord,
                        };
                    })
                    .filter(Boolean);

                setZones(safeZones);
                setTreasures(safeTreasures);
            } catch (err) {
                console.error(err);
            }
        }

        load();
    }, []);

    console.log(zones);
    console.log(treasures);
    
    return (
        <MapContainer
            center={[-8.0476, -34.877] as [number, number]}
            zoom={13}
            style={{ width: "100%", height: "100vh" }}
        >
            <TileLayer
                attribution="&copy; OpenStreetMap contributors"
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {zones.map((zone) => (
                <Polygon
                    key={zone.zone_id}
                    positions={zone.geometry}
                >
                    <Popup>
                        <h3>{zone.name}</h3>
                        <p>{zone.description}</p>
                    </Popup>
                </Polygon>
            ))}

            {treasures.map((treasure) => (
                <Marker
                    key={treasure.treasure_id}
                    position={[
                        treasure.coordinate[0],
                        treasure.coordinate[1],
                    ]}
                >
                    <Popup>
                        <h3>{treasure.name}</h3>
                        <p>{treasure.description}</p>
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    );
}