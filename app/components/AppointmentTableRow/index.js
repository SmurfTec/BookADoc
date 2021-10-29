/**
 *
 * AppointmentTableRow
 *
 */

import React, { memo, useState, useEffect } from 'react';

import { convertMillisToDate } from '../../utils/helpers';
import Img from '../Img';
import Avatar from '../../images/avatar.png';

function AppointmentTableRow(props) {
  const { appointment } = props;
  const [appointmentRow, setAppointmentRow] = useState({});
  useEffect(() => {
    setAppointmentRow(appointment);
    // console.log('appointment', appointment);
  }, [appointment]);

  return (
    <tr>
      <td>
        <h2 className="table-avatar">
          <a className="avatar avatar-sm mr-2">
            <Img
              className="avatar-img rounded-circle"
              src={appointment.patientImageUrl || Avatar}
              fallbackImageSrc={Avatar}
              alt="User Image"
            />
          </a>
          <a>
            {appointment.patientName} {/* <span>#PT0016</span> */}
          </a>
        </h2>
      </td>
      <td>
        {convertMillisToDate(appointment.appointmentDate)}{' '}
        {/* <span className="d-block text-info">10.00 AM</span> */}
      </td>
      {/* <td>General</td>
      <td>New Patient</td>
      <td className="text-center">$150</td> */}
      <td className="text-right">
        <div className="table-action">
          <a
            href={`https://www.google.com/maps/dir/?api=1&destination=${
              appointment.appointmentLattitude
            },${appointment.appointmentLongitude}`}
            target="_blank"
            className="btn btn-sm bg-info-light"
          >
            get me to the patient's home
          </a>
          {/* <a href="javascript:void(0);" className="btn btn-sm bg-info-light">
            <i className="fa fa-eye" /> View
          </a>

          <a href="javascript:void(0);" className="btn btn-sm bg-success-light">
            <i className="fa fa-check" /> Accept
          </a> */}
          {/* <a href="javascript:void(0);" className="btn btn-sm bg-danger-light">
            <i className="fa fa-times" /> Cancel
          </a> */}
        </div>
      </td>
    </tr>
  );
}

AppointmentTableRow.propTypes = {};

export default memo(AppointmentTableRow);
