import { Polygon, Popup } from "react-leaflet";
import type { Zone } from "../types/Zone";
import MapPopup from "./MapPopup";

type Props = {
    zones: Zone[];
    onSelectZone: (zone: Zone) => void;
};

export default function ZonesLayer({ zones, onSelectZone }: Props) {
    return (
        <>
            {zones.map((zone) => (
                <Polygon
                    key={zone.zone_id}
                    positions={zone.geometry}
                    eventHandlers={{
                        click: () => onSelectZone(zone),
                    }}
                >
                    <Popup>
                        <MapPopup
                            title={zone.name}
                            description={zone.description}
                            subtitle="Zona"
                        />
                    </Popup>
                </Polygon>
            ))}
        </>
    );
}