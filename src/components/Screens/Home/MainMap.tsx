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
import { CLUBS } from '@/constants/mocks'
import { DEFAULT_CENTER, DEFAULT_CONTAINER_STYLE } from '@/constants/googleMap'
import { getUserPosition } from '@/utils/geoUtils'
import type { Club, Position } from '@/types'

function MainMap({
  containerStyle = DEFAULT_CONTAINER_STYLE,
  center = DEFAULT_CENTER
}) {
  const [centerMap, setCenterMap] = useState<Position>(center)
  const [userCoords, setUserCoords] = useState<Position | null>(null)

  const [clubInfo, setClubInfo] = useState<Club | null>(null)

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
          onClick={() => {
            setCenterMap(userCoords)
          }}
        />
      )}
      {CLUBS.map((club) => (
        <MarkerF
          key={club.id}
          title={club.name}
          position={{ lat: club.lat, lng: club.lng }}
          icon={{
            url: '/tennis-ball.svg',
            scaledSize: new window.google.maps.Size(32, 32)
          }}
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
          <ClubInfo clubInfo={clubInfo} setClubInfo={setClubInfo} />
        </InfoWindowF>
      )}
    </GoogleMap>
  )
}

export default MainMap

const ClubInfo = ({
  clubInfo,
  setClubInfo
}: {
  clubInfo: Club
  setClubInfo: (club: Club | null) => void
}) => {
  const [clubFavs, setClubFavs] = useState<Club[]>([])

  return (
    <article className="flex flex-row gap-4 md:p-4 overflow-hidden bg-white rounded-lg shadow-lg md:flex-row min-w-[93vw] sm:min-w-[500px] mx-auto relative max-w-[500px]">
      <button
        className="absolute top-1.5 md:top-3.5 right-1.5 p-1 rounded-full"
        onClick={() => {
          if (clubFavs.find((club) => club.id === clubInfo.id)) {
            setClubFavs(clubFavs.filter((club) => club.id !== clubInfo.id))
          } else {
            setClubFavs([...clubFavs, clubInfo])
          }
        }}
      >
        {clubFavs.find((club) => club.id === clubInfo.id) ? (
          <SolidHeartIcon className="w-5 h-5 text-red-500" />
        ) : (
          <OutlineHeartIcon className="w-5 h-5 text-gray-700" />
        )}
      </button>
      <div className="relative bg-gray-200 md:rounded-lg w-28 sm:w-40 aspect-square md:w-52">
        <PhotoIcon className="absolute w-12 h-12 text-gray-400 transform -translate-x-1/2 -translate-y-1/2 md:w-20 md:h-20 top-1/2 left-1/2" />
        <button
          className="absolute p-1 bg-gray-800/50 rounded-full top-2.5 md:top-1 left-1.5 hover:bg-gray-800/90"
          onClick={() => {
            setClubInfo(null)
          }}
        >
          <XMarkIcon className="w-3 h-3 text-white" />
        </button>
      </div>
      <div className="flex flex-col flex-1 justify-between p-2.5 md:p-0">
        <div>
          <h2 className="text-sm font-semibold text-gray-800 sm:text-xl">
            {clubInfo.name}
          </h2>
          <p className="text-xs text-gray-600 sm:text-sm">
            Lujan de Cuyo, Mendoza
          </p>
        </div>
        <div className="flex flex-row justify-between">
          <div className="flex flex-col">
            <p className="text-xs text-gray-600 sm:text-sm">Canchas</p>
            <p className="text-xs text-gray-600 sm:text-sm">Precio</p>
          </div>
          <div className="flex flex-col">
            <p className="text-xs text-gray-600 sm:text-sm">4</p>
            <p className="text-gray-600 ttext-xs sm:text-sm">$ 500</p>
          </div>
        </div>
      </div>
    </article>
  )
}
