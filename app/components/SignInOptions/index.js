import React, { memo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Link, history } from 'react-router-dom';
import makeSelectDoctorLogin from '../../containers/DoctorLogin/selectors';
import makeSelectPatientLogin from '../../containers/Login/selectors';
import { getUsername } from '../../utils/helpers';

export function SignInOptions(props) {
  const [user, setUser] = useState({});

  useEffect(() => {
    const userObj =
      localStorage.getItem('user') === null
        ? {}
        : JSON.parse(localStorage.getItem('user'));
    if (Object.keys(userObj).length > 0) {
      setUser(userObj);
    }
  }, []);

  useEffect(() => {
    if (Object.keys(props.doctorLogin.user).length > 0) {
      setUser(props.doctorLogin.user);
    }
  }, [props.doctorLogin.user]);

  useEffect(() => {
    if (
      !props.patientLogin.loading &&
      Object.keys(props.patientLogin.user).length > 0
    ) {
      setUser(props.patientLogin.user);
    }
  }, [props.patientLogin.user]);

  const logoutUser = e => {
    e.preventDefault();
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    window.location.href = '/';
  };

  const UserLink = () => (
    <div className="row login_container">
      <div className="col-md-12">
        <b>
          <Link to="/dashboard">{getUsername(user.role, user.fullName)} </Link>
          <span>
            {' '}
            <i
              className="ml-2 fa fa-power-off logout-btn logout-btn_landing"
              onClick={e => logoutUser(e)}
            />
          </span>
        </b>
      </div>
    </div>
  );

  const Options = () => (
    <div className="row login_container">
      <div className="col-sm">
        <b>Patient</b>
      </div>
      <div className="col-sm">
        <Link className="text-nowrap" to={'/patient/login'}>
          Log in
        </Link>
      </div>
      <div className="col-sm">
        <Link className="text-nowrap" to={'/patient/register'}>
          Sign up
        </Link>
      </div>
      <div className="col-12">
        <hr
          style={{
            border: '1px solid rgba(130, 156, 199, 0.2)',
            marginTop: '2px',
            marginBottom: '2px',
          }}
        />
      </div>
      <div className="col-sm">
        <b>Professional</b>
      </div>
      <div className="col-sm">
        <Link className="text-nowrap" to={'/pro/login'}>
          Log in
        </Link>
      </div>
      <div className="col-sm">
        <Link className="text-nowrap" to={'/pro/register'}>
          Sign up
        </Link>
      </div>
      <div className="col-12" />
    </div>
  );

  return user && Object.keys(user).length > 0 ? <UserLink /> : <Options />;
}

SignInOptions.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

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
)(SignInOptions);
