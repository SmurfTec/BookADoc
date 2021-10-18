/**
 *
 * SideNav
 *
 */

import React from 'react';
import { Link } from 'react-router-dom';

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
          <li
            className={
              window.location.pathname === '/dashboard' ? 'active' : ''
            }
          >
            <Link to="/dashboard">
              <i className="fa fa-columns" />
              <span>Dashboard</span>
            </Link>
          </li>

          <li
            className={
              window.location.pathname === '/scheduler' ? 'active' : ''
            }
          >
            <Link to="/scheduler">
              <i className="fa fa-clock" />
              <span>Scheduler</span>
            </Link>
          </li>
          <li
            className={
              window.location.pathname === '/settings' ? 'active' : ''
            }
          >
            <Link to="/settings">
              <i className="fa fa-cog" />
              <span>Settings</span>
            </Link>
          </li>
          <li
            className={
              window.location.pathname === '/pricing' ? 'active' : ''
            }
          >
            <Link to="/pricing">
              <i className="fa fa-share" />
              <span>Tests & Pricing</span>
            </Link>
          </li>
          <li
            className={
              window.location.pathname === '/change-password'
                ? 'active'
                : ''
            }
          >
            <Link to="/change-password">
              <i className="fa fa-lock" />
              <span>Change Password</span>
            </Link>
          </li>
          <li
            className={window.location.pathname === '/logout' ? 'active' : ''}
          >
            <a href="javascript:void(0);" onClick={logoutUser}>
              <i className="fa fa-sign-out" />
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
