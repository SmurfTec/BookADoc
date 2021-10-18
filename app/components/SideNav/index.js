/**
 *
 * SideNav
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';
import { Link } from "react-router-dom";

function SideNav() {
  const logoutUser = e => {
    e.preventDefault();
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    window.location.href = '/';
  };

  return (
      <div className="dashboard-widget">
        <nav className="dashboard-menu">
          <ul>
            <li className={window.location.pathname === '/dashboard' ? 'active' : ''}>
              <Link to="/dashboard">
                <i className="fa fa-columns"></i>
                <span>Dashboard</span>
              </Link>
            </li>

            <li className={window.location.pathname === '/scheduler' ? 'active' : ''}>
              <Link to="/scheduler">
                <i className="fa fa-clock"></i>
                <span>Scheduler</span>
              </Link>
            </li>

            {/* <li className={window.location.pathname === '/past-consult' ? 'active' : ''}>
              <Link to="past-consult">
                <i className="fa fa-calendar"></i>
                <span>Past Appointments</span>
              </Link>
            </li> */}
            {/*<li className={window.location.pathname === '/invoices' ? 'active' : ''}>
              <Link to="invoices">
                <i class="fa fa-file-invoice"></i>
                <span>Invoices</span>
              </Link>
            </li>*/}

            {/*<li className={window.location.pathname === '/chat-doctor' ? 'active' : ''}>
              <Link href="chat-doctor">
                <i class="fa fa-comments"></i>
                <span>Message</span>
                <small class="unread-msg">23</small>
              </Link>
            </li>*/}
            <li className={window.location.pathname === '/settings' ? 'active' : ''}>
              <Link to="/settings">
                <i className="fa fa-cog"></i>
                <span>Settings</span>
              </Link>
            </li>
            <li className={window.location.pathname === '/fee' ? 'active' : ''}>
              <Link to="/fee">
                <i className="fa fa-share"></i>
                <span>Consultation Fee</span>
              </Link>
            </li>
            <li className={window.location.pathname === '/change-password' ? 'active' : ''}>
              <Link to="/change-password">
                <i className="fa fa-lock"></i>
                <span>Change Password</span>
              </Link>
            </li>
            <li className={window.location.pathname === '/logout' ? 'active' : ''}>
            <a href="javascript:void(0);" onClick={logoutUser}>
                <i className="fa fa-sign-out"></i>
                <span>Logout</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
  );
}

SideNav.propTypes = {};

export default SideNav;
