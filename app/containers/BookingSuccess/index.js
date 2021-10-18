/**
 *
 * BookingSuccess
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import Footer from 'components/Footer';
import Header from 'components/Header';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectBookingSuccess from './selectors';
import reducer from './reducer';
import saga from './saga';

export function BookingSuccess() {
  useInjectReducer({ key: 'bookingSuccess', reducer });
  useInjectSaga({ key: 'bookingSuccess', saga });

  return (
      <article>
        <Header/>
      <div className="content success-page-cont">
        <div className="container-fluid">

          <div className="row justify-content-center">
            <div className="col-lg-6">

                {/*Success Card */}
              <div className="card success-card">
                <div className="card-body">
                  <div className="success-cont">
                    <i className="fa fa-check"></i>
                    <h3>Appointment booked Successfully!</h3>
                    <p>Appointment booked with <strong>Dr. Darren Elder</strong><br />
                      on <strong>12 Nov 2019 5:00PM to 6:00PM</strong></p>
                    <a href="3" className="btn btn-primary view-inv-btn">View Invoice</a>
                  </div>
                </div>
              </div>
                {/*/Success Card */}
            </div>
          </div>

        </div>
      </div>
        <Footer/>
      </article>
  );
}

BookingSuccess.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  bookingSuccess: makeSelectBookingSuccess(),
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

export default compose(withConnect)(BookingSuccess);
