/**
 *
 * PasswordResetSuccess
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import Footer from 'components/Footer';
import Header from 'components/Header';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectPasswordResetSuccess from './selectors';
import reducer from './reducer';
import saga from './saga';
import { Link } from 'react-router-dom';

export function PasswordResetSuccess() {
  useInjectReducer({ key: 'passwordResetSuccess', reducer });
  useInjectSaga({ key: 'passwordResetSuccess', saga });

  return (
    <div className="passwordResetSuccess">
      <Helmet>
        <title>Password Reset Success</title>
        <meta
          name="description"
          content="Description of Password Reset Success"
        />
      </Helmet>
      <Header />
      <div className="text-center mt-10">
        <br />
        <br />
        <h1 className="heading">Password Reset</h1>
        <h6>
          A message has been sent to you by email with instructions on how to
          reset your password.
        </h6>
      </div>
      <div className="row mb-5 mt-5">
        <div className="col-md-5" />
        <div className="col-md-2">
          <Link
            className="btn btn-primary btn-block btn-lg login-btn"
            type="button"
            to={'/'}
          >
            Home Page
          </Link>
          <br />
          <br />
        </div>
        <div className="col-md-5" />
      </div>
      <p>&nbsp;</p>
      <p>&nbsp;</p>
      <Footer />
    </div>
  );
}

PasswordResetSuccess.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  passwordResetSuccess: makeSelectPasswordResetSuccess(),
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
)(PasswordResetSuccess);
