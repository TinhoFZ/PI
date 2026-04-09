import { Marker, Popup } from "react-leaflet"

type Props = {
  position: [number, number]
  name: string
  description?: string 
  image?: string       
}

export default function MapMarker({ position, name, description, image }: Props) {
  return (
    <Marker position={position}>
      <Popup>
        <div className="w-[200px]">
          
          {image && (
            <img 
              src={image} 
              alt={name} 
              className="w-full h-[100px] object-cover rounded-md mb-2"
            />
          )}

          <h3 className="font-bold text-sm">{name}</h3>
          
          <p className="text-xs text-gray-600">
            {description}
          </p>

        </div>
      </Popup>
    </Marker>
  )
}