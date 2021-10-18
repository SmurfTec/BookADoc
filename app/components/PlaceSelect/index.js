import React, { useState } from 'react';
import GooglePlacesAutocomplete, { geocodeByPlaceId } from 'react-google-places-autocomplete';
// If you want to use the provided css
import 'react-google-places-autocomplete/dist/index.min.css';

export default function PlaceSelect(props) {
  const {initialLocation, onSelect, placeholder, className} = props;

  const onPlaceSelected = data => {
    geocodeByPlaceId(data.place_id).then(arr => {
      const place = arr[0];
      if (place && place.geometry && place.geometry.location) {
        const location = {
          addr: data.description,
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
        };

        if (onSelect) {
          onSelect(location);
        }
      }
    });
  };

  return (
    <GooglePlacesAutocomplete
      placeholder={placeholder || 'Enter Location'}
      inputClassName={className}
      initialValue={initialLocation ? initialLocation.addr : ''}
      // apiKey={'AIzaSyDRzHsBRo6pd_uVJVmIKctlC9ZYxd1HeeU'}
      onSelect={data => onPlaceSelected(data)}
    />
  );
}
