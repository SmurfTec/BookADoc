/**
 *
 * Dashboard
 *
 */

import React from 'react';
import { Helmet } from 'react-helmet';
import SideNav from 'components/LabSideNav';
import ProfileWidget from 'components/ProfileWidget';
import { Link } from 'react-router-dom';
import Header from 'components/Header';
import Footer from 'components/Footer';
import DoctorAppointments from '../../DoctorAppointments/Loadable';
import Img from '../../../components/Img';
import Avatar from '../../../images/avatar.png';

export default function Dashboard() {
  return (
    <div>
      <Helmet>
        <title>Laboratory Dashboard</title>
        <meta name="description" content="Laboratory Dashboard" />
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
