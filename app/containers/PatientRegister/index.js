/**
 *
 * Register
 *
 */

import React, { useState, useEffect, useRef } from 'react';
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
import DatePicker from 'react-date-picker';

import { PASSWORD_RULE_REGEX, PASSWORD_RULE_FAILED_MESSAGE} from '../../utils/constants';
import makeSelectPatientRegister from './selectors';
import loginBanner from '../../theme/img/login-banner.png';
import reducer from './reducer';
import saga from './saga';
import FormValidator from '../../utils/FormValidator';
import Warning from '../../components/Warning/Loadable';
import GeolocationPickerWrapper from '../../components/GeolocationPickerWrapper';
import { patientRegisterAction } from './actions';

export function PatientRegister(props) {
  useInjectReducer({ key: 'patientRegister', reducer });
  useInjectSaga({ key: 'patientRegister', saga });

  const [name, setName] = useState('');
  const [gender, setGender] = useState('');
  const [dof, setDof] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [geolocation, setGeolocation] = useState();
  const [passwordLength, setPasswordLength] = useState(false);

  // form validation
  const validator = new FormValidator([
    {
      field: 'name',
      method: 'isEmpty',
      validWhen: false,
      message: 'Full Name is required',
    },
    /*
    {
      field: 'gender',
      method: 'isEmpty',
      validWhen: false,
      message: 'Gender is required',
    },
    {
      field: 'dof',
      method: 'isEmpty',
      validWhen: false,
      message: 'Date Of Birth is required',
    },
    */
    {
      field: 'email',
      method: 'isEmail',
      validWhen: true,
      message: 'Email is invalid',
    },
    {
      field: 'email',
      method: 'isEmpty',
      validWhen: false,
      message: 'Email is required',
    },
    {
      field: 'password',
      method: 'isEmpty',
      validWhen: false,
      message: 'Password is required',
    },
  ]);

  const [validation, setValidation] = useState(validator.valid());

  const onChangeValue = (e, func) => {
    func(e.target.value);
  };
  // On submit form
  const onSignup = e => {
    e.preventDefault();
    if (!geolocation) {
      toast.error('Set your current location on the map');
      return;
    }
    const validationCheck = validator.validate({
      name,
      gender,
      dof,
      email,
      password,
    });
    setValidation(validationCheck);
    // console.log(validationCheck);

    if (validationCheck.isValid) {
      if (!password.match(PASSWORD_RULE_REGEX)) {
        setPasswordLength(true);
        return;
      }
      const data = {
        fullName: name,
        // gender,
        // DateOfBirth: dof.getTime(),
        email,
        password,
        loginMode: 'Email',
        role: 'patient',
        latitude: geolocation.lat,
        longitude: geolocation.lng,
      };
      props.registerFunc(data, toast);
      setValidation(validator.valid());
    }
  };

  const onLocationChange = data => {
    setGeolocation(data.position);
  };

  return (
    <article>
      <Helmet>
        <title>Patient Register</title>
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
                        <h3>Patient Sign Up</h3>
                      </div>
                      <form action="">
                        <div className="form-group form-focus">
                          <input
                            type="text"
                            className="form-control floating"
                            value={name}
                            onChange={e => onChangeValue(e, setName)}
                          />
                          <label className="focus-label">Full Name</label>
                        </div>
                        {validation.name.isInvalid && (
                          <Warning message={validation.name.message} />
                        )}

                        {/* <div className="form-group">
                          <select
                            className="form-control select"
                            value={gender}
                            onChange={e => onChangeValue(e, setGender)}
                          >
                            <option value="">Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                          </select>
                        </div>
                        {validation.gender.isInvalid && (
                          <Warning message={validation.gender.message} />
                        )}
                        <div className="form-group focus-label-dob">
                          <label className=" col-md-12 p-0">
                            Date of Birth
                          </label>
                        </div>
                        <div className="form-group form-focus p-0">
                          <DatePicker
                            onChange={setDof}
                            className="col-md-12 p-0"
                            style={{
                              border: 'thin solid rgba(130, 156, 199, 0.2)',
                            }}
                            value={dof}
                          />
                        </div>
                        {validation.dof.isInvalid && (
                          <Warning message={validation.dof.message} />
                        )} */}
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
                        <div className="form-group form-focus">
                          <input
                            type="password"
                            className="form-control floating"
                            value={password}
                            onChange={e => onChangeValue(e, setPassword)}
                          />
                          <label className="focus-label">Password</label>
                        </div>
                        {validation.password.isInvalid && (
                          <Warning message={validation.password.message} />
                        )}
                        {passwordLength === true && (
                          <Warning message={PASSWORD_RULE_FAILED_MESSAGE} />
                        )}

                        <GeolocationPickerWrapper
                          position={geolocation}
                          onLocationChange={onLocationChange}
                        />
                        <button
                          className="btn btn-primary btn-block btn-lg login-btn"
                          type="button"
                          onClick={e => onSignup(e)}
                        >
                          Sign Up
                        </button>
                        {/* <div className="login-or">
                          <span className="or-line" />
                          <span className="span-or">or</span>
                        </div>
                        <div className="row form-row social-login">
                          <div className="col-6">
                            <a href="#" className="btn btn-facebook btn-block">
                              <i className="fa fa-facebook mr-1" /> Sign Up
                            </a>
                          </div>
                          <div className="col-6">
                            <a href="#" className="btn btn-google btn-block">
                              <i className="fa fa-google mr-1" /> Sign Up
                            </a>
                          </div>
                        </div> */}
                        <div className="text-center dont-have">
                          Have an account?{' '}
                          <Link to="/patient/login">Login</Link>
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

PatientRegister.propTypes = {
  dispatch: PropTypes.func.isRequired,
  registerFunc: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  register: makeSelectPatientRegister(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    registerFunc: (data, toastr) => {
      dispatch(patientRegisterAction(data, toastr));
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(PatientRegister);
