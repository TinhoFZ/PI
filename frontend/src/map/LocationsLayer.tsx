import { Marker, Popup } from "react-leaflet";
import type { Location } from "../types/Location";
import MapPopup from "./MapPopup";

type Props = {
    locations: Location[];
    onSelectLocation: (loc: Location) => void;
};

export default function LocationsLayer({ locations, onSelectLocation }: Props) {
    return (
        <>
            {locations.map((loc) => (
                <Marker
                    key={loc.location_id}
                    position={[loc.coordinate[0], loc.coordinate[1]]}
                    eventHandlers={{
                        click: () => onSelectLocation(loc),
                    }}
                >
                    <Popup>
                        <MapPopup
                            title={loc.name}
                            description={loc.description}
                            subtitle={loc.type}
                        />
                    </Popup>
                </Marker>
            ))}
        </>
    );
}