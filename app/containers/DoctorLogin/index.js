/**
 *
 * Login
 *
 */

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Helmet } from 'react-helmet';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import Footer from 'components/Footer';
import Header from 'components/Header';
import makeSelectLogin from './selectors';
import reducer from './reducer';
import saga from './saga';
import loginBanner from '../../theme/img/login-banner.png';
import FormValidator from '../../utils/FormValidator';
import { doctorSignInAction } from './actions';
import Warning from '../../components/Warning/Loadable';

export function DoctorLogin(props) {
  useInjectReducer({ key: 'doctorLogin', reducer });
  useInjectSaga({ key: 'doctorLogin', saga });

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
    setMessage(props.doctorLogin.errorMsg);
  }, [props.doctorLogin.errorMsg]);

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
        email,
        password,
        loginMode: 'Email',
      };
      props.loginFunc(data, toast);
      setValidation(validator.valid());
    }
  };

  return (
    <article>
      <Helmet>
        <title>Login</title>
      </Helmet>
      <Header />
      <div>
        <div className="content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-8 offset-md-2">
                {/* Login Tab Content */}

                <div className="account-content">
                  <div className="row align-items-center justify-content-center">
                    <div className="col-md-12 col-lg-6 login-right">
                      <div className="login-header">
                        <h3>Sign In</h3>
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
                          type="submit"
                        >
                          Login
                        </button>
                        {message !== null && message.length > 0 && (
                          <Warning message={message} />
                        )}
                        {/* <div className="login-or">
                          <span className="or-line" />
                          <span className="span-or">or</span>
                        </div>
                        <div className="row form-row social-login">
                          <div className="col-6">
                            <a href="#" className="btn btn-facebook btn-block">
                              <i className="fa fa-facebook mr-1" /> Login
                            </a>
                          </div>
                          <div className="col-6">
                            <a href="#" className="btn btn-google btn-block">
                              <i className="fa fa-google mr-1" /> Login
                            </a>
                          </div>
                        </div> */}
                        <div className="text-center dont-have">
                          Don’t have an account?
                          <Link to="/pro/register"> Register</Link>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>

                {/* /Login Tab Content */}
              </div>
            </div>
          </div>
        </div>
      </div>
      <p>&nbsp;</p>
      <Footer />
    </article>
  );
}

DoctorLogin.propTypes = {
  dispatch: PropTypes.func.isRequired,
  loginFunc: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  doctorLogin: makeSelectLogin(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    loginFunc: (data, toastr) => {
      dispatch(doctorSignInAction(data, toastr));
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(DoctorLogin);
