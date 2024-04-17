import React, { useEffect, useRef, useState } from 'react'
import { GoogleMap, useJsApiLoader,Marker, Autocomplete } from '@react-google-maps/api';

const Env = require('../helpers/Env')
const env = new Env()

const containerStyle = {
  width: '100%',
  height: '400px'
};
const libraries = ["maps","places","marker"]
function Map(props) {
    const [autocompleteState, setAutocompleteState] = useState(null) 
    const autoCompleteRef = useRef()
    const isAutocompleteMap = props.autocompleteMap ?? true
    const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: env.getEnv('GMAP_API_KEY'),
    libraries
  })

  const [latLang, setLatLang] = useState({
    lat:Number(props.mapData.lat),
    lng:Number(props.mapData.lng)
  })

  useEffect(()=>{
    props.onDataChange(latLang)
  },[latLang])
  
  
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


  const handlePlaceChanged = (e) => {
    if(autocompleteState != null){
      const location = autocompleteState.getPlace().geometry.location;
      setLatLang({
        lat:location.lat(),
        lng:location.lng(),
      })
    }
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
          {!isAutocompleteMap ? '' :  
          <Autocomplete
            onLoad={(event)=> setAutocompleteState(event)}
            onPlaceChanged={(event)=>handlePlaceChanged(event)}
            ref={autoCompleteRef}
          >
            <input
              type="text"
              placeholder="Search your pancingan spot"
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
          }
          
        </>
      </GoogleMap>
  ) : <></>
}

export default React.memo(Map)