/**
 *
 * Login
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Helmet } from 'react-helmet';
import Footer from 'components/Footer';
import Header from 'components/Header';

import SignIn from '../../components/SignIn';

export function Login() {
  return (
    <article>
      <Helmet>
        <title>Patient Login</title>
      </Helmet>
      <Header />
      <div>
        <div className="content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-8 offset-md-2">
                <div className="account-content">
                  <div className="row align-items-center justify-content-center">
                    <div className="col-md-12 col-lg-6 login-right">
                      <SignIn redirectToHome />
                    </div>
                  </div>
                </div>
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

const withConnect = connect();

export default compose(withConnect)(Login);
