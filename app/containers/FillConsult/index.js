/**
 *
 * FillConsult
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Link } from 'react-router-dom';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectFillConsult from './selectors';
import reducer from './reducer';
import saga from './saga';
import doctorThumb02 from '../../theme/img/doctors/doctor-thumb-02.jpg';
import Footer from 'components/Footer';
import Header from 'components/Header';
export function FillConsult() {
  useInjectReducer({ key: 'fillConsult', reducer });
  useInjectSaga({ key: 'fillConsult', saga });

  return (
    <div>
      <Helmet>
        <title>Fill Consult</title>
        <meta name="description" content="Description of FillConsult" />
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
                  <li className="breadcrumb-item active" aria-current="page">
                    End Consult
                  </li>
                </ol>
              </nav>
              <h2 className="breadcrumb-title">End Consult</h2>
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
                <div className="profile-sidebar">
                  <div className="widget-profile pro-widget-content">
                    <div className="profile-info-widget">
                      <a href="#" className="booking-doc-img">
                        <img src={doctorThumb02} alt="User Image" />
                      </a>
                      <div className="profile-det-info">
                        <h3>Patient Name Here</h3>

                        <div className="patient-details">

                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-7 col-lg-8 col-xl-9">
                  <form>
                {/* Basic Information */}
                <di className="card">
                  <div className="card-body">
                    <h4 className="card-title">Clinical Details</h4>
                    <div className="row form-row">
                      <div className="col-md-12">
                        <div className="form-group">

                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>Diagnosis</label>
                          <select className="form-control select">
                            <option>R/O</option>
                            <option>?</option>
                            <option>Final Diagnosis</option>
                          </select>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>Type Condition Name <span className="text-danger">*</span></label>
                          <input type="text" className="form-control" />
                        </div>
                      </div>
                        <div className="col-md-6">
                            <div className="form-group">
                                <label>Medication <span className="text-danger">*</span></label>
                                <input type="text" className="form-control" />
                            </div>
                        </div>
                      </div>
                  </div>
                </di>
                  {/* /Basic Information */}
                  {/* /Meds Info */}
                   {/* meds */}
                   <div className="card">
                       <div className="card-body">
                           <h4 className="card-title">Add Meds Here</h4>
                           <div className="form-group mb-0">
                               <textarea  className="form-control" rows="5" placeholder="eg. Tab Paracetamol 1g TDS X 7/7"></textarea>
                           </div>
                       </div>
                   </div>
                  {/* /Clinic Info */}
                  {/* /Advice */}
                  <div className="card">
                      <div className="card-body">
                          <h4 className="card-title">Any advice to the patient?</h4>
                          <div className="form-group mb-0">
                              <textarea className="form-control" rows="5" placeholder="eg. You need to rest often"></textarea>
                          </div>
                      </div>
                  </div>
                  <div className="submit-section submit-btn-bottom">
                      <button type="submit" className="btn btn-primary submit-btn">End Consult</button>
                  </div>
                  {/* /meds */}
                  </form>
              </div>
            </div>

          </div>
        </div>
        { /* /Page Content */}
      <Footer />
    </div>
  );
}

FillConsult.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  fillConsult: makeSelectFillConsult(),
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
)(FillConsult);
