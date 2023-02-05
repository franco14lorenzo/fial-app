import { GoogleMap, LoadScript } from '@react-google-maps/api'

const defaultConteinerStyle = {
  width: '100%',
  margin: '0 auto',
  maxWidth: '1280px',
  height: '500px'
}
const defaultCenter = { lat: -33.030853, lng: -68.903616 }

function MainMap({
  containerStyle = defaultConteinerStyle,
  center = defaultCenter
}) {
  return (
    <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS || ''}>
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
        {/* Child components, such as markers, info windows, etc. */}
        <></>
      </GoogleMap>
    </LoadScript>
  )
}

export default MainMap
