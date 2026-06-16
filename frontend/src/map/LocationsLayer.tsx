import { Marker, Popup } from "react-leaflet";
import type { Location } from "../types/location";

type Props = {
    locations: Location[];
};

export default function LocationsLayer({ locations }: Props) {
    return (
        <>
            {locations.map((loc) => (
                <Marker
                    key={loc.location_id}
                    position={[
                        loc.coordinate[0],
                        loc.coordinate[1],
                    ]}
                >
                    <Popup>
                        <h3>{loc.name}</h3>
                        <p>{loc.description}</p>
                        {loc.type && <small>Type: {loc.type}</small>}
                    </Popup>
                </Marker>
            ))}
        </>
    );
}