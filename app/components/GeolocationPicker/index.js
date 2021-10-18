import React from 'react';
import LocationPicker from 'react-location-picker';

function GeolocationPicker(props) {
  // const [position, setPosition] = useState(
  //   props.position || { lat: 0, lng: 0 },
  // );

  // const setGeoposition = coords =>
  //   setPosition({
  //     ...position,
  //     lat: coords.latitude,
  //     lng: coords.longitude,
  //   });

  // if (navigator.geolocation) {
  //   navigator.geolocation.watchPosition(p =>{
  //     if (!position && p.coords) {
  //       setGeoposition(p.coords);
  //     }
  //   });
  // }

  // const getCurrentPosition = () => {
  //   if (navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition(
  //       p => {
  //         if (p.coords) {
  //           setGeoposition(p.coords);
  //         }
  //       },
  //       error => {
  //         let errorMsg = '';

  //         switch (error.code) {
  //           case 1:
  //             errorMsg = 'Device location is disabled';
  //             break;
  //           case 2:
  //             errorMsg = 'Device location is not available';
  //             break;
  //           case 3:
  //             errorMsg =
  //               'Fetching device location is timed out. Please try again';
  //             break;
  //           default:
  //             errorMsg = 'Something went wrong. Please try again later';
  //             break;
  //         }

  //         toast.error(errorMsg);
  //       },
  //     );
  //   }
  // };

  // props.myRef.current.getCurrentPosition = getCurrentPosition;

  // if (!props.position) {
  //   getCurrentPosition();
  // }

  return (
    <LocationPicker
      containerElement={<div style={{ height: '100%' }} />}
      mapElement={<div style={{ height: props.height || '250px' }} />}
      zoom={12}
      defaultPosition={props.position}
      onChange={(...data) =>
        props.onLocationChange && props.onLocationChange(...data)
      }
    />
  );
}

export default GeolocationPicker;
