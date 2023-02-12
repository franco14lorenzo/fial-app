import { GoogleMap, MarkerF, useLoadScript } from '@react-google-maps/api'
import { useEffect, useState } from 'react'

const CLUBS = [
  {
    id: 1,
    name: 'Lujan Padel',
    lat: -33.041526,
    lng: -68.885302
  },
  {
    id: 2,
    name: 'Vistalba Padel',
    lat: -33.019867,
    lng: -68.912848
  },
  {
    id: 3,
    name: 'Padel Banco Mendoza',
    lat: -32.986816,
    lng: -68.867393
  }
]

const DEFAULT_CONTAINER_STYLE = {
  width: '100%',
  margin: '0 auto',
  maxWidth: '1280px',
  height: '500px'
}

const DEFAULT_CENTER = { lat: -33.030853, lng: -68.903616 }

interface Position {
  lat: number
  lng: number
}

function MainMap({
  containerStyle = DEFAULT_CONTAINER_STYLE,
  center = DEFAULT_CENTER
}) {
  const [centerMap, setCenterMap] = useState<Position>(center)
  const [userCoords, setUserCoords] = useState<Position | null>(null)

  useEffect(() => {
    getUserPosition().then((position: Position) => {
      setUserCoords(position)
      setCenterMap(position)
    })
  }, [])

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS || ''
  })

  if (!isLoaded) {
    return <div>Cargando...</div>
  }

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={centerMap}
      zoom={14}
      options={{
        mapId: '9f9764e80450fc13',
        backgroundColor: '#e3e5ea',
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: false,
        zoomControl: false
      }}
    >
      {userCoords && (
        <MarkerF
          key={'userPosition'}
          title="gps-user-position"
          icon={{
            path: 'M-20,0a20,20 0 1,0 40,0a20,20 0 1,0 -40,0',
            fillColor: '#059669',
            fillOpacity: 1,
            strokeWeight: 2,
            scale: 0.5,
            strokeColor: 'white'
          }}
          position={userCoords}
        />
      )}
      {CLUBS.map((club) => (
        <MarkerF
          key={club.id}
          title={club.name}
          position={{ lat: club.lat, lng: club.lng }}
        />
      ))}
    </GoogleMap>
  )
}

export default MainMap

const getUserPosition = (): Promise<Position> => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude
        const lng = position.coords.longitude
        resolve({ lat, lng })
      },
      (error) => {
        reject(error)
      }
    )
  })
}
