/**
 *
 * DoctorAppointments
 *
 */

import React, { memo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { toast } from 'react-toastify';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectDoctorAppointments from './selectors';
import reducer from './reducer';
import saga from './saga';
import { getDoctorAppointmentsAction, updateListIndexAction } from './actions';
import AppointmentTableRow from '../../components/AppointmentTableRow/Loadable';
export function DoctorAppointments(props) {
  useInjectReducer({ key: 'doctorAppointments', reducer });
  useInjectSaga({ key: 'doctorAppointments', saga });

  const [appontments, setAppontments] = useState([]);
  const [listIndex, setListIndex] = useState(0);
  useEffect(() => {
    // props.getDoctorAppointmentsFunc(toast);
  });
  useEffect(() => {
    setListIndex(props.doctorAppointments.listIndex);
    getAppointments();
  }, [props.doctorAppointments.listIndex]);

  useEffect(() => {
    setAppontments(props.doctorAppointments.appointments);
  }, [props.doctorAppointments.appointments]);

  const loadMore = e => {
    e.preventDefault();
    props.updateListIndexFunc();
  };

  const getAppointments = () => {
    props.getDoctorAppointmentsFunc(listIndex, toast);
  };

  const renderAppointments = () =>
    appontments.map(appontment => (
      <AppointmentTableRow
        key={appontment.appointmentId}
        appointment={appontment}
      />
    ));

  return (
    <div>
      <table className="table table-hover table-center mb-0">
        <thead>
          <tr>
            <th>Patient Name</th>
            <th>Appt Date</th>
            {/* <th>Purpose</th>
            <th>Type</th> */}
            {/* <th className="text-center">Paid Amount</th> */}
            <th />
          </tr>
        </thead>
        <tbody>{renderAppointments()}</tbody>
      </table>
      {appontments !== null && appontments.length === 0 && (
        <div className="col-md-12">
          <div className="load-more text-center mt-2">
            <h4>No Appointment Yet</h4>
          </div>
        </div>
      )}

      <div className="col-md-12">
        <div className="load-more text-center">
          <button className="btn btn-primary btn-sm" onClick={e => loadMore(e)}>
            Load More
          </button>
        </div>
      </div>
    </div>
  );
}

DoctorAppointments.propTypes = {
  dispatch: PropTypes.func.isRequired,
  getDoctorAppointmentsFunc: PropTypes.func,
  updateListIndexFunc: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  doctorAppointments: makeSelectDoctorAppointments(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    getDoctorAppointmentsFunc: (listIndexTemp, toastr) => {
      dispatch(getDoctorAppointmentsAction(listIndexTemp, toastr));
    },
    updateListIndexFunc: () => {
      dispatch(updateListIndexAction());
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
)(DoctorAppointments);
