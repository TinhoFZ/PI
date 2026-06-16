import { useEffect, useState } from "react";

import api from "../api/api";
import type { Zone } from "../types/Zone";
import Navbar from "../components/Navbar";
import ZoneDetails from "./ZonesDetails";

export default function ZonesList() {
    const [zones, setZones] = useState<Zone[]>([]);
    const [selectedZone, setSelectedZone] = useState<Zone | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function load() {
            try {
                const response = await api.get<Zone[]>("/zones");
                setZones(response.data);
            } finally {
                setLoading(false);
            }
        }

        load();
    }, []);

    if (loading) {
        return (
            <>
                <Navbar />
                <p>Carregando...</p>
            </>
        );
    }

    return (
        <>
            <Navbar />
            <h1>Zonas</h1>

            <div style={{ display: "grid", gridTemplateColumns: "minmax(260px, 1fr) minmax(260px, 1fr)", gap: 16 }}>
                <div>
                    {zones.map((zone) => (
                        <button
                            key={zone.zone_id}
                            style={{
                                width: "100%",
                                textAlign: "left",
                                padding: 12,
                                marginBottom: 8,
                                borderRadius: 8,
                                border: "1px solid #ddd",
                                background: "white",
                                cursor: "pointer",
                            }}
                            onClick={() => setSelectedZone(zone)}
                        >
                            <div style={{ fontWeight: 700 }}>{zone.name}</div>
                            <div style={{ opacity: 0.8, fontSize: 13, marginTop: 4 }}>
                                {zone.description}
                            </div>
                        </button>
                    ))}
                </div>

                <div>
                    <ZoneDetails
                        zone={selectedZone}
                        onClose={() => setSelectedZone(null)}
                    />
                </div>
            </div>
        </>
    );
}

