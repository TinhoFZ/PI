import { useEffect, useState } from "react";

import { MapContainer, TileLayer } from "react-leaflet";

import { getZones } from "../services/zoneService";
import { getLocations } from "../services/locationService";

import type { Zone } from "../types/Zone";
import type { Location } from "../types/Location";

import ZonesLayer from "../Map/ZonesLayer";
import LocationsLayer from "../Map/LocationsLayer";

import ZonePanel from "../Map/ZonePanel";

import "../assets/map-popup.css";
import "../assets/panel-popup.css";

export default function Map() {
    const [zones, setZones] = useState<Zone[]>([]);
    const [locations, setLocations] = useState<Location[]>([]);
    const [loading, setLoading] = useState(true);

    const [selectedZone, setSelectedZone] = useState<Zone | null>(null);

    useEffect(() => {
        let mounted = true;

        async function load() {
            try {
                const [z, l] = await Promise.all([
                    getZones(),
                    getLocations(),
                ]);

                if (!mounted) return;

                const parsedZones: Zone[] = (z || [])
                    .map((zone: any) => {
                        const geom =
                            typeof zone.geometry === "string"
                                ? JSON.parse(zone.geometry)
                                : zone.geometry;

                        if (!Array.isArray(geom)) return null;

                        const valid = geom.every(
                            (p: any) =>
                                Array.isArray(p) &&
                                typeof p[0] === "number" &&
                                typeof p[1] === "number"
                        );

                        if (!valid) return null;

                        return { ...zone, geometry: geom };
                    })
                    .filter(Boolean);

                const parsedLocations: Location[] = (l || [])
                    .map((loc: any) => {
                        const coord =
                            typeof loc.coordinate === "string"
                                ? JSON.parse(loc.coordinate)
                                : loc.coordinate;

                        if (
                            !Array.isArray(coord) ||
                            typeof coord[0] !== "number" ||
                            typeof coord[1] !== "number"
                        ) {
                            return null;
                        }

                        return { ...loc, coordinate: coord };
                    })
                    .filter(Boolean);

                setZones(parsedZones);
                setLocations(parsedLocations);
            } catch (err) {
                console.error(err);
            } finally {
                if (mounted) setLoading(false);
            }
        }

        load();

        return () => {
            mounted = false;
        };
    }, []);

    if (loading) return <div>Loading map...</div>;

    return (
        <>
            <MapContainer
                center={[-8.0476, -34.877] as [number, number]}
                zoom={13}
                style={{ width: "100%", height: "100vh" }}
            >
                <TileLayer
                    url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png"
                    attribution="&copy; OpenStreetMap &copy; CartoDB"
                />

                <ZonesLayer
                    zones={zones}
                    onSelectZone={setSelectedZone}
                />

                <LocationsLayer
                    onSelectLocation={(loc) => {
                        const zone = zones.find((z) => z.zone_id === loc.zone_id);
                        if (zone) setSelectedZone(zone);
                    }}
                    locations={locations}
                />
            </MapContainer>

            <ZonePanel
                zone={selectedZone}
                onClose={() => setSelectedZone(null)}
            />
        </>
    );
}