/**
 *
 * Search
 *
 */

import React, { memo, useState, useEffect } from 'react';
import PropTypes, { string } from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import moment from 'moment';
// import DatePicker from 'react-datepicker';

import { SearchParams } from '../../utils/helpers';
import Header from 'components/Header';
import Footer from 'components/Footer';
import SignInPopup from '../../components/SignInPopup';
import AppointmentConfirmationPopup from '../../components/AppointmentConfirmationPopup';
import makeSelectSearch from './selectors';
import reducer from './reducer';
import saga from './saga';
import UserAppointment from '../UserAppointment/Loadable';
import PlaceSelect from 'components/PlaceSelect';
import TimePicker from 'rc-time-picker';
import 'rc-time-picker/assets/index.css';
// import DateRangePicker from '@wojtekmaj/react-daterange-picker';
// import { DateRangePicker } from 'material-ui-datetime-range-picker';
import 'react-dates/initialize';
import {
  DateRangePicker,
  SingleDatePicker,
  DayPickerRangeController,
} from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';

import {
  getDoctors,
  getLanguagesAction,
  updateListIndexAction,
} from './actions';

import { bookAppointmentAction } from '../UserAppointment/actions';

const ROLES = {
  DOCTOR: 'DOCTOR',
  NURSE: 'NURSE',
  PHYSIOTHERAPIST: 'PHYSIOTHERAPIST',
};

