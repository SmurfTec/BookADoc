/**
 *
 * Booking
 *
 */

import React, { memo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Link } from 'react-router-dom';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectBooking from './selectors';
import reducer from './reducer';
import saga from './saga';
import doctorThumb02 from '../../theme/img/doctors/doctor-thumb-02.jpg';
import { updateEmailAction, bookAppointmentAction } from './actions';
import Footer from 'components/Footer';
import Header from 'components/Header';

export function Booking(props) {
  useInjectReducer({ key: 'booking', reducer });
  useInjectSaga({ key: 'booking', saga });

  const [schedule, setSchedule] = useState({});
  // console.log('data', props);
  useEffect(() => {
    setSchedule(props.booking.schedule);
  }, [props.booking.schedule]);

  useEffect(() => {
    if (props.location.userRow !== undefined) {
      setSchedule(props.location.userRow);
      // console.log('populated', props.location.userRow);
    } else {
      // console.log('notpopulated');
    }
  }, []);

  useEffect(() => {
    getSchedule();
  }, []);

  const getSchedule = () => {
    if (
      props.match.params.userId !== undefined &&
      props.match.params.userId.length > 0
    ) {
      props.getScheduleFunc(props.match.params.userId);
    }
  };

  return (
    <div>
      <Helmet>
        <title>Booking</title>
        <meta name="description" content="Description of Booking" />
      </Helmet>
      <Header />
      {/* Breadcrumb */}
      <div className="breadcrumb-bar">
        <div className="container-fluid">
          <div className="row align-items-center">
            <div className="col-md-12 col-12">
              <nav aria-label="breadcrumb" className="page-breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link to="/">Home</Link>
                  </li>
                  <li className="breadcrumb-item active" area-current="page">
                    Booking
                  </li>
                </ol>
              </nav>
              <h2 className="breadcrumb-title">Booking</h2>
            </div>
          </div>
        </div>
      </div>
      {/* /Breadcrumb */}
      {/* Page Content */}
      <div className="content">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="card">
                <div className="card-body">
                  <div className="booking-doc-info">
                    <Link to="doctor-profile" className="booking-doc-img">
                      <img src={doctorThumb02} alt="User Image" />
                    </Link>
                    <div className="booking-info">
                      <h4>
                        <a href="doctor-profile.html">Dr. Darren Elder</a>
                      </h4>
                      <p className="text-muted mb-0">
                        <i className="fa fa-map-marker" /> Fee: $30
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-12 col-sm-4 col-md-6">
                  <h4 className="mb-1">11 November 2019</h4>
                  <p className="text-muted">Monday</p>
                </div>

                <div className="col-12 col-sm-8 col-md-6 text-sm-right">
                  <div className="bookingrange btn btn-white btn-sm m-3">
                    <i className="fa fa-calendar mr-2" />
                    <span />
                    <i className="fa fa-chevron-down ml-2 " />
                  </div>
                </div>
              </div>

              {/* Schedule Widget */}
              <div className="card booking-schedule schedule-widget">
                {/* Schedule Header */}
                <div className="schedule-header">
                  <div className="row">
                    <div className="col-md-12">
                      {/* Day Slot */}
                      <div className="day-slot">
                        <ul>
                          <li className="left-arrow">
                            <a href="#">
                              <i className="fa fa-chevron-left" />
                            </a>
                          </li>
                          <li>
                            <span>Mon</span>
                            <span className="slot-date">
                              11 Nov <small className="slot-year">2019</small>
                            </span>
                          </li>
                          <li>
                            <span>Tue</span>
                            <span className="slot-date">
                              12 Nav <small className="slot-year">2019</small>
                            </span>
                          </li>
                          <li>
                            <span>Wed</span>
                            <span className="slot-date">
                              13 Nov <small className="slot-year">2019</small>
                            </span>
                          </li>
                          <li>
                            <span>Thu</span>
                            <span className="slot-date">
                              14 Nov <small className="slot-year">2019</small>
                            </span>
                          </li>
                          <li>
                            <span>Fri</span>
                            <span className="slot-date">
                              15 Nov <small className="slot-year">2019</small>
                            </span>
                          </li>
                          <li>
                            <span>Sat</span>
                            <span className="slot-date">
                              16 Nov <small className="slot-year">2019</small>
                            </span>
                          </li>
                          <li>
                            <span>Sun</span>
                            <span className="slot-date">
                              17 Nov <small className="slot-year">2019</small>
                            </span>
                          </li>
                          <li className="right-arrow">
                            <a href="#">
                              <i className="fa fa-chevron-right" />
                            </a>
                          </li>
                        </ul>
                      </div>
                      {/* /Day Slot */}
                    </div>
                  </div>
                </div>

                {/* /Schedule Header */}

                {/* Schedule Content */}

                <div className="schedule-cont">
                  <div className="row">
                    <div className="col-md-12">
                      {/* Time Slot */}

                      <div className="time-slot">
                        <ul className="clearfix">
                          <li>
                            <a className="timing" href="#">
                              <span>9:00</span> <span>AM</span>
                            </a>
                            <a className="timing" href="#">
                              <span>10:00</span> <span>AM</span>
                            </a>
                            <a className="timing" href="#">
                              <span>11:00</span> <span>AM</span>
                            </a>
                          </li>
                          <li>
                            <a className="timing" href="#">
                              <span>9:00</span> <span>AM</span>
                            </a>
                            <a className="timing" href="#">
                              <span>10:00</span> <span>AM</span>
                            </a>
                            <a className="timing" href="#">
                              <span>11:00</span> <span>AM</span>
                            </a>
                          </li>
                          <li>
                            <a className="timing" href="#">
                              <span>9:00</span> <span>AM</span>
                            </a>
                            <a className="timing" href="#">
                              <span>10:00</span> <span>AM</span>
                            </a>
                            <a className="timing" href="#">
                              <span>11:00</span>
                            </a>
                          </li>
                          <li>
                            <a href="#" className="timing">
                              <span>9:00</span> <span>AM</span>
                            </a>
                            <a href="#" className="timing">
                              <span>10:00</span> <span>AM</span>
                            </a>
                            <a href="#" className="timing">
                              <span>11:00</span>
                            </a>
                          </li>
                          <li>
                            <a className="timing" href="#">
                              <span>9:00</span> <span>AM</span>
                            </a>
                            <a className="timing selected" href="#">
                              <span>10:00</span> <span>AM</span>
                            </a>
                            <a href="#" className="timing">
                              <span>11:00</span> <span>AM</span>
                            </a>
                          </li>
                          <li>
                            <a href="#" className="timing">
                              <span>9:00</span> <span>AM</span>
                            </a>
                            <a href="#" className="timing">
                              <span>10:00</span> <span>AM</span>
                            </a>
                            <a href="#" className="timing">
                              <span>11:00</span> <span>AM</span>
                            </a>
                          </li>
                          <li>
                            <a href="#" className="timing">
                              <span>9:00</span> <span>AM</span>
                            </a>
                            <a href="#" className="timing">
                              <span>10:00</span> <span>AM</span>
                            </a>
                            <a href="#" className="timing">
                              <span>11:00</span> <span>AM</span>
                            </a>
                          </li>
                        </ul>
                      </div>

                      {/* /Time Slot */}
                    </div>
                  </div>
                </div>
                {/* /Schedule Content */}
              </div>
              {/* /Schedule Widget */}

              {/* Submit Section */}
              <div className="submit-section proceed-btn text-right">
                <a
                  href="booking-success.php"
                  className="btn btn-primary submit-btn"
                >
                  Book Appointment
                </a>
              </div>

              {/* /Submit Section */}
            </div>
          </div>
        </div>
      </div>
      {/* /Page Content */}
      <Footer />
    </div>
  );
}

Booking.propTypes = {
  dispatch: PropTypes.func.isRequired,
  updateEmailFunc: PropTypes.func,
  getScheduleFunc: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  booking: makeSelectBooking(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    updateEmailFunc: uEmail => {
      dispatch(updateEmailAction(uEmail));
    },
    getScheduleFunc: uId => {
      dispatch(bookAppointmentAction(uId));
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(Booking);
