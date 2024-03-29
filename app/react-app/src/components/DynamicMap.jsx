import React, { useState, useEffect } from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';

const mapStyles = {
  position: 'fixed',
  top: '0%',
  left: '0%',
  width: '40%',
  height: '40%',
  zIndex: '1'
};


const MapContainer = (props) => {
  const { google, cityData } = props;
  const [showMap, setShowMap] = useState(false);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [initialized, setInitialized] = useState(false); // new state variable

  useEffect(() => {
    if (cityData) {
      console.log('cityData:', cityData);
      const { latitude, longitude } = cityData;
      console.log('latitude:', latitude, 'longitude:', longitude);
      setLatitude(parseFloat(latitude) || 0);
      setLongitude(parseFloat(longitude) || 0);
      setInitialized(true); // update initialized state
      setShowMap(true); // set showMap to true after initializing the component
    }
  }, [cityData]);
  

  return (
    <>
      {initialized && showMap && ( // only render map if initialized and showMap are both true
      <Map
        google={google}
        zoom={8}  
        style={{ ...mapStyles, border: '2px solid black', borderRadius: '10px' }}
        center={{ lat: latitude, lng: longitude}}
      >
      <Marker
        position={{ lat: latitude, lng: longitude}}
      />
      </Map>
      )}
    </>
  );
};

const LoadingContainer = () => (
  <div>Loading...</div>
);

const MapContainerWrapper = GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_MAP_API_KEY,
  LoadingContainer: LoadingContainer,
})(MapContainer);

export default MapContainerWrapper;
