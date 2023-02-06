import { GoogleMap, MarkerF, useLoadScript } from '@react-google-maps/api'
import { useEffect, useState } from 'react'

const defaultConteinerStyle = {
  width: '100%',
  margin: '0 auto',
  maxWidth: '1280px',
  height: '500px'
}
const position = {
  lat: -33.030853,
  lng: -68.903616
}
const defaultCenter = { lat: -33.030853, lng: -68.903616 }

interface Position {
  lat: number
  lng: number
}

function MainMap({
  containerStyle = defaultConteinerStyle,
  center = defaultCenter
}) {
  const [userCoords, setUserCoords] = useState<Position | null>(null)

  useEffect(() => {
    getUserPosition().then((position: Position) => {
      setUserCoords(position)
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
      center={center}
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
          position={position}
        />
      )}
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
