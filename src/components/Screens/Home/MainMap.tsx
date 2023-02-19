import {
  GoogleMap,
  MarkerF,
  useLoadScript,
  InfoWindowF
} from '@react-google-maps/api'
import { useEffect, useState } from 'react'
import {
  HeartIcon as SolidHeartIcon,
  PhotoIcon
} from '@heroicons/react/24/solid'
import {
  HeartIcon as OutlineHeartIcon,
  XMarkIcon
} from '@heroicons/react/24/outline'

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

interface Club {
  id: number
  name: string
  lat: number
  lng: number
}

function MainMap({
  containerStyle = DEFAULT_CONTAINER_STYLE,
  center = DEFAULT_CENTER
}) {
  const [centerMap, setCenterMap] = useState<Position>(center)
  const [userCoords, setUserCoords] = useState<Position | null>(null)

  const [clubInfo, setClubInfo] = useState<Club | null>(null)

  const [clubFavs, setClubFavs] = useState<Club[]>([])

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
          onClick={() => {
            setClubInfo(club)
          }}
        />
      ))}

      {clubInfo && (
        <InfoWindowF
          position={{
            lat: clubInfo.lat,
            lng: clubInfo.lng
          }}
          onCloseClick={() => {
            setClubInfo(null)
          }}
        >
          <article className="flex flex-col gap-4 p-4 overflow-hidden bg-white rounded-lg shadow-lg md:flex-row min-w-[300px]">
            <div className="relative w-full bg-gray-200 rounded-lg h-52 md:w-52">
              <button
                className="absolute p-1 bg-gray-800/50 rounded-full top-1.5 right-1.5 "
                onClick={() => {
                  setClubInfo(null)
                }}
              >
                <XMarkIcon className="w-5 h-5 text-white" />
              </button>

              <PhotoIcon className="absolute w-20 h-20 text-gray-400 transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" />
              <button
                className="absolute bg-gray-800/50 top-1.5 left-1.5 p-1 rounded-full"
                onClick={() => {
                  if (clubFavs.find((club) => club.id === clubInfo.id)) {
                    setClubFavs(
                      clubFavs.filter((club) => club.id !== clubInfo.id)
                    )
                  } else {
                    setClubFavs([...clubFavs, clubInfo])
                  }
                }}
              >
                {clubFavs.find((club) => club.id === clubInfo.id) ? (
                  <SolidHeartIcon className="w-5 h-5 text-red-500" />
                ) : (
                  <OutlineHeartIcon className="w-5 h-5 text-white" />
                )}
              </button>
            </div>
            <div className="flex flex-col justify-between">
              <div>
                <h2 className="text-xl font-semibold text-gray-800">
                  {clubInfo.name}
                </h2>
                <p className="text-sm text-gray-600">Lujan de Cuyo, Mendoza</p>
              </div>
              <div className="flex flex-row justify-between">
                <div className="flex flex-col">
                  <p className="text-sm text-gray-600">Canchas</p>
                  <p className="text-sm text-gray-600">Precio</p>
                </div>
                <div className="flex flex-col">
                  <p className="text-sm text-gray-600">4</p>
                  <p className="text-sm text-gray-600">$ 500</p>
                </div>
              </div>
            </div>
          </article>
        </InfoWindowF>
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
