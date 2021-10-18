/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React, { useEffect, memo } from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import reducer from './reducer';
import saga from './saga';
import Footer from 'components/Footer';
import Header from 'components/Header';
const key = 'home';

export function HomePage(props) {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });
    const doSearchDoctors = e => {
        e.preventDefault();
        console.log('dd', props.history.push("search"));
    };
  return (
    <article>
      <Helmet>
        <title>Home Page</title>
      </Helmet>
      <Header />
      <div>
         {/* Home Banner */}
        <section className="section section-search">
          <div className="container-fluid">
            <div className="banner-wrapper">
              <div className="banner-header text-center">
                <h1>Search Doctor, Make an Appointment</h1>
                <p>
                  Discover the best doctors, clinic & hospital the city nearest
                  to you.
                </p>
              </div>
              <div className="search-box">
                <form action="/search">
                  <div className="form-group search-location">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Preferred Location"
                    />
                  </div>

                  {/* <div class="form-group search-location">
                               <input type="text" class="form-control" placeholder="Search Location" />
                               <span class="form-text">Date</span>
                               </div> */}

                  <div className="form-group search-info">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Doctor Name, Specialty etc"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={e => doSearchDoctors(e)}
                    className="btn btn-primary search-btn"
                  >
                    <i className="fa fa-search" />
                    <span>Search</span>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
         {/*/Home Banner */}
         {/*Clinic and Specialities */}
      </div>
      <Footer />
    </article>
  );
}

HomePage.propTypes = {};

const mapStateToProps = createStructuredSelector({});

export function mapDispatchToProps() {
  return {};
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(HomePage);
