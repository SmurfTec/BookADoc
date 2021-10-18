/**
 *
 * Settings
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
import Select from 'react-select';

import makeSelectSettings from './selectors';
import reducer from './reducer';
import saga from './saga';
import Img from '../Img';
import Avatar from '../../images/Avatar.png';
import Warning from '../Warning/Loadable';
import FormValidator from '../../utils/FormValidator';
import GeolocationPicker from '../GeolocationPicker';
import {
  updateProfileDetailsAction,
  fetchProfileDetailsAction,
  getLanguagesAction,
  getSpecialtiesAction,
} from './actions';

const toGeolocation = data => {
  if (data && data.latitude && data.longitude) {
    return {
      lat: parseFloat(data.latitude) || 0,
      lng: parseFloat(data.longitude) || 0,
    };
  }

  return { lat: 0, lng: 0 };
};

const languagesToSelectOptions = data => {
  return (data || []).map(l => ({ value: l.language, label: l.language }));
};

const specialtiesToSelectOptions = data => {
  return (data || []).map(s => ({ value: s.categoryId, label: s.name }));
};

const MAX_IMAGE_SIZE = 2 * 1024 * 1024 + 1024; // 2MB + 1024 to provide some flexibility

export function ProSettings(props) {
  useInjectReducer({ key: 'settings', reducer });
  useInjectSaga({ key: 'settings', saga });

  const {
    settings: { profileDetails, languages, specialties: allSpecialties },
  } = props;

  // define state for form
  const [imageUrl, setImageUrl] = useState(profileDetails.imageUrl);
  const [image, setImage] = useState();
  const [imageValidationMessage, setImageValidationMessage] = useState('');
  const [fullName, setFullName] = useState(profileDetails.fullName);
  const [phoneNum, setPhoneNum] = useState(profileDetails.mobile);
  const [email, setEmail] = useState(profileDetails.email);
  const [specialties, setSpecialties] = useState(
    specialtiesToSelectOptions(profileDetails.specialties),
  );
  const [gender, setGender] = useState(profileDetails.gender);
  const [officeLocation, setOfficeLocation] = useState(
    toGeolocation(profileDetails),
  );
  const [locationName, setLocationName] = useState(profileDetails.locationName);
  const [selectedLanguages, setSelectedLanguages] = useState(
    languagesToSelectOptions(profileDetails.languages),
  );

  // form validation
  const validator = new FormValidator([
    {
      field: 'fullName',
      method: 'isEmpty',
      validWhen: false,
      message: 'Full name is required',
    },
    {
      field: 'phoneNum',
      method: 'isEmpty',
      validWhen: false,
      message: 'Phone number is required',
    },
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
      message: 'Invalid email',
    },
    {
      field: 'gender',
      method: 'isEmpty',
      validWhen: false,
      message: 'Gender field is required',
    },
    {
      field: 'specialties',
      method: 'isEmpty',
      validWhen: false,
      message: 'Specialty is required',
    },
    {
      field: 'languages',
      method: 'isEmpty',
      validWhen: false,
      message: 'Choose at least one language',
    },
    {
      field: 'locationName',
      method: 'isEmpty',
      validWhen: false,
      message: 'More location detail is required',
    },
  ]);

  useEffect(() => {
    props.fetchProfileDetailFunc(toast);
    props.getLanguagesFunc(toast);
    props.getSpecialtiesFunc(toast);
  }, []);

  useEffect(() => {
    const { profileDetails } = props.settings;
    if (profileDetails && Object.keys(profileDetails).length > 0) {
      setFullName(profileDetails.fullName || '');
      if (profileDetails.imageUrl) {
        setImageUrl(profileDetails.imageUrl);
      }

      setPhoneNum(profileDetails.mobile || '');
      setEmail(profileDetails.email || '');
      setGender(profileDetails.gender || '');
      setSpecialties(specialtiesToSelectOptions(profileDetails.specialties));
      setSelectedLanguages(languagesToSelectOptions(profileDetails.languages));
      setOfficeLocation(toGeolocation(profileDetails));
      setLocationName(profileDetails.locationName || '');
    }
  }, [props.settings.profileDetails]);

  const validateImage = () => {
    setImageValidationMessage('');
    if (image) {
      if (image.type.indexOf('image/') !== 0) {
        setImageValidationMessage('Select valid image file');
        return false;
      }

      if (image.size > MAX_IMAGE_SIZE) {
        setImageValidationMessage('Image size must not be bigger than 2MB');
        return false;
      }
    }

    return true;
  };

  useEffect(() => {
    if (!image) {
      setImageUrl(profileDetails.imageUrl);
      return;
    }

    console.log('image: ', image);

    const url = URL.createObjectURL(image);
    setImageUrl(url);

    return () => URL.revokeObjectURL(url);
  }, [image]);

  const [validation, setValidation] = useState(validator.valid());
  const onChangeValue = (e, func) => {
    func(e.target.value);
  };
  // validation profile detail and submit to server
  const doUpdateProfile = e => {
    e.preventDefault();

    if (!officeLocation) {
      toast.error('Choose your office location on the map');

      return;
    }

    const languages = selectedLanguages.map(l => ({ language: l.value }));

    const _specialties = specialties.map(s => ({
      categoryId: s.value,
      name: s.label,
    }));

    const validationCheck = validator.validate({
      /* firstName,
      lastName, */
      fullName,
      phoneNum,
      email,
      specialties: _specialties,
      gender,
      languages,
      locationName,
      // officeLocation,
    });
    setValidation(validationCheck);
    // if form is valid
    if (validationCheck.isValid && validateImage()) {
      const profileFormDetail = {
        fullName,
        mobile: phoneNum,
        email,
        specialties: _specialties,
        gender,
        languages,
        locationName,
        latitude: officeLocation.lat,
        longitude: officeLocation.lng,
        image,
      };
      props.updateProfileDetailFunc(profileFormDetail, toast);
      setValidation(validator.valid());
    }
  };

  const onLocationChange = data => {
    setOfficeLocation(data.position);
  };

  const onSelectFile = e => {
    if (!e.target.files || e.target.files.length === 0) {
      setImage(undefined);
      return;
    }

    // I've kept this example simple by using the first image instead of multiple
    setImage(e.target.files[0]);
  };

  // const renderLanguages = () => {
  //   return (
  //     languages.map(language => {
  //       return (<option value={language.language}>{language.language}</option>)
  //     })
  //   );
  // };

  return (
    <div className="col-md-7 col-lg-8 col-xl-9">
      {/* Basic Information */}
      <div className="card">
        <div className="card-body">
          <h4 className="card-title">Basic Information</h4>
          <div className="row form-row">
            <div className="col-md-12">
              <div className="form-group">
                <div className="change-avatar">
                  <div className="profile-img">
                    <Img
                      src={imageUrl || Avatar}
                      alt="User Image"
                      fallbackImageSrc={Avatar}
                    />
                  </div>
                  <div className="upload-img">
                    <div className="change-photo-btn">
                      <span>
                        <i className="fa fa-upload" /> Upload Photo
                      </span>
                      <input
                        type="file"
                        className="upload"
                        onChange={onSelectFile}
                        accept="image/*"
                      />
                    </div>
                    <small className="form-text text-muted">
                      Allowed JPG, GIF or PNG. Max size of 2MB
                    </small>
                    {imageValidationMessage && (
                      <Warning message={imageValidationMessage} />
                    )}
                    {/* validation.image.isInvalid && (
                            <small className="form-text text-danger">
                                { validation.image.message }
                            </small>
                        ) */}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label>
                  Full Name
                  {/* <span className="text-danger">*</span> */}
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={fullName}
                  onChange={e => onChangeValue(e, setFullName)}
                />
                {validation.fullName.isInvalid && (
                  <Warning message={validation.fullName.message} />
                )}
              </div>
            </div>

            <div className="col-md-6">
              <div className="form-group">
                <label>Phone Number</label>
                <input
                  type="text"
                  className="form-control"
                  value={phoneNum}
                  onChange={e => onChangeValue(e, setPhoneNum)}
                />
                {validation.phoneNum.isInvalid && (
                  <Warning message={validation.phoneNum.message} />
                )}
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label>Email</label>
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
            <div className="col-md-6">
              <div className="form-group">
                <label>Specialties</label>
                <Select
                  closeMenuOnSelect={false}
                  value={specialties}
                  isMulti
                  options={specialtiesToSelectOptions(allSpecialties)}
                  onChange={values => setSpecialties(values)}
                />

                {/* <select
                className="form-control select"
                multiple={true}
                value={language}
                onChange={e => onChangeValue(e, setLanguage)}
              >
                <option value="">Select</option>
                  { renderLanguages() }
              </select> */}
                {validation.specialties.isInvalid && (
                  <Warning message={validation.specialties.message} />
                )}
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label>Gender</label>
                <select
                  className="form-control select"
                  value={gender}
                  onChange={e => onChangeValue(e, setGender)}
                >
                  <option value="">Select</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
                {validation.gender.isInvalid && (
                  <Warning message={validation.gender.message} />
                )}
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label>Languages</label>
                <Select
                  closeMenuOnSelect={false}
                  value={selectedLanguages}
                  isMulti
                  options={languagesToSelectOptions(languages)}
                  onChange={values => setSelectedLanguages(values)}
                />
                {validation.languages.isInvalid && (
                  <Warning message={validation.languages.message} />
                )}
              </div>
            </div>
            {/* <div className="col-md-6">
            <div className="form-group mb-0">
              <label>Years of Experience</label>
              <input
                type="text"
                className="form-control"
                value={yearOfExp}
                onChange={e => onChangeValue(e, setYearOfExp)}
              />
            </div>
              {
                validation.yearOfExp.isInvalid && (
                  <Warning message={validation.yearOfExp.message} />
                )
              }
          </div> */}
          </div>
        </div>
      </div>
      {/* /Basic Information */}
      {/* About Me */}
      {/* <div class="card">
          <div class="card-body">
              <h4 class="card-title">About Me</h4>
              <div class="form-group mb-0">
                  <label>Biography</label>
                  <textarea class="form-control" rows="5"></textarea>
              </div>
          </div>
      </div> */}
      {/* /About Me */}

      {/* Clinic Info */}
      <div className="card">
        <div className="card-body">
          <h4 className="card-title">Office Details</h4>
          <div className="row form-row">
            <div className="col-md">
              <div className="form-group">
                <label>Office Location</label>
                <GeolocationPicker
                  position={officeLocation}
                  height="300px"
                  onLocationChange={onLocationChange}
                />
              </div>
            </div>
          </div>
          <div className="row form-row">
            <div className="col-md">
              <div className="form-group">
                <label>More Location Details</label>
                <input
                  className="form-control"
                  type="text"
                  value={locationName}
                  onChange={e => onChangeValue(e, setLocationName)}
                />
                {validation.locationName.isInvalid && (
                  <Warning message={validation.locationName.message} />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* /Clinic Info */}
      <div className="submit-section submit-btn-bottom">
        <button
          onClick={e => doUpdateProfile(e)}
          className="btn btn-primary submit-btn"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}

ProSettings.propTypes = {
  dispatch: PropTypes.func.isRequired,
  updateProfileDetailFunc: PropTypes.func,
  fetchProfileDetailFunc: PropTypes.func,
  getLanguagesFunc: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  settings: makeSelectSettings(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    getLanguagesFunc: toastr => {
      dispatch(getLanguagesAction(toastr));
    },
    getSpecialtiesFunc: toastr => {
      dispatch(getSpecialtiesAction(toastr));
    },
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
)(ProSettings);
