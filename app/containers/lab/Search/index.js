import React, { memo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import Select from 'react-select';
import { Helmet } from 'react-helmet';

import { SearchParams } from 'utils/helpers';
import Footer from 'components/Footer';
import Header from 'components/Header';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import UserAppointment from '../../UserAppointment/Loadable';
import reducer from './reducer';
import saga from './saga';
import makeSelectLabSearch from './selectors';
import { getLabServicesAction, searchLabsAction } from './actions';

const visitPreferences = [
  { id: -1, name: 'No visit preference' },
  { id: 1, name: 'Let them visit me' },
  { id: 2, name: "I don't mind visiting lab" },
];

let localGeolocation = {};

const resolveUserLocation = () => {
  try {
    const user = JSON.parse(localStorage['user']);
    localGeolocation = {
      lat: +user.latitude,
      lng: +user.longitude,
      addr: user.placeName,
    };

    return localGeolocation;
  } catch (err) {
    console.error(err);
  }
};

const paramObj = new SearchParams();
function Search(props) {
  useInjectReducer({ key: 'labSearch', reducer });
  useInjectSaga({ key: 'labSearch', saga });

  const params = paramObj.deserialize();
  const { labSearch, getLabServices, searchLabs } = props;
  const [selectedServices, setSelectedServices] = useState(
    params.services || [],
  );
  const [visitPreference, setVisitPreference] = useState(params.isHomeVisit);
  const [geolocation, setGeolocation] = useState(
    paramObj.location || localGeolocation,
  );

  useEffect(() => {
    gettingLocation();
  }, []);

  const gettingLocation = () => {
    const location = resolveUserLocation();
    if (location && !Object.keys(geolocation).length) {
      setGeolocation(localGeolocation);
    }

    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(position => {
        localGeolocation = {
          lat: +position.coords.latitude,
          lng: +position.coords.longitude,
        };

        if (!Object.keys(geolocation).length) {
          setGeolocation(localGeolocation);
        }
      });
    }
  };

  useEffect(() => {
    getLabServices(toast);
  }, []);

  const getLabs = () => {
    const location = paramObj.location || localGeolocation;
    const searchDoctorParams = {
      ...paramObj.deserialize(),
      roles: ['LAB'],
      isHomeVisit: paramObj.ieHomeVisit === 'true',
      latitude: location.lat, // || props.search.latitude,
      longitude: location.lng, // || props.search.longitude,
      locationAddress: location.addr,
      lat: undefined,
      lng: undefined,
      addr: undefined,
      isCreatedByAdmin: true,
    };

    searchLabs(searchDoctorParams, toast);
  };

  useEffect(() => {
    getLabs();
  }, [window.location.search, geolocation]);

  const handleTestChange = services => {
    const ids = services.map(service => service.serviceId + '');
    setSelectedServices(ids);
    const obj = paramObj.deserialize();
    paramObj.reload({
      ...obj,
      services: ids,
      listIndex: 0,
    });
  };

  const handleVisitPreference = data => {
    setVisitPreference(data.id);
    const obj = paramObj.deserialize();
    paramObj.reload({
      ...obj,
      isHomeVisit: data.id,
      listIndex: 0,
    });
  };

  const Searching = () => {
    return <p>Searching...</p>;
  };

  const EmptyResults = () => {
    return <p>No results</p>;
  };

  const Labs = () => {
    const fromTime = Date.now();
    return labSearch.labs
      .filter(user => user.status !== 'BANNED')
      .map(usr => (
        <UserAppointment
          key={`${usr.userId}-${fromTime}`}
          user={usr}
          fromTime={fromTime}
          geolocation={geolocation}
          // showLogInPopup={showLogInPopup}
          // showBookingConfirmationPopup={showBookingConfirmationPopup}
        />
      ));
  };

  const Test = data => {
    return (
      <div className="card">
        <div className="card-body">
          <div className="profile-box">
            <div className="row">
              <div className="col-md-7">
                <div className="form-group">
                  <label>Name of Lab Test</label>
                  <Select
                    placeholder="Select Tests..."
                    closeMenuOnSelect={false}
                    isMulti
                    value={labSearch.services.filter(service =>
                      selectedServices.includes(service.serviceId + ''),
                    )}
                    options={labSearch.services}
                    getOptionValue={option => option.serviceId}
                    getOptionLabel={option => option.name}
                    onChange={handleTestChange}
                  />
                </div>
              </div>
              <div className="offset-md-1 col-md-4">
                <div className="form-group">
                  <label>Visit Preference</label>
                  <Select
                    placeholder="Select Visit Preference..."
                    value={visitPreferences.find(p => p.id == visitPreference)}
                    options={visitPreferences}
                    getOptionValue={option => option.id}
                    getOptionLabel={option => option.name}
                    onChange={handleVisitPreference}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              {labSearch.Searching ? (
                <Searching />
              ) : labSearch.labs.length > 0 ? (
                <Labs labs={labSearch.labs} />
              ) : (
                <EmptyResults />
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <Helmet>
        <title>Search Lab</title>
        <meta name="description" content="Description of Search" />
      </Helmet>
      <Header />
      {/* Breadcrumb */}
      <div className="breadcrumb-bar">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12">
              <Test />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

Search.propTypes = {
  getLabServices: PropTypes.func.isRequired,
  searchLabs: PropTypes.func.isRequired,
  labSearch: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  labSearch: makeSelectLabSearch(),
});

const mapDispatchToProps = dispatch => ({
  getLabServices: toastr => dispatch(getLabServicesAction(toastr)),
  searchLabs: (payload, toastr) => dispatch(searchLabsAction(payload, toastr)),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(Search);
