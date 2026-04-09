import { Polygon } from "react-leaflet"

type Props = {
  positions: [number, number][]
  onClick: () => void
}

export default function MapZone({ positions, onClick }: Props) {
  return (
    <Polygon
      positions={positions}
      pathOptions={{
        color: "#ba5624",
        fillColor: "#ba5624",
        fillOpacity: 0.3
      }}
      eventHandlers={{
        click: (e) => {
          e.originalEvent.stopPropagation()
          onClick()
        }
      }}
    />
  )
}