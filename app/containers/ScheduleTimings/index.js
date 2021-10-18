/**
 *
 * ScheduleTimings
 *
 */

import React from 'react';
import { Helmet } from 'react-helmet';
import SideNav from 'components/SideNav';
import { Link } from 'react-router-dom';
import Footer from 'components/Footer';
import Header from 'components/Header';
import ProfileWidget from '../../components/ProfileWidget';
import Scheduler from '../../components/Scheduler';

export default function ScheduleTimings() {
  return (
    <div>
      <Helmet>
        <title>Schedule Timings</title>
        <meta name="description" content="Description of Schedule Timings" />
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
                    Schedule Timings
                  </li>
                </ol>
              </nav>
              <h2 className="breadcrumb-title">Schedule Timings</h2>
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
              <div className="row">
                <div className="col-sm-12">
                  <Scheduler />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <ScheduleModal /> */}
      <Footer />
    </div>
  );
}
