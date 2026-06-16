import { Polygon, Popup } from "react-leaflet";
import type { Zone } from "../types/Zone";

type Props = {
    zones: Zone[];
};

export default function ZonesLayer({ zones }: Props) {
    return (
        <>
            {zones.map((zone) => (
                <Polygon key={zone.zone_id} positions={zone.geometry}>
                    <Popup>
                        <h3>{zone.name}</h3>
                        <p>{zone.description}</p>
                    </Popup>
                </Polygon>
            ))}
        </>
    );
}