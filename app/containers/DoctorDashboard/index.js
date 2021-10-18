/**
 *
 * DoctorDashboard
 *
 */

import React, { memo, useEffect, } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import SideNav from 'components/SideNav';
import ProfileWidget from 'components/ProfileWidget';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { Link } from 'react-router-dom';
import makeSelectDoctorDashboard from './selectors';
import reducer from './reducer';
import saga from './saga';
import DoctorAppointments from '../DoctorAppointments/Loadable';
import Footer from 'components/Footer';
import Header from 'components/Header';
import Img from '../../components/Img';
import Avatar from '../../images/avatar.png';
export function DoctorDashboard() {
  useInjectReducer({ key: 'doctorDashboard', reducer });
  useInjectSaga({ key: 'doctorDashboard', saga });

  return (
    <div>
      <Helmet>
        <title>Doctor Dashboard</title>
        <meta name="description" content="Description of DoctorDashboard" />
      </Helmet>
      <Header />
      {/* breadcrumb-bar */}
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
                    Dashboard
                  </li>
                </ol>
              </nav>
              <h2 className="breadcrumb-title">Dashboard</h2>
            </div>
          </div>
        </div>
      </div>
      {/* /breadcrumb-bar */}
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
             {/* <div className="row">
                <div className="col-md-12">
                  <div className="card dash-card">
                    <div className="card-body">
                      <div className="row">
                        <div className="col-md-12 col-lg-4">
                          <div className="dash-widget dct-border-rht">
                            <div className="circle-bar circle-bar1">
                              <div className="circle-graph1" data-percent="75">
                                <img
                                  src={Icon01}
                                  className="img-fluid"
                                  alt="patient"
                                />
                              </div>
                            </div>
                            <div className="dash-widget-info">
                              <h6>Total Patient</h6>
                              <h3>1500</h3>
                              <p className="text-muted">Till Today</p>
                            </div>
                          </div>
                        </div>

                        <div className="col-md-12 col-lg-4">
                          <div className="dash-widget dct-border-rht">
                            <div className="circle-bar circle-bar2">
                              <div className="circle-graph2" data-percent="65">
                                <img
                                  src={Icon02}
                                  className="img-fluid"
                                  alt="Patient"
                                />
                              </div>
                            </div>
                            <div className="dash-widget-info">
                              <h6>Today Patient</h6>
                              <h3>160</h3>
                              <p className="text-muted">06, Nov 2019</p>
                            </div>
                          </div>
                        </div>

                        <div className="col-md-12 col-lg-4">
                          <div className="dash-widget">
                            <div className="circle-bar circle-bar3">
                              <div className="circle-graph3" data-percent="50">
                                <img
                                  src={Icon03}
                                  className="img-fluid"
                                  alt="Patient"
                                />
                              </div>
                            </div>
                            <div className="dash-widget-info">
                              <h6>Appoinments</h6>
                              <h3>85</h3>
                              <p className="text-muted">06, Apr 2019</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div> */}

              <div className="row">
                <div className="col-md-12">
                  <h4 className="mb-4">Patient Appointment</h4>
                  <div className="appointment-tab">
                    {/* Appointment Tab */}
                    <ul className="nav nav-tabs nav-tabs-solid nav-tabs-rounded">
                      <li className="nav-item">
                        <a
                          className="nav-link active"
                          href="#upcoming-appointments"
                          data-toggle="tab"
                        >
                          Approved
                        </a>
                      </li>
                      {/* <li className="nav-item">
                        <a
                          className="nav-link"
                          href="#today-appointments"
                          data-toggle="tab"
                        >
                          Pending
                        </a>
                      </li> */}
                    </ul>
                    {/* /Appointment Tab */}

                    <div className="tab-content">
                      {/* Upcoming Appointment Tab */}
                      <div
                        className="tab-pane show active"
                        id="upcoming-appointments"
                      >
                        <div className="card card-table mb-0">
                          <div className="card-body">
                            <div className="table-responsive">
                              <DoctorAppointments />
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* /Upcoming Appointment Tab */}

                      {/* Today Appointment Tab */}
                      <div className="tab-pane" id="today-appointments">
                        <div className="card card-table mb-0">
                          <div className="card-body">
                            <div className="table-responsive">
                              <table className="table table-hover table-center mb-0">
                                <thead>
                                  <tr>
                                    <th>Patient Name</th>
                                    <th>Appt Date</th>
                                    <th>Purpose</th>
                                    <th>Type</th>
                                    <th className="text-center">Paid Amount</th>
                                    <th />
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr>
                                    <td>
                                      <h2 className="table-avatar">
                                        <a
                                          href="patient-profile.html"
                                          className="avatar avatar-sm mr-2"
                                        >
                                          <Img
                                            className="avatar-img rounded-circle"
                                            src={Avatar}
                                            alt="User Image"
                                          />
                                        </a>
                                        <a href="patient-profile.html">
                                          Richard Wilson. <span>#PT0016</span>
                                        </a>
                                      </h2>
                                    </td>
                                    <td>
                                      11 Nov 2019{' '}
                                      <span className="d-block text-info">
                                        10.00 AM
                                      </span>
                                    </td>
                                    <td>General</td>
                                    <td>New Patient</td>
                                    <td className="text-center">$150</td>
                                    <td className="text-right">
                                      <div className="table-action">
                                        <a
                                          href="javascript:void(0);"
                                          className="btn btn-sm bg-info-light"
                                        >
                                          <i className="fa fa-eye" /> View
                                        </a>

                                        <a
                                          href="javascript:void(0);"
                                          className="btn btn-sm bg-success-light"
                                        >
                                          <i className="fa fa-check" /> Accept
                                        </a>
                                        <a
                                          href="javascript:void(0);"
                                          className="btn btn-sm bg-danger-light"
                                        >
                                          <i className="fa fa-times" /> Cancel
                                        </a>
                                      </div>
                                    </td>
                                  </tr>

                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* /Today Appointment Tab */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

DoctorDashboard.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  doctorDashboard: makeSelectDoctorDashboard(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(DoctorDashboard);
