import { useEffect, useState } from "react";
import api from "../api/api";
import type { Zone } from "../types/Zone";

export default function Zones() {
    const [zones, setZones] = useState<Zone[]>(
        []
    );

    useEffect(() => {
        async function loadZones() {
            const response = await api.get<
                Zone[]
            >("/zones");

            setZones(response.data);
        }

        loadZones();
    }, []);

    return (
        <>
            <h1>Zonas</h1>

            {zones.map((zone) => (
                <div key={zone.id}>
                    <h3>{zone.name}</h3>
                    <p>{zone.description}</p>
                </div>
            ))}
        </>
    );
}