let specialtyTimeoutHandler = 0;

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
export function Search(props, context) {
  useInjectReducer({ key: 'search', reducer });
  useInjectSaga({ key: 'search', saga });

  const params = paramObj.deserialize();
  const [showSignInPopup, setShowSignInPopup] = useState(false);
  const [showBookingConfirmation, setShowBookingConfirmation] = useState(false);
  const [bookingConfirmationData, setBookingConfirmationData] = useState();
  const [autoFocus, setAutoFocus] = useState('');
  const [dateRange, setDateRange] = useState({
    startDate: params.fromTime ? moment(new Date(params.fromTime)) : null,
    endDate: params.toTime ? moment(new Date(params.toTime)) : null,
  });
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [geolocation, setGeolocation] = useState(
    paramObj.location || localGeolocation,
  );
  const [languages, setLanguages] = useState([]);
  const [language, setLanguage] = useState(params.language || '');
  const [listIndex, setListIndex] = useState(params.listIndex || 0);
  const [users, setUsers] = useState([]);
  const [speciality, setSpeciality] = useState(params.speciality || '');
  const [selectedSpecialty, setSelectedSpecialty] = useState(
    params.speciality || '',
  ); // workaround for api to be called
  // const [specialities, setSpecialities] = useState(roles);
  const [selectedRoles, setSelectedRoles] = useState(params.roles || []);
  const [startDate, setStartDate] = useState(moment());
  const [endDate, setEndDate] = useState(moment());
  const [format, setFormat] = useState('h:mm a');
  const [doctorName, setDoctorName] = useState('');

  useEffect(() => {
    const obj = paramObj.deserialize();

    setUsers(
      obj.listIndex === 0
        ? props.search.users
        : [...users, ...props.search.users],
    );
  }, [props.search.users]);

  useEffect(() => {
    setListIndex(props.search.listIndex);
    // getUsers();
  }, [props.search.listIndex]);

  useEffect(() => {
    props.getLanguagesFunc(toast);
  }, []);

  useEffect(() => {
    const obj = paramObj.deserialize();
    setLanguage(obj.language || '');
    setStartDate(moment());
    setEndDate(moment());

    const docName = obj.docName;
    if (docName !== null && docName !== undefined && docName.length > 0) {
      setDoctorName(docName.replace('/+/g', ' '));
    }

    const fromTime = obj.fromTime;
    if (fromTime === null || fromTime === undefined || fromTime.length <= 0) {
      // setDateRange({0:moment(null), 1: dateRange.endDate});
      setEndTime('');
      setStartTime('');
      console.log('empty fromTime', fromTime);
    }
    const toTime = obj.toTime;
    if (toTime === null || toTime === undefined || toTime.length <= 0) {
      // setDateRange({0:dateRange.startDate, 1: moment(null)});
      setEndTime('');
      setStartTime('');
      console.log('empty endTime', toTime);
    }

    getProfessionals();
  }, [window.location.search, selectedRoles, selectedSpecialty, geolocation]);

  const loadMore = e => {
    e.preventDefault();

    const obj = paramObj.deserialize();
    obj.listIndex = obj.listIndex + 1;
    paramObj.reload(obj);
    setListIndex(obj.listIndex);
    // props.updateListIndexFunc();
  };
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

  const getProfessionals = (shouldRefresh = false) => {
    const location = paramObj.location || localGeolocation;
    const searchDoctorParams = {
      ...paramObj.deserialize(),
      latitude: location.lat || props.search.latitude,
      longitude: location.lng || props.search.longitude,
      locationAddress: location.addr,
      lat: undefined,
      lng: undefined,
      addr: undefined,
      doctorName: doctorName || undefined,
      isCreatedByAdmin: true,
    };

    props.getDoctorsFunc(searchDoctorParams, toast, shouldRefresh);
  };

  useEffect(() => {
    const languagesState = props.search.languages;
    if (languagesState && languagesState.length > 0) {
      setLanguages(languagesState);
    }
  }, [props.search.languages]);

  const onChangeValue = (e, func) => {
    func(e.target.value);
    // getUsers(true);
  };

  const onChangeLanguage = (e, func) => {
    func(e.target.value);

    const obj = paramObj.deserialize();
    paramObj.reload({ ...obj, language: e.target.value, listIndex: 0 });
    // getUsers(true, e.target.value);
  };
  const onChangeDate = (
    value,
    func,
    ifDateRange = false,
    ifStartSelected = false,
    ifEndSelected = false,
  ) => {
    func(value);

    let dateRangeSelected = { 0: dateRange.startDate, 1: dateRange.endDate };
    if (ifDateRange === true) {
      dateRangeSelected = { 0: value.startDate, 1: value.endDate };
    }
    const startTimeSelected =
      ifStartSelected === true
        ? moment(moment(value, 'HH:mm:ss ZZ')._d)
            .format('HH:mm:ss')
            .toString()
        : startTime !== ''
        ? moment(moment(startTime, 'HH:mm:ss ZZ')._d)
            .format('HH:mm:ss')
            .toString()
        : '12:00:00';
    // const endTimeSelected = ifEndSelected === true ?  value :  endTime;
    const endTimeSelected =
      ifEndSelected === true
        ? moment(moment(value, 'HH:mm:ss ZZ')._d)
            .format('HH:mm:ss')
            .toString()
        : endTime !== ''
        ? moment(moment(endTime, 'HH:mm:ss ZZ')._d)
            .format('HH:mm:ss')
            .toString()
        : '12:00:00';

    let fromTimeSelected = '';
    let toTimeSelected = '';
    if (ifStartSelected && value === null) {
      setStartTime('');
    }
    if (ifEndSelected && value === null) {
      setEndTime('');
    }

    if (ifDateRange && value === null) {
      fromTimeSelected = '';
      toTimeSelected = '';
    } else {
      if (
        dateRangeSelected !== null &&
        dateRangeSelected[0] !== undefined &&
        moment(dateRangeSelected[0]).toString().length > 0 &&
        startTimeSelected !== ''
      ) {
        const dateExt = moment(
          dateRangeSelected[0],
          'ddd MMM D YYYY HH:mm:ss ZZ',
        );
        const splitTime = startTimeSelected.split(':');
        dateExt.set({ h: splitTime[0], m: splitTime[1] });
        fromTimeSelected = moment(dateExt).valueOf();
      } else {
        if (
          dateRangeSelected !== null &&
          dateRangeSelected[0] !== undefined &&
          moment(dateRangeSelected[0]).toString().length > 0
        ) {
          const dateExt = moment(
            dateRangeSelected[0],
            'ddd MMM D YYYY HH:mm:ss ZZ',
          );
          fromTimeSelected = moment(dateExt).valueOf();
        } else if (startTimeSelected !== null && startTimeSelected.length > 0) {
          const dateExt = moment();
          const splitTime = startTimeSelected.split(':');
          dateExt.set({ h: splitTime[0], m: splitTime[1] });
          fromTimeSelected = moment(dateExt).valueOf();
        } else {
          const dateExt = moment();
          fromTimeSelected = moment(dateExt).valueOf();
        }
      }
      if (
        dateRangeSelected !== null &&
        dateRangeSelected[1] !== undefined &&
        moment(dateRangeSelected[1]).toString().length > 0 &&
        endTimeSelected !== ''
      ) {
        const dateExt = moment(
          dateRangeSelected[1],
          'ddd MMM D YYYY HH:mm:ss ZZ',
        );
        const splitTime = endTimeSelected.split(':');
        dateExt.set({ h: splitTime[0], m: splitTime[1] });
        toTimeSelected = moment(dateExt).valueOf();
      } else {
        if (
          dateRangeSelected !== null &&
          dateRangeSelected[1] !== undefined &&
          moment(dateRangeSelected[1]).toString().length > 0
        ) {
          const dateExt = moment(
            dateRangeSelected[1],
            'ddd MMM D YYYY HH:mm:ss ZZ',
          );
          toTimeSelected = moment(dateExt).valueOf();
        } else if (endTimeSelected !== null && endTimeSelected.length > 0) {
          const dateExt = moment();
          const splitTime = endTimeSelected.split(':');
          dateExt.set({ h: splitTime[0], m: splitTime[1] });
          toTimeSelected = moment(dateExt).valueOf();
        } else {
          const dateExt = moment();
          toTimeSelected = moment(dateExt).valueOf();
        }
      }
    }
    const obj = paramObj.deserialize();
    /* console.log("dateRangeSelected", dateRangeSelected);
    console.log("fromTime", fromTimeSelected);
    console.log("toTimeSelected", toTimeSelected);
    console.log("value", value); */
    paramObj.reload({
      ...obj,
      fromTime: fromTimeSelected,
      toTime: toTimeSelected,
      listIndex: 0,
    });
  };

  const onChangeDateRange = (value, func) => {
    setStartDate(value.startDate);
    setEndDate(value.endDate);

    onChangeDate(value, func, true);
  };

  const onFocusChangeDateRangePicker = type => {
    console.log('type', type);
    if (type === 'startDate') setAutoFocus('startDate');
    else if (type === 'endDate') setAutoFocus('endDate');
    else setAutoFocus('');
  };
  const onChangeToTime = (value, func) => {
    func(value);

    const obj = paramObj.deserialize();
    paramObj.reload({
      ...obj,
      toTime: value ? value.getTime() : '',
      listIndex: 0,
    });
    // getUsers(true);
  };

  const renderLanguages = () =>
    languages.map(lang => (
      <option value={lang.language}>{lang.language}</option>
    ));

  // const onCheckedSpeciality = (e, func, specialit) => {
  //   func(!specialit);
  //   //getUsers(true);
  // };

  const onSpecialtyChange = e => {
    clearTimeout(specialtyTimeoutHandler);

    const value = e.target.value;
    setSpeciality(value);
    specialtyTimeoutHandler = setTimeout(() => {
      setTimeout(() => {
        const obj = paramObj.deserialize();
        paramObj.reload({ ...obj, speciality: value, listIndex: 0 });
        setSelectedSpecialty(value);
      });
    }, 2000);
  };

  const onRoleChecked = (e, role) => {
    const obj = paramObj.deserialize();
    let roles = obj.roles || [];
    if (selectedRoles.includes(role)) {
      roles = selectedRoles.filter(r => r !== role);
    } else {
      roles = [...roles, role];
    }

    setSelectedRoles(roles);
    paramObj.reload({ ...obj, roles: roles, listIndex: 0 });
  };

  const onPlaceSelected = data => {
    setGeolocation(data);
    const obj = paramObj.deserialize();
    paramObj.reload({ ...obj, ...data, listIndex: 0 });
  };

  const resetFilters = () => {
    setSelectedRoles([]);
    setDateRange({ 0: '', 1: '' });
    setEndDate('12:00:00');
    setStartDate('12:00:00');
    setGeolocation(localGeolocation);
  };

  const getApplicableAfter = () => Date.now() + 30 * 60 * 1000; // 30min

  const handleBookAppointment = data => {
    if (data.bookingTime < getApplicableAfter()) {
      toast.warn('Cannot book appointment for this time slot');
      return;
    }

    const { professional, isLuxury } = data;

    console.log(`professional`, professional);

    props.bookAppointment(
      {
        bookingTime: data.bookingTime,
        appointmentLattitude: data.geolocation.lat,
        appointmentLongitude: data.geolocation.lng,
        placeName: data.geolocation.addr,
        doctorInfo: {
          hiredDoc: professional.email,
          doctorName: professional.name,
          doctorLatitude: professional.lat,
          doctorLongitude: professional.lng,
          doctorRate: professional.rate,
        },
        isLuxury,
      },
      toast,
    );
  };

  const showLogInPopup = () => {
    setShowSignInPopup(true);
  };

  const onSignInPopupClose = status => {
    setShowSignInPopup(status);
  };

  const showBookingConfirmationPopup = data => {
    console.log(`data`, data);

    setBookingConfirmationData(data);
    setTimeout(() => {
      setShowBookingConfirmation(true);
    }, 1000);
  };

  const onBookingConfirmationClose = data => {
    console.log(`data`, data);
    if (data) {
      handleBookAppointment(data);
    }
    setShowBookingConfirmation(false);
  };

  let userCounts =
    users && users.filter(user => user.status !== 'BANNED').length;

  const renderUsers = () => {
    const obj = paramObj.deserialize();
    const fromTime = obj.fromTime; //|| Date.now();

    return users
      .filter(user => user.status !== 'BANNED')
      .map(usr => (
        <UserAppointment
          key={`${usr.userId}-${fromTime}`}
          user={usr}
          fromTime={fromTime}
          geolocation={geolocation}
          showLogInPopup={showLogInPopup}
          showBookingConfirmationPopup={showBookingConfirmationPopup}
        />
      ));
  };

  return (
    <>
      <Helmet>
        <title>Search</title>
        <meta name="description" content="Description of Search" />
      </Helmet>
      <Header />
      {/* Breadcrumb */}
      <div className="breadcrumb-bar">
        <div className="container-fluid">
          <div className="row align-items-center">
            <div className="col-md-8 col-12">
              <nav aria-label="breadcrumb" className="page-breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link to="/">Home</Link>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    Search
                  </li>
                </ol>
              </nav>
              <h2 className="breadcrumb-title">
                <p className="text-center">
                  {/* {props.search.loading
                  ? (userCounts ? `${userCounts} providers` : 'Loading providers...')
                  : (userCounts ? `${userCounts} providers` : 'No providers available at the moment')
                } */}
                  {props.search.loading
                    ? 'Loading providers...'
                    : userCounts
                    ? `${userCounts} providers`
                    : 'No providers available at the moment'}
                </p>
              </h2>
            </div>
          </div>
        </div>
      </div>
      {/* /Breadcrumb */}
      {/* Page Content */}
      <div className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12 col-lg-4 col-xl-3 theiaStickySidebar">
              {/* Search Filter */}
              <div className="card search-filter">
                <div className="card-header">
                  <h4 className="card-title mb-0">Search Filter</h4>
                </div>
                <div className="card-body">
                  {/* <h4>Date</h4>
                  <div className="filter-widget">
                    <div className="cal-icon">
                      <input
                        type="text"
                        className="form-control datetimepicker"
                        placeholder="Select Date"
                      />
                    </div>
                  </div> */}
                  <div className="filter-widget">
                    <h4>Your Location</h4>
                    <PlaceSelect
                      className="form-control"
                      initialLocation={geolocation}
                      onSelect={onPlaceSelected}
                    />
                  </div>

                  <div className="filter-widget">
                    <h4>Language</h4>
                    <div>
                      <select
                        className="form-control select"
                        value={language}
                        onChange={e => onChangeLanguage(e, setLanguage)}
                      >
                        <option value="">Select Language</option>
                        {renderLanguages()}
                      </select>
                    </div>
                  </div>

                  <div className="filter-widget">
                    <h4>Date Range</h4>
                    <div>
                      {/* <DateRangePicker
                          value={dateRange}
                          onChange={value => onChangeDate(value, setDateRange, true)}
                      /> */}
                      <DateRangePicker
                        startDate={dateRange.startDate} // momentPropTypes.momentObj or null,
                        startDateId="54r564t66" // PropTypes.string.isRequired,
                        endDate={dateRange.endDate} // momentPropTypes.momentObj or null,
                        endDateId="234344" // PropTypes.string.isRequired,
                        // onDatesChange={({ startDate, endDate }) => {setStartDate(startDate); setEndDate(endDate )}} // PropTypes.func.isRequired,
                        onDatesChange={({ startDate, endDate }) =>
                          onChangeDate(
                            { startDate, endDate },
                            setDateRange,
                            true,
                          )
                        } // PropTypes.func.isRequired,
                        focusedInput={autoFocus}
                        onFocusChange={focusedInput =>
                          onFocusChangeDateRangePicker(focusedInput)
                        } // PropTypes.func.isRequired,
                      />
                    </div>
                  </div>

                  <div className="filter-widget">
                    <div className="row">
                      <div className="col-md-6">
                        <h4>From Time</h4>
                        <TimePicker
                          showSecond={false}
                          className="xxx"
                          value={startTime}
                          onChange={value => {
                            onChangeDate(
                              value,
                              setStartTime,
                              false,
                              true,
                              false,
                            );
                            setStartTime(value);
                          }}
                          format={format}
                          use12Hours={false}
                          inputReadOnly
                        />
                      </div>
                      <div className="col-md-6">
                        <h4>To Time</h4>
                        <TimePicker
                          showSecond={false}
                          className="xxx"
                          value={endTime}
                          onChange={value => {
                            onChangeDate(value, setEndTime, false, false, true);
                            setEndTime(value);
                          }}
                          format={format}
                          use12Hours={false}
                          inputReadOnly
                        />
                      </div>
                    </div>
                  </div>

                  {/* <div className="filter-widget">
                    <h4>Speciality</h4>
                    <div>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Select Specialty"
                        value={speciality}
                        // onChange={e => onChangeValue(e, setSpeciality)}
                        // onKeyUp={e => getUsers(true)}
                        onChange={onSpecialtyChange}
                      />
                    </div>
                  </div> */}

                  <div className="filter-widget">
                    <h4>I want a</h4>
                    <div>
                      <label className="custom_check">
                        <input
                          type="checkbox"
                          name="select_specialist"
                          checked={selectedRoles.includes(ROLES.DOCTOR)}
                          onChange={e => onRoleChecked(e, ROLES.DOCTOR)}
                        />
                        <span className="checkmark" /> Doctor
                      </label>
                    </div>

                    <div>
                      <label className="custom_check">
                        <input
                          type="checkbox"
                          name="select_specialist"
                          checked={selectedRoles.includes(ROLES.NURSE)}
                          onChange={e => onRoleChecked(e, ROLES.NURSE)}
                        />
                        <span className="checkmark" /> Nurse
                      </label>
                    </div>

                    <div>
                      <label className="custom_check">
                        <input
                          type="checkbox"
                          name="select_specialist"
                          checked={selectedRoles.includes(
                            ROLES.PHYSIOTHERAPIST,
                          )}
                          onChange={e =>
                            onRoleChecked(e, ROLES.PHYSIOTHERAPIST)
                          }
                        />
                        <span className="checkmark" /> Physiotherapist
                      </label>
                    </div>
                  </div>
                  {/*<div className="btn-search">
                    <button
                      type="button"
                      onClick={e => getUsers(true)}
                      className="btn btn-block"
                    >
                      Search
                    </button>
                  </div>*/}
                </div>
                <div className="card-footer text-right">
                  <h6>
                    <Link
                      to="/search"
                      onClick={resetFilters}
                      className="text-decoration-underline"
                    >
                      Reset Filter
                    </Link>
                  </h6>
                </div>
              </div>
              {/* /Search Filter */}
            </div>
            <div className="col-md-12 col-lg-8 col-xl-9">
              {/* Doctor Widget */}
              {renderUsers()}
              {/* /Doctor Widget */}
              {userCounts ? (
                <div className="load-more text-center">
                  <button
                    className="btn btn-primary"
                    onClick={e => loadMore(e)}
                    disabled={props.search.loading}
                  >
                    Load More
                  </button>
                </div>
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* /Page Content */}
      <Footer />
      <SignInPopup show={showSignInPopup} onClose={onSignInPopupClose} />
      <AppointmentConfirmationPopup
        show={showBookingConfirmation}
        data={bookingConfirmationData}
        onClose={onBookingConfirmationClose}
      />
    </>
  );
}

Search.propTypes = {
  dispatch: PropTypes.func.isRequired,
  getDoctorsFunc: PropTypes.func,
  getLanguagesFunc: PropTypes.func,
  updateListIndexFunc: PropTypes.func,
  bookAppointment: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  search: makeSelectSearch(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    getDoctorsFunc: (filters, toastr, shouldRefresh) => {
      dispatch(getDoctors(filters, toastr, shouldRefresh));
    },
    getLanguagesFunc: toastr => {
      dispatch(getLanguagesAction(toastr));
    },
    updateListIndexFunc: () => {
      dispatch(updateListIndexAction());
    },
    bookAppointment: (data, toastr) =>
      dispatch(bookAppointmentAction(data, toastr)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(Search);
