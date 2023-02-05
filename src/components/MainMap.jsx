import React from 'react'
import { GoogleMap, LoadScript } from '@react-google-maps/api'

const containerStyle = {
  width: '100%',
  margin: '0 auto',
  maxWidth: '1280px',
  height: '500px'
}

const center = {
  lat: -33.030853,
  lng: -68.903616
}

function MainMap() {
  return (
    <div className="fixed z-0 w-full h-full mx-auto max-w-7xl">
      <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS}>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={14}
          options={{
            mapId: '9f9764e80450fc13',
            backgroundColor: '#e3e5ea',
            mapTypeControl: false
          }}
        >
          {/* Child components, such as markers, info windows, etc. */}
          <></>
        </GoogleMap>
      </LoadScript>
    </div>
  )
}

export default React.memo(MainMap)
