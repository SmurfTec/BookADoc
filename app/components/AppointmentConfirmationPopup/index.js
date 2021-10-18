import React, { useState, useEffect } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import moment from 'moment';

import GeolocationPickerWrapper from '../GeolocationPickerWrapper';

function AppointmentConfirmationPopup(props) {
  const { show, onClose, data } = props;
  const [open, setOpen] = useState(show);
  const [showMap, setShowMap] = useState(true);
  const [item, setItem] = useState(data);
  const [geolocation, setGeolocation] = useState(data && data.geolocation);

  useEffect(() => {
    setOpen(show);
  }, [show, open]);

  useEffect(() => {
    setItem(data || {});
  }, [data]);

  const handleClose = () => {
    setOpen(false);
    onClose(false);
  };

  const handleOK = () => {
    onClose({
      ...item,
      geolocation: geolocation || item.geolocation,
    });
  };

  // const handleLocationClick = () => {
  //   setShowMap(!showMap);
  // };

  const onLocationChange = location => {
    console.log('location: ', location);
    setGeolocation({
      lat: location.position.lat,
      lng: location.position.lng,
      addr: location.address,
    });
  };

  const fetchAddress = location =>
    new google.maps.Geocoder().geocode(
      {
        location,
      },
      (results, status) => {
        if (status === 'OK') {
          if (results[0]) {
            setGeolocation({
              ...location,
              addr: results[0].formatted_address,
            });
          } else {
            setGeolocation({
              ...location,
              addr: 'unknown',
            });
          }
        } else {
          console.error(status);
        }
      },
    ) || '';

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          <h3>Confirm Booking Details</h3>
        </DialogTitle>
        <DialogContent>
          {data && (
            <dl className="row">
              <dt className="col-sm-4">Professional's Name</dt>
              <dd className="col-sm-8">{data.professional.name}</dd>
              <dt className="col-sm-4">Booking Date</dt>
              <dd className="col-sm-8">
                {moment(data.bookingTime).format('DD MMM YYYY hh:mm a')}
              </dd>
              <dt className="col-sm-4">Your Location</dt>
              <dd className="col-sm-8">
                {geolocation ? geolocation.addr : (data.geolocation.addr ? data.geolocation.addr : fetchAddress(data.geolocation))}
                {/* <a href="#" onClick={handleLocationClick}>
                  {geolocation ? geolocation.addr : data.geolocation.addr}
                  {'  '} <i className="fa fa-pencil" />
                </a> */}
              </dd>
              <div className="offset-sm-4 col-sm-8">
                {showMap && (
                  <GeolocationPickerWrapper
                    position={geolocation || data.geolocation}
                    onLocationChange={onLocationChange}
                  />
                )}
              </div>
            </dl>
          )}
        </DialogContent>
        <DialogActions>
          <button
            type="button"
            className="btn btn-secondary btn-lg"
            onClick={handleClose}
          >
            Cancel
          </button>
          <button
            type="button"
            className="btn btn-primary btn-lg"
            onClick={handleOK}
          >
            Book Appointment
          </button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default AppointmentConfirmationPopup;