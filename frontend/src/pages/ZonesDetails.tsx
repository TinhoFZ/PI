import { useEffect, useState } from "react";

import api from "../api/api";
import type { Location } from "../types/Location";
import type { Zone } from "../types/Zone";

type Props = {
    zone: Zone | null;
    onClose: () => void;
};

export default function ZonesDetails({ zone, onClose }: Props) {
    const [locations, setLocations] = useState<Location[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        let mounted = true;

        async function load() {
            if (!zone) {
                setLocations([]);
                return;
            }

            setLoading(true);
            try {
                const response = await api.get<Location[]>(`/locations/zone/${zone.zone_id}`);
                if (!mounted) return;
                setLocations(response.data);
            } finally {
                if (mounted) setLoading(false);
            }
        }

        load();
        return () => {
            mounted = false;
        };
    }, [zone]);

    if (!zone) return <p>Selecione uma zona para ver detalhes.</p>;

    return (
        <div
            style={{
                border: "1px solid #ddd",
                borderRadius: 10,
                padding: 16,
                background: "white",
            }}
        >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <h2 style={{ margin: 0 }}>{zone.name}</h2>
                <button onClick={onClose} style={{ cursor: "pointer" }}>
                    Fechar
                </button>
            </div>

            <p style={{ opacity: 0.85 }}>{zone.description}</p>

            <h3>Locais nesta zona</h3>

            {loading ? (
                <p>Carregando locais...</p>
            ) : locations.length === 0 ? (
                <p>Sem locais para esta zona.</p>
            ) : (
                <div>
                    {locations.map((loc) => (
                        <div
                            key={loc.location_id}
                            style={{
                                border: "1px solid #eee",
                                borderRadius: 10,
                                padding: 12,
                                marginBottom: 10,
                            }}
                        >
                            <div style={{ fontWeight: 700 }}>{loc.name}</div>
                            <div style={{ fontSize: 13, opacity: 0.85 }}>Tipo: {loc.type || "-"}</div>
                            <p style={{ margin: "6px 0 0", opacity: 0.85 }}>{loc.description}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

