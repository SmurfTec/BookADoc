import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import makeSelectLogin from './selectors';
import reducer from './reducer';
import saga from './saga';
import FormValidator from '../../utils/FormValidator';
import { signInAction } from './actions';
import Warning from '../Warning/Loadable';

export function SignIn(props) {
  useInjectReducer({ key: 'login', reducer });
  useInjectSaga({ key: 'login', saga });
  // form validation
  const validator = new FormValidator([
    {
      field: 'email',
      method: 'isEmpty',
      validWhen: false,
      message: 'Email is required',
    },
    {
      field: 'email',
      method: 'isEmail',
      validWhen: true,
      message: 'Email is invalid',
    },
    {
      field: 'password',
      method: 'isEmpty',
      validWhen: false,
      message: 'Password is required',
    },
  ]);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [validation, setValidation] = useState(validator.valid());
  const [message, setMessage] = useState('');

  useEffect(() => {
    setMessage(props.login.errorMsg);
  }, [props.login.errorMsg]);

  const onChangeValue = (e, func) => {
    func(e.target.value);
  };

  const doLogin = e => {
    e.preventDefault();
    const validationCheck = validator.validate({
      email,
      password,
    });
    setValidation(validationCheck);
    // console.log(validationCheck);
    if (validationCheck.isValid) {
      const data = {
        redirectToHome: props.redirectToHome,
        email,
        password,
        loginMode: 'Email',
      };
      props.loginFunc(data, toast);
      setValidation(validator.valid());
    }
  };

  // props.ref = props.login;

  return (
    <>
      <div className="login-header">
        <h3>Patient Sign In</h3>
      </div>
      <form>
        <div className="form-group form-focus">
          <input
            type="email"
            className="form-control floating"
            onChange={e => onChangeValue(e, setEmail)}
          />
          <label className="focus-label">Email</label>
        </div>
        {validation.email.isInvalid && (
          <Warning message={validation.email.message} />
        )}
        <div className="form-group form-focus">
          <input
            type="password"
            className="form-control floating"
            onChange={e => onChangeValue(e, setPassword)}
          />
          <label className="focus-label">Password</label>
        </div>
        {validation.password.isInvalid && (
          <Warning message={validation.password.message} />
        )}
        <div className="text-right">
          <Link className="forgot-link" to="/forgot-password">
            Forgot Password ?
          </Link>
        </div>
        <button
          className="btn btn-primary btn-block btn-lg login-btn"
          onClick={e => doLogin(e)}
          disabled={props.login.loading}
          type="submit"
        >
          Login
        </button>
        {message !== null && message.length > 0 && (
          <Warning message={message} />
        )}
        <div className="text-center dont-have">
          Don’t have an account?
          <Link to="/patient/register"> Register</Link>
        </div>
      </form>
    </>
  );
}

SignIn.propTypes = {
  dispatch: PropTypes.func.isRequired,
  loginFunc: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  login: makeSelectLogin(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    loginFunc: (data, toastr) => {
      dispatch(signInAction(data, toastr));
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(SignIn);
