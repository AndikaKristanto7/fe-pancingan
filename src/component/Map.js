import React, { useState } from 'react'
import { GoogleMap, useJsApiLoader,Marker, Autocomplete } from '@react-google-maps/api';

const Env = require('../helpers/Env')
const env = new Env()

const containerStyle = {
  width: '100%',
  height: '400px'
};

function Map({mapData}) {
    const [autocompleteState, setAutocompleteState] = useState(null) 
    const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: env.getEnv('GMAP_API_KEY'),
    libraries:["maps","places","marker"]
  })

  const [latLang, setLatLang] = useState({
    lat:Number(mapData.lat),
    lng:Number(mapData.lng)
  })
  
  
  const [map, setMap] = React.useState(null)

  const onLoad = React.useCallback(function callback(map) {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    const bounds = new window.google.maps.LatLngBounds(latLang);
    map.fitBounds(bounds);

    setMap(map)
  }, [])

  const onLoadMarker = () => {
    setTimeout(()=>{
      setLatLang({
        lat:latLang.lat,
        lng:latLang.lng,
      })
      console.log("interval set")
    },5000)
  }


  const handlePlaceChanged = () => {
    const location = autocompleteState.getPlace().geometry.location;
    setLatLang({
      lat:location.lat(),
      lng:location.lng(),
    })
    console.log(latLang)
  }
  

  return isLoaded ? (
      <GoogleMap
        mapContainerStyle={containerStyle}
        onLoad={onLoad}
        options={{
          center: latLang,
          zoom:20,
        }}
      >
        
        { /* Child components, such as markers, info windows, etc. */ }
        <>
          <Autocomplete
            onLoad={(event)=> setAutocompleteState(event)}
            onPlaceChanged={handlePlaceChanged}
          >
            <input
              type="text"
              placeholder="Customized your placeholder"
              style={{
                boxSizing: `border-box`,
                border: `1px solid transparent`,
                width: `240px`,
                height: `32px`,
                padding: `0 12px`,
                borderRadius: `3px`,
                boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
                fontSize: `14px`,
                outline: `none`,
                textOverflow: `ellipses`,
                position: "absolute",
                left: "50%",
                marginLeft: "-120px"
              }}
            />
          </Autocomplete>
          
        </>
      </GoogleMap>
  ) : <></>
}

export default React.memo(Map)