/**
 *
 * ForgotPassword
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
import makeSelectForgotPassword from './selectors';
import reducer from './reducer';
import saga from './saga';
import loginBanner from '../../theme/img/login-banner.png';
import Warning from '../../components/Warning/Loadable';
import FormValidator from '../../utils/FormValidator';
import { forgotPasswordAction } from './actions';
export function ForgotPassword(props) {
  useInjectReducer({ key: 'forgotPassword', reducer });
  useInjectSaga({ key: 'forgotPassword', saga });

  const [email, setEmail] = useState('');

  // form validation
  const validator = new FormValidator([
    {
      field: 'email',
      method: 'isEmpty',
      validWhen: false,
      message: 'Email is Required',
    },
    {
      field: 'email',
      method: 'isEmail',
      validWhen: true,
      message: 'Email is invalid',
    },
  ]);
  const [validation, setValidation] = useState(validator.valid());

  const onChangeValue = (e, func) => {
    func(e.target.value);
  };
  const onSubmit = e => {
    e.preventDefault();
    const validationCheck = validator.validate({
      email,
    });
    setValidation(validationCheck);
    console.log('validation check', validationCheck);
    if (validationCheck.isValid) {
      const data = {
        email,
      };
      props.forgotPasswordFunc(data, toast);
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
                {/* Account Content */}
                <div className="account-content">
                  <div className="row align-items-center justify-content-center">
                    <div className="col-md-12 col-lg-6 login-right">
                      <div className="login-header">
                        <h3>Forgot Password?</h3>
                        <p className="small text-muted">
                          Enter the email address you used during registration.
                          We’ll send you an email that’ll help you reset your
                          password.
                        </p>
                      </div>
                      <form action="">
                        <div className="form-group form-focus">
                          <input
                            type="text"
                            className="form-control floating"
                            value={email}
                            onChange={e => onChangeValue(e, setEmail)}
                          />
                          <label className="focus-label">Email</label>
                        </div>
                        {validation.email.isInvalid && (
                          <Warning message={validation.email.message} />
                        )}
                        <div className="text-right remember-pass">
                          Remember your password?
                        </div>
                        <div className="text-right">
                          <Link
                            className="forgot-link pro-login"
                            to="pro/login"
                          >
                            Login for Professionals
                          </Link>
                        </div>
                        <div className="text-right">
                          <Link className="forgot-link" to="patient/login">
                            Login for Patients
                          </Link>
                        </div>
                        <button
                          className="btn btn-primary btn-block btn-lg login-btn"
                          type="button"
                          onClick={e => onSubmit(e)}
                        >
                          Submit
                        </button>
                      </form>
                      {/* /Forgot Password Form */}
                    </div>
                  </div>
                </div>
                {/* /Account Content */}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </article>
  );
}

ForgotPassword.propTypes = {
  dispatch: PropTypes.func.isRequired,
  forgotPasswordFunc: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  forgotPassword: makeSelectForgotPassword(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    forgotPasswordFunc: (data, toastr) => {
      dispatch(forgotPasswordAction(data, toastr));
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(ForgotPassword);
