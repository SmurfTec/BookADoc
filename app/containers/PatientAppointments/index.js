/**
 *
 * PatientAppointments
 *
 */

import React, { memo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Helmet } from 'react-helmet';
import { toast } from 'react-toastify';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { Link } from 'react-router-dom';
import SideNav from 'components/PatientSideNav';
import Footer from 'components/Footer';
import Header from 'components/Header';
import Img from 'components/Img';
import Avatar from '../../images/Avatar.png';
import ProfileWidget from '../../components/ProfileWidget';
import makeSelectPatientAppointments from './selectors';
import reducer from './reducer';
import saga from './saga';
import { getPatientAppointmentsAction, updateListIndexAction } from './actions';
import { convertMillisToDate } from '../../utils/helpers';

export function PatientAppointments(props) {
  useInjectReducer({ key: 'patientAppointments', reducer });
  useInjectSaga({ key: 'patientAppointments', saga });

  const { patientAppointments } = props;
  const { appointments } = patientAppointments;

  const [listIndex, setListIndex] = useState(0);

  useEffect(() => {
    setListIndex(patientAppointments.listIndex);
    getAppointments();
  }, [patientAppointments.listIndex]);

  const loadMore = e => {
    e.preventDefault();
    props.updateListIndexFunc();
  };

  const getAppointments = () => {
    props.getPatientAppointmentsFunc(listIndex, toast);
  };

  const Appointment = data => {
    const { appointment } = data;
    return (
      <tr>
        <td>
          <h2 className="table-avatar">
            <a href="" className="avatar avatar-sm mr-2">
              <Img
                className="avatar-img rounded-circle"
                src={appointment.doctor.imageUrl || Avatar}
                fallbackImageSrc={Avatar}
                alt="User Image"
              />
            </a>
            <a href="">
              {appointment.doctor.fullName} {/* <span>#PT0016</span> */}
            </a>
          </h2>
        </td>
        <td>{convertMillisToDate(appointment.appointmentDate)} </td>
        <td>{appointment.doctor.email}</td>
        <td>
          GH₵
          {appointment.doctor.consultationFee}
        </td>
        <td>{appointment.appointmentMode}</td>
        <td>{appointment.appointmentStatus}</td>
      </tr>
    );
  };

  const renderAppointmentRow = () =>
    appointments &&
    appointments.appointment &&
    appointments.appointment.map(appointment => (
      <Appointment appointment={appointment} />
    ));

  const renderAppointments = () => {
    return (
      <div>
        <table className="table table-hover table-center mb-0">
          <thead>
            <tr>
              <th>Doctor Name</th>
              <th>Booking Date</th>
              <th>Doctor Email</th>
              <th>Doctor Rate</th>
              <th>Mode</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>{renderAppointmentRow()}</tbody>
        </table>
        {(!appointments ||
          !appointments.appointment ||
          appointments.appointment.length == 0) && (
          <div className="col-md-12">
            <div className="load-more text-center mt-2">
              <h4>No Appointment Yet</h4>
            </div>
          </div>
        )}

        {appointments &&
          appointments.appointment &&
          appointments.appointment.length > 0 && (
            <div className="col-md-12">
              <div className="load-more text-center">
                <button
                  className="btn btn-primary btn-sm"
                  onClick={e => loadMore(e)}
                >
                  Load More
                </button>
              </div>
            </div>
          )}
      </div>
    );
  };

  return (
    <div>
      <Helmet>
        <title>Appointments</title>
        <meta name="description" content="Description of Appointments" />
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
                  <li className="breadcrumb-item active" aria-current="page">
                    Appointments
                  </li>
                </ol>
              </nav>
              <h2 className="breadcrumb-title">Appointments</h2>
            </div>
          </div>
        </div>
      </div>
      {/* /Breadcrumb */}

      {/* Page Content */}
      <div className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-5 col-lg-4 col-xl-3 theiaStickySidebar">
              {/* Profile Sidebar */}
              <div className="profile-sidebar">
                <ProfileWidget />
                <SideNav />
              </div>
              {/* /Profile Sidebar */}
            </div>
            <div className="col-md-7 col-lg-8 col-xl-9">
              {renderAppointments()}
            </div>
          </div>
        </div>
      </div>
      {/* /Page Content */}
      <Footer />
    </div>
  );
}

PatientAppointments.propTypes = {
  dispatch: PropTypes.func.isRequired,
  getPatientAppointmentsFunc: PropTypes.func,
  updateListIndexFunc: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  patientAppointments: makeSelectPatientAppointments(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    getPatientAppointmentsFunc: (listIndexTemp, toastr) => {
      dispatch(getPatientAppointmentsAction(listIndexTemp, toastr));
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
)(PatientAppointments);
