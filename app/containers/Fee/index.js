/**
 *
 * Fee
 *
 */

import React, { memo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Helmet } from 'react-helmet';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import SideNav from 'components/SideNav';
import { toast } from 'react-toastify';
import makeSelectFee from './selectors';
import reducer from './reducer';
import saga from './saga';
import doctorThumb02 from '../../theme/img/doctors/doctor-thumb-02.jpg';
import FormValidator from '../../utils/FormValidator';
import { updateFeeAction, fetchFeeAction } from './actions';
import Warning from '../../components/Warning/Loadable';
import Footer from 'components/Footer';
import Header from 'components/Header';
import ProfileWidget from "../../components/ProfileWidget";
import Input from "../../components/Input";
export function Fee(props) {
  useInjectReducer({ key: 'fee', reducer });
  useInjectSaga({ key: 'fee', saga });

  const { fee } = props;

  // form validation
  const validator = new FormValidator([
    {
      field: 'initialConsultationFee',
      method: 'isEmpty',
      validWhen: false,
      message: 'Initial Consultation Fee is required',
    },
    {
      field: 'reviewConsultationFee',
      method: 'isEmpty',
      validWhen: false,
      message: 'Review Consultation Fee is required',
    },
  ]);

  const [initialConsultationFee, setInitialConsultationFee] = useState(fee.initialConsultationFee || '');
  const [reviewConsultationFee, setReviewConsultationFee] = useState(fee.reviewConsultationFee || '');
  const [validation, setValidation] = useState(validator.valid());

  useEffect(() => {
    setInitialConsultationFee(fee.initialConsultationFee || '');
    setReviewConsultationFee(fee.reviewConsultationFee || '');
  }, [fee]);

  // const onChangeValue = (e, func) => {
  //   func(e.target.value);
  // };

  useEffect(() => {
    props.fetchFeeFunc(toast);
  }, []);

  const onSubmit = e => {
    e.preventDefault();
    const validationCheck = validator.validate({
      initialConsultationFee,
      reviewConsultationFee,
    });
    setValidation(validationCheck);

    if (validationCheck.isValid) {
      const data = {
        sessionToken: window.localStorage.getItem('token'),
        initialConsultationFee,
        reviewConsultationFee,
        appointmentMode: 'walk-in',
      };
      props.updateFeeFunc(data, toast);
      setValidation(validator.valid());
    }
  };

  return (
    <article>
      <Helmet>
        <title>Fee</title>
      </Helmet>
      <Header />
      <div>
        <div className="content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-5 col-lg-4 col-xl-3 theiaStickySidebar">
                {/* Profile Sidebar */}

                <div className="profile-sidebar">
                 <ProfileWidget/>
                  <SideNav />
                </div>

                {/* /Profile Sidebar */}
              </div>

              <div className="col-md-7 col-lg-8 col-xl-9">
                <div className="card">
                  <div className="card-body">
                    {/* Social Form */}

                    <form action="">
                      <div className="row">
                        <div className="col-md-8 col-lg-6">
                          <div className="form-group">
                            <label>Initial Consultation Fee</label>
                            {/* <input
                              type="text"
                              className="form-control"
                              value={initialConsultationFee}
                              onChange={e =>
                                onChangeValue(e, setInitialConsultationFee)
                              }
                            /> */}
                          <Input
                          filter="^\d{0,8}$"
                          value={initialConsultationFee}
                          className="form-control"
                          onChange={data => setInitialConsultationFee(data)}
                          />
                          {validation.initialConsultationFee.isInvalid && (
                            <Warning message={validation.initialConsultationFee.message} />
                          )}
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-8 col-lg-6">
                          <div className="form-group">
                            <label>Review Consultation Fee</label>
                            {/* <input
                              type="text"
                              className="form-control"
                              value={reviewConsultationFee}
                              onChange={e =>
                                onChangeValue(e, setReviewConsultationFee)
                              }
                            /> */}
                          <Input
                          filter="^\d{0,8}$"
                          value={reviewConsultationFee}
                          className="form-control"
                          onChange={data => setReviewConsultationFee(data)}
                          />
                          {validation.reviewConsultationFee.isInvalid && (
                            <Warning message={validation.reviewConsultationFee.message} />
                          )}
                          </div>
                        </div>
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

                    {/* /Social Form */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </article>
  );
}

Fee.propTypes = {
  dispatch: PropTypes.func.isRequired,
  updateFeeFunc: PropTypes.func,
  fetchFeeFunc: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  fee: makeSelectFee(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    updateFeeFunc: (data, toastr) => {
      dispatch(updateFeeAction(data, toastr));
    },
    fetchFeeFunc: (data, toastr) => {
      dispatch(fetchFeeAction(data, toastr));
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(Fee);
