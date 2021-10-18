/**
 *
 * Settings
 *
 */

import React, { memo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Link } from 'react-router-dom';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { toast } from 'react-toastify';
import makeSelectSettings from './selectors';
import reducer from './reducer';
import saga from './saga';
import SideNav from '../../components/PatientSideNav';
import doctorThumb02 from '../../theme/img/doctors/doctor-thumb-02.jpg';
import Warning from '../../components/Warning/Loadable';
import FormValidator from '../../utils/FormValidator';
import {
  updateProfileDetailsAction,
  fetchProfileDetailsAction,
  getLanguagesAction,
} from './actions';
import Footer from 'components/Footer';
import Header from 'components/Header';
import ProfileWidget from '../../components/ProfileWidget';

export function PatientSettings(props) {
  const { settings } = props;
  const { profileDetails } = settings;

  useInjectReducer({ key: 'settings', reducer });
  useInjectSaga({ key: 'settings', saga });
  // define state for form
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  // form validation
  const validator = new FormValidator([
    // {
    //   field: 'fullName',
    //   method: 'isEmpty',
    //   validWhen: false,
    //   message: 'Full name is required',
    // },
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
      message: 'Invalid email address',
    },
  ]);

  useEffect(() => {
    props.fetchProfileDetailFunc(toast);
  }, []);

  useEffect(() => {
    if (profileDetails.fullName) {
      setFullName(profileDetails.fullName);
    }

    if (profileDetails.email) {
      setEmail(profileDetails.email);
    }
  }, [profileDetails.fullName, profileDetails.email]);

  const [validation, setValidation] = useState(validator.valid());
  const onChangeValue = (e, func) => {
    func(e.target.value);
  };
  // validation profile detail and submit to server
  const doUpdateProfile = e => {
    e.preventDefault();
    const validationCheck = validator.validate({
      // fullName,
      email,
    });
    setValidation(validationCheck);

    // if form is valid
    if (validationCheck.isValid) {
      const profileFormDetail = Object.assign({}, profileDetails, {
        // fullName,
        email,
      });

      props.updateProfileDetailFunc(profileFormDetail, toast);
      setValidation(validator.valid());
    }
  };

  return (
    <div>
      <Helmet>
        <title>Settings</title>
        <meta name="description" content="Description of Settings" />
      </Helmet>
      <Header />
      {/* Breadcrumb */}
      <div className="breadcrumb-bar">
        <div className="container-fluid">
          <div className="row align-items-center">
            <div className="col-md-12 col-12">
              <nav aria-label="breadcrumb" className="page-breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link to="/">Home</Link>
                  </li>
                  <li className="breadcrumb-item active">Profile Settings</li>
                </ol>
              </nav>
              <h2 className="breadcrumb-title">Profile Settings</h2>
            </div>
          </div>
        </div>
      </div>
      {/* /Breadcrumb */}
      {/* Page Content */}
      <div className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-5 col-lg-4 col-xl-3 theiaStickySidebar">
              {/* Profile Sidebar */}
              <div className="profile-sidebar">
                <ProfileWidget profile={profileDetails} />
                <SideNav />
              </div>
              {/* /Profile Sidebar */}
            </div>
            <div className="col-md-7 col-lg-8 col-xl-9">
              {/* Basic Information */}
              <div className="card">
                <div className="card-body">
                  <h4 className="card-title">Basic Information</h4>
                  {/* <div className="row form-row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>
                          Full Name <span className="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          value={fullName}
                          onChange={e => onChangeValue(e, setFullName)}
                        />
                        {
                          validation.fullName.isInvalid && (
                            <Warning message={validation.fullName.message} />
                          )
                        }
                      </div>
                    </div>
                  </div> */}
                  <div className="row form-row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>
                          Email <span className="text-danger">*</span>
                        </label>
                        <input
                          disabled="disabled"
                          type="text"
                          className="form-control"
                          value={email}
                          onChange={e => onChangeValue(e, setEmail)}
                        />
                        {validation.email.isInvalid && (
                          <Warning message={validation.email.message} />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="submit-section submit-btn-bottom">
                <button
                  onClick={e => doUpdateProfile(e)}
                  className="btn btn-primary submit-btn"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* /Page Content */}
      <Footer />
    </div>
  );
}

PatientSettings.propTypes = {
  updateProfileDetailFunc: PropTypes.func,
  fetchProfileDetailFunc: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  settings: makeSelectSettings(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    fetchProfileDetailFunc: toastr => {
      dispatch(fetchProfileDetailsAction(toastr));
    },
    updateProfileDetailFunc: (data, toastr) => {
      dispatch(updateProfileDetailsAction(data, toastr));
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
)(PatientSettings);
