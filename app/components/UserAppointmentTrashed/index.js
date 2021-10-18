/**
 *
 * AppointmentTableRow
 *
 */

import React, { memo, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';
import moment from 'moment';

function UserAppointment(props) {
  const { user } = props;
  const [userRow, setUserRow] = useState({});
    const [currentMonth, SetCurrentMonth] = useState('');
    const [currentDay, SetCurrentDay] = useState('');
    const [currentYear, SetCurrentYear] = useState('');

    useEffect(() => {
        SetCurrentMonth(moment().format("MMMM").valueOf());
        SetCurrentDay(moment().format("d").valueOf());
        SetCurrentYear(moment().format("yyyy").valueOf());
    }, []);

  useEffect(() => {
    setUserRow(user);
    // console.log("userRow.specialities", user.specialties[0].name);
  }, [user]);

  useEffect(() => {
      const d = new Date('2020-10-10');
     console.log("d.getMilliseconds()", d.getMilliseconds());
  },[]);

  const doSelectSlot = (e, time) => {
    e.preventDefault();
    /*console.log("e", e.target.offsetParent.id);
    console.log("time", time);*/
    $('.timing').removeClass('selected');
    $('#'+e.target.offsetParent.id).addClass('selected');
  };

  return (
    <div className="card">
      <div className="card-body">
        <div className="doctor-widget">
          <div className="doc-info-left">
            <div className="doctor-img">
              <Link to={`/booking/${userRow.email}`}>
                <img
                  src={userRow.imageUrl}
                  className="img-fluid"
                  alt="User Image"
                />
              </Link>
            </div>

            <div className="doc-info-cont">
              <h4 className="doc-name">
                <a href="#">{userRow.fullName}</a>
              </h4>
              <div className="clini-infos">
                <ul>
                  <li>
                    <i className="fa fa-thumbs-up" /> Specialty:{' '}
                    {userRow.specialties !== undefined &&
                    userRow.specialties.length > 0
                      ? userRow.specialties[0].name
                      : ''}
                  </li>
                  <li>
                    <i className="fa fa-money-bill" /> $
                    {userRow.consultationFee}{' '}
                    <i
                      className="fa fa-info-circle"
                      data-toggle="tooltip"
                      title="Lorem Ipsum"
                    />
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

                  <div className="time-slot">
                    <ul className="clearfix">
                      <li>
                        <a className="timing" href="#" id={currentMonth+'-'+(parseInt(currentDay))+'-'+'0'} onClick={e=> doSelectSlot(e, '9:00 AM')}>
                          <span>9:00</span> <span>AM</span>
                        </a>
                        <a className="timing" href="#" id={currentMonth+'-'+(parseInt(currentDay))+'-'+'1'} onClick={e=> doSelectSlot(e, '10:00 AM')}>
                          <span>10:00</span> <span>AM</span>
                        </a>
                        <a className="timing" href="#" id={currentMonth+'-'+(parseInt(currentDay))+'-'+'2'} onClick={e=> doSelectSlot(e, '11:00 AM')}>
                          <span>11:00</span> <span>AM</span>
                        </a>
                      </li>
                      <li>
                        <a className="timing" href="#" id={currentMonth+'-'+(parseInt(currentDay)+1)+'-'+'0'} onClick={e=> doSelectSlot(e, '9:00 AM')}>
                          <span>9:00</span> <span>AM</span>
                        </a>
                        <a className="timing" href="#" id={currentMonth+'-'+(parseInt(currentDay)+1)+'-'+'1'} onClick={e=> doSelectSlot(e, '10:00 AM')}>
                          <span>10:00</span> <span>AM</span>
                        </a>
                        <a className="timing" href="#" id={currentMonth+'-'+(parseInt(currentDay)+1)+'-'+'2'} onClick={e=> doSelectSlot(e, '11:00 AM')}>
                          <span>11:00</span> <span>AM</span>
                        </a>
                      </li>
                      <li>
                        <a className="timing" href="#" id={currentMonth+'-'+(parseInt(currentDay)+2)+'-'+'0'} onClick={e=> doSelectSlot(e, '9:00 AM')}>
                          <span>9:00</span> <span>AM</span>
                        </a>
                        <a className="timing" href="#" id={currentMonth+'-'+(parseInt(currentDay)+2)+'-'+'1'} onClick={e=> doSelectSlot(e, '10:00 AM')}>
                          <span>10:00</span> <span>AM</span>
                        </a>
                        <a className="timing" href="#" id={currentMonth+'-'+(parseInt(currentDay)+2)+'-'+'2'} onClick={e=> doSelectSlot(e, '11:00 AM')}>
                          <span>11:00</span> <span>AM</span>
                        </a>
                      </li>
                      <li>
                        <a className="timing" href="#" id={currentMonth+'-'+(parseInt(currentDay)+3)+'-'+'0'} onClick={e=> doSelectSlot(e, '9:00 AM')}>
                          <span>9:00</span> <span>AM</span>
                        </a>
                        <a className="timing" href="#" id={currentMonth+'-'+(parseInt(currentDay)+3)+'-'+'1'} onClick={e=> doSelectSlot(e, '10:00 AM')}>
                          <span>10:00</span> <span>AM</span>
                        </a>
                        <a className="timing" href="#" id={currentMonth+'-'+(parseInt(currentDay)+3)+'-'+'2'} onClick={e=> doSelectSlot(e, '11:00 AM')}>
                          <span>11:00</span> <span>AM</span>
                        </a>
                      </li>
                      <li>
                        <a className="timing" href="#" id={currentMonth+'-'+(parseInt(currentDay)+4)+'-'+'0'} onClick={e=> doSelectSlot(e, '9:00 AM')}>
                          <span>9:00</span> <span>AM</span>
                        </a>
                        <a className="timing" href="#" id={currentMonth+'-'+(parseInt(currentDay)+4)+'-'+'1'} onClick={e=> doSelectSlot(e, '10:00 AM')}>
                          <span>10:00</span> <span>AM</span>
                        </a>
                        <a className="timing" href="#" id={currentMonth+'-'+(parseInt(currentDay)+4)+'-'+'2'} onClick={e=> doSelectSlot(e, '11:00 AM')}>
                          <span>11:00</span> <span>AM</span>
                        </a>
                      </li>
                      <li>
                        <a className="timing" href="#" id={currentMonth+'-'+(parseInt(currentDay)+5)+'-'+'0'} onClick={e=> doSelectSlot(e, '9:00 AM')}>
                          <span>9:00</span> <span>AM</span>
                        </a>
                        <a className="timing" href="#" id={currentMonth+'-'+(parseInt(currentDay)+5)+'-'+'1'} onClick={e=> doSelectSlot(e, '10:00 AM')}>
                          <span>10:00</span> <span>AM</span>
                        </a>
                        <a className="timing" href="#" id={currentMonth+'-'+(parseInt(currentDay)+5)+'-'+'2'} onClick={e=> doSelectSlot(e, '11:00 AM')}>
                          <span>11:00</span> <span>AM</span>
                        </a>
                      </li>
                      <li>
                        <a className="timing" href="#" id={currentMonth+'-'+(parseInt(currentDay)+6)+'-'+'0'} onClick={e=> doSelectSlot(e, '9:00 AM')}>
                          <span>9:00</span> <span>AM</span>
                        </a>
                        <a className="timing" href="#" id={currentMonth+'-'+(parseInt(currentDay)+6)+'-'+'1'} onClick={e=> doSelectSlot(e, '10:00 AM')}>
                          <span>10:00</span> <span>AM</span>
                        </a>
                        <a className="timing" href="#" id={currentMonth+'-'+(parseInt(currentDay)+6)+'-'+'2'} onClick={e=> doSelectSlot(e, '11:00 AM')}>
                          <span>11:00</span> <span>AM</span>
                        </a>
                      </li>

                    </ul>
                  </div>

                    {/* /Time Slot */}
                </div>
              </div>
              <Link className="apt-btn mt-5" to={`/booking/${userRow.userId}`}>
                Book Appointment
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

UserAppointment.propTypes = {};

export default memo(UserAppointment);
