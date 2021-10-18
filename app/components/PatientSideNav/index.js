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
            <li className={window.location.pathname === '/patient/appointments' ? 'active' : ''}>
              <Link to="appointments">
                <i className="fa fa-columns"></i>
                <span>appointments</span>
              </Link>
            </li>
            <li className={window.location.pathname === '/patient/settings' ? 'active' : ''}>
              <Link to="settings">
                <i className="fa fa-cog"></i>
                <span>Settings</span>
              </Link>
            </li>
            <li className={window.location.pathname === '/patient/change-password' ? 'active' : ''}>
              <Link to="change-password">
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
