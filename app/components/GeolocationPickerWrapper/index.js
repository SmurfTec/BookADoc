import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import GeolocationPicker from '../GeolocationPicker';

export default function GeolocationPickerWrapper(props) {
  const [geolocation, setGeolocation] = useState(props.position);
  const [fetchingLocation, setFetchingLocation] = useState(false);

  useEffect(() => {
    setGeolocation(props.position);
  }, [props.position]);

  const toLatLng = coords => {
    return {
      lat: coords.latitude,
      lng: coords.longitude,
    };
  };

  const setGeoposition = coords => setGeolocation(toLatLng(coords));

  const getCurrentPosition = () => {
    if (navigator.geolocation && !fetchingLocation) {
      setFetchingLocation(true);
      console.log('fetching geolocation...');
      navigator.geolocation.getCurrentPosition(
        p => {
          setFetchingLocation(false);
          if (p.coords) {
            console.log('geolocation fetched');
            setGeoposition(p.coords);
            if(props.onLocationChange) {
              props.onLocationChange({position: toLatLng(p.coords)});
            }
          }
        },
        error => {
          let errorMsg = '';

          switch (error.code) {
            case 1:
              errorMsg = 'Device location is disabled';
              break;
            case 2:
              errorMsg = 'Device location is not available';
              break;
            case 3:
              errorMsg =
                'Fetching device location is timed out. Please try again';
              break;
            default:
              errorMsg = 'Something went wrong. Please try again later';
              break;
          }

          toast.error(errorMsg);
        },
      );
    }
  };

  if (!props.position) {
    getCurrentPosition();
  }

  return (
    <>
      <div className="form-group">
        <GeolocationPicker
          position={geolocation || {lat: 0, lng: 0}}
          onLocationChange={props.onLocationChange && props.onLocationChange}
        />
      </div>

      <button
        className="btn btn-info btn-block btn-lg login-btn"
        type="button"
        onClick={() => getCurrentPosition()}
      >
        Show My Location on Map
      </button>
    </>
  );
}
