import { MapContainer, TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import Nav from '../Nav'
import { quests } from '../../data/quests'
import MapZone from '../map/MapZone'
import MapMarker from '../map/MapMarker'
import QuestPanel from '../map/QuestPanel'
import QuestSidebar from '../map/QuestSidebar'
import MapController from '../map/MapController'
import { useState, Fragment } from 'react'

export default function MapPage() {

  const [activeQuest, setActiveQuest] = useState<any>(null)
  const [mapCenter, setMapCenter] = useState<[number, number]>([-8.0632, -34.8711])

  const getCenter = (zone: [number, number][]) => {
    const lat = zone.reduce((sum, p) => sum + p[0], 0) / zone.length
    const lng = zone.reduce((sum, p) => sum + p[1], 0) / zone.length
    return [lat, lng] as [number, number]
  }

  const handleSelectQuest = (q: any) => {
    setActiveQuest(q)
    setMapCenter(getCenter(q.zone))
  }

  return (
    <>
      <Nav />

      <div className="relative w-full h-[calc(100dvh-72px)]">
        
        {/* Sidebar */}
        <QuestSidebar 
          quests={quests}
          onSelect={handleSelectQuest}
        />

        <MapContainer 
            center={mapCenter}
            zoom={15}
            zoomControl={false}
            className="w-full h-full"
        >
          <MapController center={mapCenter} />

          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {quests.map(q => (
            <Fragment key={q.id}>
              <MapZone 
                positions={q.zone as [number, number][]} 
                onClick={() => setActiveQuest(q)}
              />

              {activeQuest?.id === q.id && q.attractions.map(a => (
                <MapMarker 
                  key={a.id}
                  position={a.position as [number, number]}
                  name={a.name}
                  description={a.description}
                  image={a.image}
                />
              ))}
            </Fragment>
          ))}

        </MapContainer>

        <QuestPanel 
          quest={activeQuest}
          onClose={() => setActiveQuest(null)}
        />

      </div>
    </>
  )
}