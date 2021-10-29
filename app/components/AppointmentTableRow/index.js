/**
 *
 * AppointmentTableRow
 *
 */

import React, { memo, useState, useEffect } from 'react';
import axios from 'axios';

import { convertMillisToDate } from '../../utils/helpers';
import Img from '../Img';
import Avatar from '../../images/avatar.png';
import { toast } from 'react-toastify';

function AppointmentTableRow(props) {
  const { appointment } = props;
  const [appointmentRow, setAppointmentRow] = useState({});
  useEffect(() => {
    setAppointmentRow(appointment);
    // console.log('appointment', appointment);
  }, [appointment]);

  const acceptAppointment = async e => {
    const { option } = e.currentTarget.dataset;

    console.log(`option`, option);
    const getUserData = JSON.parse(localStorage.getItem('user'));
    console.log(`getUserData`, getUserData);

    if (getUserData) {
      const getToken = localStorage.getItem('token');
      const doctorEmail = getUserData.email;
      const sessionToken = getToken;

      try {
        const res = await axios.post(
          `https://api.bookadoc.online/appointment/approveAppointment`,
          {
            email: doctorEmail,
            appointmentId: appointmentRow.appointmentId,
            sessionToken: sessionToken,
          },
        );
        console.log(`res`, res);
        if (/success/i.test(res.data.message)) {
          setAppointmentRow(st => ({ ...st, appointStatus: 'CONFIRM' }));
          toast.success('Appointment Successfully Approved!');
          window.location.reload();
        }
      } catch (err) {
        console.log(`err`, err);
        toast.error('Error Approving Appointment!');
      }
    }
  };

  const cancelAppointment = async e => {
    const getUserData = JSON.parse(localStorage.getItem('user'));
    console.log(`getUserData`, getUserData);

    if (getUserData) {
      const getToken = localStorage.getItem('token');
      const doctorEmail = getUserData.email;
      const sessionToken = getToken;

      try {
        const res = await axios.post(
          `https://api.bookadoc.online/appointment/cancelAppointment`,
          {
            email: doctorEmail,
            appointmentId: appointmentRow.appointmentId,
            sessionToken: sessionToken,
          },
        );
        if (/success/i.test(res.data.message)) {
          setAppointmentRow(st => ({ ...st, appointStatus: 'CONFIRM' }));
          toast.success('Appointment Successfully Cancelled!');
          window.location.reload();
        }
      } catch (err) {
        console.log(`err`, err);
        toast.error('Error Cancelling Appointment!');
      }
    }
  };

  return (
    <tr>
      <td>
        <h2 className="table-avatar">
          <a className="avatar avatar-sm mr-2">
            <Img
              className="avatar-img rounded-circle"
              src={appointmentRow.patientImageUrl || Avatar}
              fallbackImageSrc={Avatar}
              alt="User Image"
            />
          </a>
          <a>
            {appointmentRow.patientName} {/* <span>#PT0016</span> */}
          </a>
        </h2>
      </td>
      <td>
        {convertMillisToDate(appointmentRow.appointmentDate)}{' '}
        {/* <span className="d-block text-info">10.00 AM</span> */}
      </td>
      {/* <td>General</td>
      <td>New Patient</td>
      <td className="text-center">$150</td> */}
      <td className="text-right">
        <div className="table-action">
          <a
            href={`https://www.google.com/maps/dir/?api=1&destination=${
              appointmentRow.appointmentLattitude
            },${appointmentRow.appointmentLongitude}`}
            target="_blank"
            className="btn btn-sm bg-info-light"
          >
            get me to the patient's home
          </a>
          {/* <a href="javascript:void(0);" className="btn btn-sm bg-info-light">
            <i className="fa fa-eye" /> View
          </a>*/}

          {appointmentRow.appointmentStatus === 'PENDING' && (
            <>
              <a
                href="javascript:void(0);"
                className="btn btn-sm bg-success-light"
                onClick={acceptAppointment}
                data-option="accept"
              >
                <i className="fa fa-check" /> Accept
              </a>
              <a
                href="javascript:void(0);"
                className="btn btn-sm bg-danger-light"
                onClick={cancelAppointment}
                data-option="cancel"
              >
                <i className="fa fa-times" /> Cancel
              </a>
            </>
          )}
        </div>
      </td>
    </tr>
  );
}

AppointmentTableRow.propTypes = {};

export default memo(AppointmentTableRow);
