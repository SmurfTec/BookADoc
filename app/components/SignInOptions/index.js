import React, { memo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Link, history } from 'react-router-dom';
import makeSelectDoctorLogin from '../../containers/DoctorLogin/selectors';
import makeSelectPatientLogin from '../../containers/Login/selectors';
import { getUsername } from '../../utils/helpers';
import { Box, Divider } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
  SignInOptions: {
    width: 185,
    [`@media (min-width: 768px)`]: {
      width: 220,
    },
  },
}));
export function SignInOptions(props) {
  const [user, setUser] = useState({});

  const classes = useStyles();

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
    <Box
      className="login_container"
      display="flex"
      flexDirection="column"
      alignItems="flex-end"
      flexWrap="wrap"
    >
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        flexWrap="wrap"
        className={classes.SignInOptions}
      >
        <div>
          <b>Patient</b>
        </div>
        <div>
          <Link
            className="text-nowrap"
            to={'/patient/login'}
            style={{
              marginRight: 10,
            }}
          >
            Log in
          </Link>
          <Link className="text-nowrap" to={'/patient/register'}>
            Sign up
          </Link>
        </div>
      </Box>
      <Divider
        style={{
          border: '1px solid rgba(130, 156, 199, 0.2)',
          marginTop: '2px',
          marginBottom: '2px',
        }}
      />
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        flexWrap="wrap"
        className={classes.SignInOptions}
      >
        <div>
          <b>Professional</b>
        </div>
        <div>
          <Link
            className="text-nowrap"
            to={'/pro/login'}
            style={{
              marginRight: 10,
            }}
          >
            Log in
          </Link>
          <Link className="text-nowrap" to={'/pro/register'}>
            Sign up
          </Link>
        </div>
      </Box>
    </Box>
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
