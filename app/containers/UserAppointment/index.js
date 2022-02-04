/**
 *
 * UserAppointments
 *
 */
import lodash from 'lodash';
import React, { memo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import moment from 'moment';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { toast } from 'react-toastify';

import { getUsername, isUserLoggedIn } from '../../utils/helpers';
import makeSelectUserAppointments from './selectors';
import reducer from './reducer';
import saga from './saga';
import { bookAppointmentAction } from './actions';
import Img from '../../components/Img';
import Avatar from '../../images/Avatar.png';

export function UserAppointments(props) {
  useInjectReducer({ key: 'userAppointments', reducer });
  useInjectSaga({ key: 'bookAppointments', saga });
  const {
    history,
    user,
    userAppointments,
    bookAppointment,
    fromTime,
    showLogInPopup,
    showBookingConfirmationPopup,
    geolocation,
  } = props;

  const [userRow, setUserRow] = useState({});
  const [selectedDate, setSelectedDate] = useState(
    moment(fromTime ? new Date(fromTime) : new Date()).startOf('day'),
  );
  const [selectedSlot, setSelectedSlot] = useState(0);

  useEffect(() => {
    setUserRow(user);
  }, [user, userRow.schedules]);

  const prevDayHandler = e => {
    e.preventDefault();
    const date = selectedDate.add(-1, 'day');
    setSelectedDate(moment(date));
  };

  const nextDayHandler = e => {
    e.preventDefault();
    const date = selectedDate.add(1, 'day');
    setSelectedDate(moment(date));
  };

  const toggleSelectedSlot = (e, slot) => {
    e.preventDefault();

    const value = slot.valueOf();

    if (value >= getApplicableAfter()) {
      setSelectedSlot(value === selectedSlot ? 0 : value);
    }
  };

  const showSignInPopup = () => {
    if (!isUserLoggedIn()) {
      showLogInPopup();
      return false;
    }

    return true;
  };

  const onBookAppointmentClick = e => {
    e.preventDefault();
    if (userAppointments.saving) return;

    if (selectedSlot) {
      if (selectedSlot < getApplicableAfter()) {
        toast.warn('Cannot book appointment for this time slot');
        return;
      }

      if (!showSignInPopup()) {
        return;
      }

      console.log(`user`, user);

      showBookingConfirmationPopup({
        bookingTime: selectedSlot,
        geolocation,
        professional: {
          name: user.fullName,
          email: user.email,
          lat: user.latitude,
          lng: user.longitude,
          rate: user.consultationFee,
          isLuxury: user.isLuxury,
        },
      });
    } else {
      toast.warn('Select a slot for the appointment');
    }
  };

  const getApplicableAfter = () => Date.now() + 30 * 60 * 1000; // 30min

  /* NOT IN USE
     const millisToDay = millis => moment(millis).format('DD');

     const renderScheduler = doctorScheduler => {
     console.log('doctorScheduler', doctorScheduler);
     return doctorScheduler.map(schedule => {
     if (schedule.startTime !== '') {
     return (
     <li>
     <a
     className="timing"
     href="#"
     id={`${currentMonth}-${parseInt(currentDay)}-` + `0`}
     onClick={e => doSelectSlot(e, '9:00 AM')}
     >
     <span>{millisToDay(schedule.startTime)}</span>
     </a>
     </li>
     );
     }
     });
     };
     */
  const NoSlot = () => (
    <p className="d-flex flex-fill justify-content-center align-items-center">
      No appointment slots
    </p>
  );

  const TimeSlots = ({ date, schedules }) => {
    const schedule = schedules[0];

    if (!schedule) {
      return <NoSlot />;
    }

    let weekDay = 1 + moment(date).isoWeekday();

    if (weekDay === 8) {
      weekDay = 1;
    }

    const day = schedule.doctorScheduler.find(s => s.weekDay === weekDay);
    const startTime = parseInt(day.startTime);
    const diff = parseInt(day.endTime) - startTime;
    const avergeTimeConsultation =
      parseInt(schedule.avergeTimeConsultation) * 1000 * 60;
    let totalSlots = diff / avergeTimeConsultation - 1;

    if (totalSlots > 50) {
      totalSlots = 50;
    }

    if (isNaN(totalSlots)) {
      return <NoSlot />;
    }

    return (
      <div>
        <ul>
          {lodash.range(Math.floor(totalSlots)).map((slot, index) => {
            const slotTime = moment(date).add(
              startTime + index * avergeTimeConsultation,
              'milliseconds',
            );
            return <TimeSlot key={slotTime.valueOf()} slot={slotTime} />;
          })}
        </ul>
      </div>
    );
  };

  const TimeSlot = ({ slot }) => {
    const time = slot.valueOf();

    return (
      <li className="m-1">
        <a
          href="#"
          className={`timing ${time === selectedSlot ? 'selected' : ''} ${
            time < getApplicableAfter() ? 'disabled' : ''
          } `}
          onClick={e => toggleSelectedSlot(e, slot)}
        >
          <span className="nowrap">{slot.format('hh:mm a')}</span>
        </a>
      </li>
    );
  };

  return (
    <div className="card">
      <div className="card-body">
        <div className="doctor-widget">
          <div className="doc-info-left">
            <div className="doctor-img">
              {/* <Link to={`/booking/${userRow.userId}`}> */}
              <Img
                src={userRow.imageUrl || Avatar}
                className="img-fluid"
                alt="User Image"
                fallbackImageSrc={Avatar}
              />
              {/* </Link> */}
            </div>

            <div className="doc-info-cont">
              <h4 className="doc-name">
                <a href="#">{getUsername(userRow.role, userRow.fullName)}</a>
              </h4>
              <div className="clini-infos">
                <ul>
                  <li>
                    <i className="" /> Specialty:{' '}
                    {userRow.specialties !== undefined &&
                    userRow.specialties.length > 0
                      ? userRow.specialties[0].name
                      : ''}
                  </li>
                  <li>
                    <i className="" />
                    Consultation Fee: GH₵
                    {userRow.consultationFee}{' '}
                    <i className="" data-toggle="tooltip" title="Lorem Ipsum" />
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="doc-info-right">
            <div className="clinic-booking">
              <div className="row">
                <div className="col-md-12">
                  {/* Time Slot */}
                  <div className="schedule-header">
                    <div className="row">
                      <div className="col-md-12">
                        <div className="d-flex flex-row">
                          <div>
                            <a onClick={prevDayHandler}>
                              <i className="fa fa-chevron-left" />
                            </a>
                          </div>
                          <div className="d-flex flex-fill justify-content-center align-items-center">
                            <h4>{selectedDate.format('ddd, MMM DD')}</h4>
                          </div>
                          <div>
                            <a onClick={nextDayHandler}>
                              <i className="fa fa-chevron-right" />
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="time-slot ml-3">
                    {user.schedules && (
                      <TimeSlots
                        date={selectedDate}
                        schedules={user.schedules}
                      />
                    )}
                  </div>
                </div>
              </div>
              <a
                href="#"
                className="apt-btn mt-5"
                onClick={onBookAppointmentClick}
                disabled={userAppointments.saving}
              >
                {selectedSlot && userAppointments.saving
                  ? 'Booking...'
                  : 'Book Appointment'}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

UserAppointments.propTypes = {
  bookAppointment: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  userAppointments: makeSelectUserAppointments(),
});

function mapDispatchToProps(dispatch) {
  return {
    bookAppointment: (data, toastr) =>
      dispatch(bookAppointmentAction(data, toastr)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default withRouter(
  compose(
    withConnect,
    memo,
  )(UserAppointments),
);
