/**
 *
 * PastConsult
 *
 */

import React, { memo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { Link } from 'react-router-dom';
import SideNav from 'components/SideNav';
import { toast } from 'react-toastify';
import makeSelectPastConsult from './selectors';
import reducer from './reducer';
import saga from './saga';
import Footer from 'components/Footer';
import Header from 'components/Header';
import { fetchPastConsultAction } from './actions';
import doctorThumb02 from '../../theme/img/doctors/doctor-thumb-02.jpg';
import patient from '../../theme/img/patients/patient.jpg';
import patient1 from '../../theme/img/patients/patient1.jpg';
import patient2 from '../../theme/img/patients/patient2.jpg';
import patient3 from '../../theme/img/patients/patient3.jpg';
import patient4 from '../../theme/img/patients/patient4.jpg';
import patient5 from '../../theme/img/patients/patient5.jpg';
import patient6 from '../../theme/img/patients/patient6.jpg';
import patient7 from '../../theme/img/patients/patient7.jpg';
import patient8 from '../../theme/img/patients/patient8.jpg';
import patient9 from '../../theme/img/patients/patient9.jpg';
import patient10 from '../../theme/img/patients/patient10.jpg';
import patient11 from '../../theme/img/patients/patient11.jpg';
import ProfileWidget from "../../components/ProfileWidget";

export function PastConsult(props) {
  useInjectReducer({ key: 'pastConsult', reducer });
  useInjectSaga({ key: 'pastConsult', saga });

  const [consults, setConsults] = useState([]);

  useEffect(() => {
    props.fetchPastConsultFunc(toast);
  }, []);

  useEffect(() => {
    if (props.pastConsult.oldConsults.length > 0)
      setConsults(props.pastConsult.oldConsults);
  }, [props.pastConsult.oldConsults]);

  return (
    <div>
      <Helmet>
        <title>Past Consult</title>
        <meta name="description" content="Description of Past Consult" />
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
                    My Patients
                  </li>
                </ol>
              </nav>
              <h2 className="breadcrumb-title">My Patients</h2>
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
                 <ProfileWidget/>
                <SideNav />
              </div>
              {/* /Profile Sidebar */}
            </div>
            <div className="col-md-7 col-lg-8 col-xl-9">
              <div className="row row-grid">
                <div className="col-md-6 col-lg-4 col-xl-3">
                  <div className="card widget-profile pat-widget-profile">
                    <div className="card-body">
                      <div className="pro-widget-content">
                        <div className="profile-info-widget">
                          <a
                            href="patient-profile.html"
                            className="booking-doc-img"
                          >
                            <img src={patient} alt="User Image" />
                          </a>
                          <div className="profile-det-info">
                            <h3>
                              <a href="patient-profile.html">Richard Wilson</a>
                            </h3>

                            <div className="patient-details">
                              <h5>
                                <b>Patient ID :</b> P0016
                              </h5>
                              <h5 className="mb-0">
                                <i className="fa fa-map-marker" /> Alabama, USA
                              </h5>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="patient-info">
                        <ul>
                          <li>
                            Phone <span>+1 952 001 8563</span>
                          </li>
                          <li>
                            Age <span>38 Years, Male</span>
                          </li>
                          <li>
                            Blood Group <span>AB+</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-12">
                <div className="load-more text-center">
                  <a
                    className="btn btn-primary btn-sm"
                    href="javascript:void(0);"
                  >
                    Load More
                  </a>
                </div>
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

PastConsult.propTypes = {
  dispatch: PropTypes.func.isRequired,
  fetchPastConsultFunc: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  pastConsult: makeSelectPastConsult(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    fetchPastConsultFunc: toastr => {
      dispatch(fetchPastConsultAction(toastr));
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
)(PastConsult);
