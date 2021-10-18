/**
 *
 * Settings
 *
 */

import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';

import SideNav from '../../components/SideNav';
import Footer from 'components/Footer';
import Header from 'components/Header';
import ProfileWidget from '../../components/ProfileWidget';
import ProSettings from '../../components/ProSettings/Loadable';

export default function Settings() {
  return (
    <div>
      <Helmet>
        <title>Settings</title>
        <meta name="description" content="Description of Settings" />
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
                  <li className="breadcrumb-item active">Profile Settings</li>
                </ol>
              </nav>
              <h2 className="breadcrumb-title">Profile Settings</h2>
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
            <ProSettings />
          </div>
        </div>
      </div>
      {/* /Page Content */}
      <Footer />
    </div>
  );
}
