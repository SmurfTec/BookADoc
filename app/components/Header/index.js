import React, { memo, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import logo from '../../theme/img/logo.png';
import makeSelectDoctorLogin from '../../containers/DoctorLogin/selectors';
import makeSelectPatientLogin from '../../containers/Login/selectors';
import SignInOptions from '../SignInOptions';
import { getUsername } from '../../utils/helpers';
import bookLogo from '../../theme/img/landing/bookLogo.png';

function Header(props) {
  const [user, setUser] = useState({});
  useEffect(() => {
    const userObj =
      localStorage.getItem('user') === null
        ? {}
        : JSON.parse(localStorage.getItem('user'));
    setUser(userObj);
  }, []);

  useEffect(() => {
    if (Object.keys(props.doctorLogin.user).length > 0) {
      setUser(props.doctorLogin.user);
    }
  }, [props.doctorLogin.user]);

  useEffect(() => {
    if (Object.keys(props.patientLogin.user).length > 0) {
      setUser(props.patientLogin.user);
    }
  }, [props.patientLogin.user]);

  const logoutUser = e => {
    e.preventDefault();
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    window.location.href = '/';
  };
  return (
    <div className="landing_header">
      <div className="row">
        <div className="col-md-1" />
        <div className="col-md-7 mb-3">
          <Link to={'/'}>
            <img
              src={bookLogo}
              height="30"
              width="100"
              className="mt-3"
              alt="Logo"
            />
          </Link>
        </div>
        <div className="col-sm-12 col-md-3">
          <SignInOptions />
        </div>
        <div className="col-md-1" />
      </div>
    </div>
  );
}
Header.propTypes = {};

const mapStateToProps = createStructuredSelector({
  doctorLogin: makeSelectDoctorLogin(),
  patientLogin: makeSelectPatientLogin(),
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
)(Header);
