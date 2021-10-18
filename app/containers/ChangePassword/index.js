/**
 *
 * ChangePassword
 *
 */

import React, { memo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import SideNav from 'components/SideNav';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import FormValidator from '../../utils/FormValidator';
import makeSelectChangePassword from './selectors';
import Footer from 'components/Footer';
import Header from 'components/Header';
import reducer from './reducer';
import saga from './saga';
import doctorThumb02 from '../../theme/img/doctors/doctor-thumb-02.jpg';
import { changePasswordAction } from './actions';
import Warning from '../../components/Warning/Loadable';
import ProfileWidget from "../../components/ProfileWidget";
import ChangePasswordComponent from 'components/ChangePassword';

export function ChangePassword(props) {
  return (
    <div>
      <Helmet>
        <title>Change Password</title>
        <meta name="description" content="Description of Change Password" />
      </Helmet>
      <Header/>
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
                    Change Password
                  </li>
                </ol>
              </nav>
              <h2 className="breadcrumb-title">Change Password</h2>
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
                <ProfileWidget/>
                <SideNav />
              </div>
              {/* /Profile Sidebar */}
            </div>
              <div className="col-md-7 col-lg-8 col-xl-9">
                <ChangePasswordComponent />
              </div>
          </div>
        </div>
      </div>
      {/* /Page Content */}
      <Footer/>
    </div>
  );
}

const withConnect = connect();

export default compose(
  withConnect,
  memo,
)(ChangePassword);
