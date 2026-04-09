import { useMap } from "react-leaflet"
import { useEffect } from "react"

export default function MapController({ center }: { center: [number, number] }) {
  const map = useMap()

  useEffect(() => {
    map.flyTo(center, 15)
  }, [center])

  return null
}