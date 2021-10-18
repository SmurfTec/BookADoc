/**
 *
 * ChangePassword
 *
 */

import React, { memo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { toast } from 'react-toastify';

import {
  PASSWORD_RULE_REGEX,
  PASSWORD_RULE_FAILED_MESSAGE,
} from '../../utils/constants';
import FormValidator from '../../utils/FormValidator';
import makeSelectChangePassword from './selectors';
import reducer from './reducer';
import saga from './saga';
import { changePasswordAction } from './actions';
import Warning from '../../components/Warning/Loadable';

export function ChangePassword(props) {
  useInjectReducer({ key: 'changePasswordC', reducer });
  useInjectSaga({ key: 'changePasswordC', saga });

  // form validation
  const validator = new FormValidator([
    {
      field: 'oldPassword',
      method: 'isEmpty',
      validWhen: false,
      message: 'Current Password is required',
    },
    {
      field: 'password',
      method: 'isEmpty',
      validWhen: false,
      message: 'New Password is required',
    },
    {
      field: 'confirmPassword',
      method: 'isEmpty',
      validWhen: false,
      message: 'Confirm New Password field is required',
    },
  ]);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [validation, setValidation] = useState(validator.valid());
  const [passwordLength, setPasswordLength] = useState(false);

  const onChangeValue = (e, func) => {
    func(e.target.value);
  };

  const resetForm = () => {
    setOldPassword('');
    setPassword('');
    setConfirmPassword('');
  };
  useEffect(() => {
    const search = window.location.search;
    const params = new URLSearchParams(search);
    const emailParam = params.get('email');

    if (
      emailParam !== null &&
      emailParam !== undefined &&
      emailParam.length > 0
    ) {
      setEmail(emailParam);
    }
    // console.log("emailParam", emailParam);
  }, []);

  const onSubmit = e => {
    e.preventDefault();
    const validationCheck = validator.validate({
      oldPassword,
      password,
      confirmPassword,
    });
    setValidation(validationCheck);

    if (validationCheck.isValid) {
      // let passw = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/; // /^[a-zA-Z0-9!@#$%^&\*"']{7,14}$/; // /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,14}$/;
      const strongRegex = PASSWORD_RULE_REGEX;

      if (!password.match(strongRegex)) {
        setPasswordLength(true);
        return;
      }

      setPasswordLength(false);

      if (password === confirmPassword) {
        const data = {
          oldPassword,
          password,
          email,
        };
        props.changePasswordFunc(data, toast, resetForm);
        setValidation(validator.valid());
      } else {
        toast.info('new password and confirm new password not matched');
      }
    }
  };
  return (
    <div className="card">
      <div className="card-body">
        <div className="row">
          <div className="col-md-12 mb-3">
            <div class="alert alert-light" role="alert">
              {PASSWORD_RULE_FAILED_MESSAGE}
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12 col-lg-6">
            {/* Change Password Form */}
            <form>
              {/* <div className="form-group">
                <label>Old Password</label>
                <input type="password" className="form-control" />
              </div> */}

              <div className="form-group">
                <label>Current Password</label>
                <input
                  type="password"
                  value={oldPassword}
                  onChange={e => onChangeValue(e, setOldPassword)}
                  className="form-control"
                />
                {validation.oldPassword.isInvalid && (
                  <Warning message={validation.oldPassword.message} />
                )}
              </div>
              <div className="form-group">
                <label>New Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={e => onChangeValue(e, setPassword)}
                  className="form-control"
                />
                {validation.password.isInvalid && (
                  <Warning message={validation.password.message} />
                )}
                {passwordLength === true && (
                  <Warning message={PASSWORD_RULE_FAILED_MESSAGE} />
                )}
              </div>
              <div className="form-group">
                <label>Confirm New Password</label>
                <input
                  className="form-control"
                  value={confirmPassword}
                  onChange={e => onChangeValue(e, setConfirmPassword)}
                  type="password"
                />
                {validation.confirmPassword.isInvalid && (
                  <Warning message={validation.confirmPassword.message} />
                )}
              </div>

              <div className="submit-section">
                <button
                  type="button"
                  onClick={e => onSubmit(e)}
                  className="btn btn-primary submit-btn"
                >
                  Save Changes
                </button>
              </div>
            </form>
            {/* /Change Password Form */}
          </div>
        </div>
      </div>
    </div>
  );
}

ChangePassword.propTypes = {
  dispatch: PropTypes.func.isRequired,
  changePasswordFunc: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  changePassword: makeSelectChangePassword(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    changePasswordFunc: (data, toastr, resetFormFunc) => {
      dispatch(changePasswordAction(data, toastr, resetFormFunc));
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(ChangePassword);
