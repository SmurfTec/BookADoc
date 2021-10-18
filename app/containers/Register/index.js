/**
 *
 * Register
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

import GeolocationPickerWrapper from '../../components/GeolocationPickerWrapper';
import makeSelectRegister from './selectors';
import loginBanner from '../../theme/img/login-banner.png';
import reducer from './reducer';
import saga from './saga';
import FormValidator from '../../utils/FormValidator';
import Warning from '../../components/Warning/Loadable';
import { registerAction, sendEmailAction } from './actions';

export function Register(props) {
  useInjectReducer({ key: 'register', reducer });
  useInjectSaga({ key: 'register', saga });

  const [name, setName] = useState('');
  const [gender, setGender] = useState('');
  const [dof, setDof] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [profession, setProfession] = useState('');
  const [mobile, setMobile] = useState('');
  const [specialty, setSpecialty] = useState('');
  const [MDC_number, setMDC_number] = useState('');
  const [geolocation, setGeolocation] = useState();
  // form validation
  const validator = new FormValidator([
    {
      field: 'name',
      method: 'isEmpty',
      validWhen: false,
      message: 'Full Name is required',
    },
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
      field: 'profession',
      method: 'isEmpty',
      validWhen: false,
      message: 'profession is required',
    },
    {
      field: 'mobile',
      method: 'isEmpty',
      validWhen: false,
      message: 'Mobile is required',
    },
    {
      field: 'MDC_number',
      method: 'isEmpty',
      validWhen: false,
      message: 'Council registration number is required',
    },
  ]);

  const [validation, setValidation] = useState(validator.valid());

  const onChangeValue = (e, func) => {
    func(e.target.value);
  };
  // On submit form
  const onSignup = e => {
    e.preventDefault();
    const validationCheck = validator.validate({
      name,
      gender,
      dof,
      email,
      password,
      profession,
      mobile,
      specialty,
      MDC_number,
    });
    setValidation(validationCheck);
    // console.log(validationCheck);
    if (validationCheck.isValid) {
      const data = {
        fullName: name,
        gender,
        DateOfBirth: dof,
        email,
        password,
        loginMode: 'Email',
        role: 'doctor',
        profession,
        mobile,
        specialties: [{ specialty }],
        registrationNumber: MDC_number,
      };
      // props.registerFunc(data, toast, sendEmail);
      setValidation(validator.valid());
    }
  };

  // send email
  const sendEmail = e => {
    e.preventDefault();

    if (!geolocation) {
      toast.error('Set your current location on the map');
      return;
    }

    const validationCheck = validator.validate({
      name,
      email,
      profession,
      mobile,
      MDC_number,
    });
    setValidation(validationCheck);
    if (validationCheck.isValid) {
      const data = {
        fullName: name,
        mobile,
        email,
        profession,
        MDCNumber: MDC_number,
        latitude: geolocation.lat,
        longitude: geolocation.lng,
      };
      props.sendEmailFunc(data, toast, resetForm);
      setValidation(validator.valid());
    }
  };

  const resetForm = () => {
    setName('');
    setEmail('');
    setProfession('');
    setMDC_number('');
    setMobile('');
  };

  const onLocationChange = data => {
    setGeolocation(data.position);
  };

  return (
    <article>
      <Helmet>
        <title>Professional Sign Up</title>
      </Helmet>
      <Header />
      <div>
        <div className="content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-8 offset-md-2">
                {/* Login Tab Content */}
                <div className="account-content">
                  <div className="row  justify-content-center">
                    <div className="col-md-12 col-lg-6 login-right">
                      <div className="login-header">
                        <h3>Professionals Sign Up</h3>
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
                            type="number"
                            className="form-control floating"
                            value={mobile}
                            onChange={e => onChangeValue(e, setMobile)}
                          />
                          <label className="focus-label">Mobile</label>
                        </div>
                        {validation.mobile.isInvalid && (
                          <Warning message={validation.mobile.message} />
                        )}
                        {/* <div className="form-group form-focus">
                          <input
                            type="text"
                            className="form-control floating"
                            value={specialty}
                            onChange={e => onChangeValue(e, setSpecialty)}
                          />
                          <label className="focus-label">Specialty</label>
                        </div>
                        {validation.specialty.isInvalid && (
                          <Warning message={validation.specialty.message} />
                        )} */}
                        <div className="form-group form-focus">
                          <input
                            type="text"
                            className="form-control floating"
                            value={MDC_number}
                            onChange={e => onChangeValue(e, setMDC_number)}
                          />
                          <label className="focus-label">
                            Registration number
                          </label>
                        </div>
                        {validation.MDC_number.isInvalid && (
                          <Warning message={validation.MDC_number.message} />
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
                        )} */}
                        <div className="form-group">
                          <select
                            className="form-control select"
                            value={profession}
                            onChange={e => onChangeValue(e, setProfession)}
                          >
                            <option value="">select profession</option>
                            <option value="Doctor">Doctor</option>
                            <option value="Nurse">Nurse</option>
                            <option value="Physiotherapist">
                              Physiotherapist
                            </option>
                          </select>
                          {validation.profession.isInvalid && (
                            <Warning message={validation.profession.message} />
                          )}
                        </div>
                        {/* <div className="form-group form-focus">
                          <input
                            type="text"
                            className="form-control floating"
                            value={dof}
                            onChange={e => onChangeValue(e, setDof)}
                          />
                          <label className="focus-label">Date of Birth</label>
                        </div>
                        {validation.dof.isInvalid && (
                          <Warning message={validation.dof.message} />
                        )} */}
                        {/* <div className="form-group form-focus">
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
                        )} */}
                        <GeolocationPickerWrapper
                          position={geolocation}
                          onLocationChange={onLocationChange}
                        />
                        <button
                          className="btn btn-primary btn-block btn-lg login-btn"
                          type="button"
                          onClick={e => sendEmail(e)}
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
                          Have an account? <Link to="login">Login</Link>
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

Register.propTypes = {
  dispatch: PropTypes.func.isRequired,
  registerFunc: PropTypes.func,
  sendEmailFunc: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  register: makeSelectRegister(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    registerFunc: (data, toastr, sendEmailFun) => {
      dispatch(registerAction(data, toastr, sendEmailFun));
    },
    sendEmailFunc: (data, toastr, resetFormFunc) => {
      dispatch(sendEmailAction(data, toastr, resetFormFunc));
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(Register);
