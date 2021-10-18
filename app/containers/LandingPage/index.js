/**
 *
 * LandingPage
 *
 */

import React, { memo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Link, withRouter } from 'react-router-dom';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';

import Footer from '../../components/Footer';
import TopMobileImg from '../../theme/img/landing/top_mobile_img.png';
import bookLogo from '../../theme/img/landing/bookLogo.png';
import cards from '../../theme/img/landing/cards.jpg';
import professional from '../../theme/img/landing/professional.png';
import makeSelectLandingPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import makeSelectDoctorLogin from '../DoctorLogin/selectors';
import makeSelectPatientLogin from '../Login/selectors';
import SignInOptions from '../../components/SignInOptions';
import ProfessionalDropdown from '../../components/ProfessionalDropdown';
import PlaceSelect from '../../components/PlaceSelect';

export function LandingPage(props) {
  useInjectReducer({ key: 'landingPage', reducer });
  useInjectSaga({ key: 'landingPage', saga });

  const {history} = props;

  const [user, setUser] = useState({});
  const [location, setLocation] = useState();
  const [docName, setDocName] = useState('');
  const [professionEl, setProfessionEl] = useState(null);
  const [showProfession, setShowProfession] = useState(false);
  const [selectedProfession, setSelectedProfession] = useState();

  useEffect(() => {
    const userObj =
      localStorage.getItem('user') === null
        ? {}
        : JSON.parse(localStorage.getItem('user'));
    setUser(userObj);
  }, []);

  useEffect(() => {
    if (Object.keys(props.doctorLogin.user).length > 0) {
      setUser(props.doctorLogin.user);
    }
  }, [props.doctorLogin.user]);

  useEffect(() => {
    if (Object.keys(props.patientLogin.user).length > 0) {
      setUser(props.patientLogin.user);
    }
  }, [props.patientLogin.user]);

  const onChangeValue = (e, func) => {
    func(e.target.value);
  };

  const onPlaceSelected = data => {
    setLocation(data);
  };

  const buildAddress = () => {
    const address = Object.keys(location || {})
      .map(key => `${key}=${location[key]}`)
      .join('&')
      .replace(/ /g, '+');

    const role = selectedProfession && `roles=${selectedProfession.id}`;

    const arr = [];
    if (address) {
      arr.push(address);
    }

    if (role) {
      arr.push(role);
    }

    return arr.length ? arr.join('&') : 'addr=';
  };

  const encodeLocation = () => {
    const address = Object.keys(location || {})
      .map(key => `${key}=${location[key]}`)
      .join('&')
      .replace(/ /g, '+');

    return address || 'addr=';
  };

  const handleSearchClick = () => {
    const query = buildAddress();
    history.push(`/search?${query}`);
  };

  const handleProfessionClick = e => {
    setProfessionEl(e.target);
    setShowProfession(true);
  };

  const handleProfessionChange = profession => {
    setSelectedProfession(profession);
  }

  return (
    <div className="landing_header">
      <Helmet>
        <title>Home Page</title>
        <meta name="description" content="Description of LandingPage" />
      </Helmet>
      <div className="row">
        <div className="col-md-1" />
        <div className="col-md-7 mb-3">
          <img
            src={bookLogo}
            height="30"
            width="100"
            className="mt-4"
            alt="BookADoc"
          />
          {/* <div className="container">
            <ul className="nav nav-tabs">
              <li className="active">
                <a data-toggle="tab" href="#menu1">
                  Patient Login
                </a>
              </li>
              <li>
                <a data-toggle="tab" href="#menu2">
                  Patient Sign Up
                </a>
              </li>
              <li>
                <a data-toggle="tab" href="#menu3">
                  Professionls Login
                </a>
              </li>
              <li>
                <a data-toggle="tab" href="#menu4">
                  Professionls Sign Up
                </a>
              </li>
            </ul>
          </div> */}
        </div>
        <div className="col-sm-12 col-md-3">
          <SignInOptions />
        </div>
        <div className="col-md-1" />
      </div>
      <div className="row ">
        <div className="col-md-1" />
        <div className="col-md-10 search_form mb-5">
          <div className="tab-content">
            <div id="menu1" className="tab-pane fade in active show">
              <div className="row">
                <div className="col-md-5">
                  <div className="row input_container">
                    <div className="col-md-12">
                      <label className="form-control-label">LOCATION</label>
                    </div>
                    <div className="col-md-12">
                      <PlaceSelect onSelect={onPlaceSelected} />
                    </div>
                  </div>
                </div>
                <div
                className="col-md-5" onClick={handleProfessionClick}>
                  <div className="row input_container">
                    <div className="col-md-12">
                      <label className="form-control-label">
                        I NEED A:
                      </label>
                    </div>
                    <div className="col-md-12">
                      {/* <input
                        type="text"
                        placeholder="Type name here"
                        className="professional_search"
                        readOnly
                        value={selectedProfession ? selectedProfession.title : ''}
                        // onChange={e => onChangeValue(e, setDocName)}
                        onClick={e => setSelectedProfession(e.target)}
                      /> */}
                      <div className="professional_search">
                        {selectedProfession ? selectedProfession.title : '    ' }
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-2">
                  {/* <Link
                    to={
                      '/search?' + buildAddress() +
                      '&doctorName=' +
                      docName.replace(/ /g, '+')
                    }
                    className="btn search_btn"
                  >
                    <i className="fa fa-search"> </i> Search
                  </Link> */}
                  <a
                  href="javascript:void(0);"
                  onClick={handleSearchClick}
                  className="btn search_btn"
                  >
                    <i className="fa fa-search"> </i> Search
                  </a>
                </div>
              </div>
            </div>
            <div id="menu2" className="tab-pane fade">
              <div className="row">
                <div className="col-md-3">
                  <div className="row input_container">
                    <div className="col-md-12">
                      <label className="form-control-label">LOCATION</label>
                    </div>
                    <div className="col-md-12">
                      <input type="text" placeholder="Where are you going?" />
                    </div>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="row input_container">
                    <div className="col-md-12">
                      <label className="form-control-label">
                        CHECK IN / CHECK OUT
                      </label>
                    </div>
                    <div className="col-md-12">
                      <input type="text" placeholder="Where are you going?" />
                    </div>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="row input_container">
                    <div className="col-md-12">
                      <label className="form-control-label">GUEST</label>
                    </div>
                    <div className="col-md-12">
                      <input type="text" placeholder="Where are you going?" />
                    </div>
                  </div>
                </div>
                <div className="col-md-3">
                  <Link to="/search" className="btn search_btn">
                    <i className="fa fa-search"> </i> Search
                  </Link>
                </div>
              </div>
            </div>
            <div id="menu3" className="tab-pane fade">
              <div className="row">
                <div className="col-md-3">
                  <div className="row input_container">
                    <div className="col-md-12">
                      <label className="form-control-label">LOCATION</label>
                    </div>
                    <div className="col-md-12">
                      <input type="text" placeholder="Where are you going?" />
                    </div>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="row input_container">
                    <div className="col-md-12">
                      <label className="form-control-label">
                        CHECK IN / CHECK OUT
                      </label>
                    </div>
                    <div className="col-md-12">
                      <input type="text" placeholder="Where are you going?" />
                    </div>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="row input_container">
                    <div className="col-md-12">
                      <label className="form-control-label">GUEST</label>
                    </div>
                    <div className="col-md-12">
                      <input type="text" placeholder="Where are you going?" />
                    </div>
                  </div>
                </div>
                <div className="col-md-3">
                  <Link to="/search" className="btn search_btn">
                    <i className="fa fa-search"> </i> Search
                  </Link>
                </div>
              </div>
            </div>
            <div id="menu4" className="tab-pane fade">
              <div className="row">
                <div className="col-md-3">
                  <div className="row input_container">
                    <div className="col-md-12">
                      <label className="form-control-label">LOCATION</label>
                    </div>
                    <div className="col-md-12">
                      <input type="text" placeholder="Where are you going?" />
                    </div>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="row input_container">
                    <div className="col-md-12">
                      <label className="form-control-label">
                        CHECK IN / CHECK OUT
                      </label>
                    </div>
                    <div className="col-md-12">
                      <input type="text" placeholder="Where are you going?" />
                    </div>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="row input_container">
                    <div className="col-md-12">
                      <label className="form-control-label">GUEST</label>
                    </div>
                    <div className="col-md-12">
                      <input type="text" placeholder="Where are you going?" />
                    </div>
                  </div>
                </div>
                <div className="col-md-3">
                  <Link to="/search" className="btn search_btn">
                    <i className="fa fa-search"> </i> Search
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-1" />
      </div>
      <div className="row justify-content-center">
        <div className="col-md-2" />
        <div className="col-md-4 booking_doctor">
          <p className="heading">
            Private Health Professional at Your Doorstep
          </p>
          <p className="detail">
            now you can have access to a health professional anytime and
            anywhere
          </p>
        </div>
        <div className="col-md-6">
          <img src={TopMobileImg} alt="User Image" />
        </div>
      </div>
      <div className="row ">
        <div className="col-md-1" />
        <div className="col-md-10 donate-section">
          <div className="col-md-4">
            <h4 className="we_stand">
              Together because <br /> #BlackLivesMatter
            </h4>
            <p>
              We stand firmly against racism and we reject police brutality or
              inhumane treatement of any kind.
            </p>
          </div>
          <div className="col-md-8" />
        </div>
        <div className="col-md-1" />
      </div>
      <div className="row ">
        <div className="col-md-12 testimonial-section">
          <div className="col-md-8 testimonial_wrap">
            <p className="patients_say">What our patients say:</p>
            <h4 className="we_stand">
              <p>
                "This is the best thing to happen to the healthcare industry in
                Ghana. These guys have made my life very easy! Recommended!"
              </p>
            </h4>
            <div className="row">
              {/* <div className="col-2">
                <div>
                  <img src={testimonialImg} className="testimonialImg" />
                </div>
              </div> */}

              <div className="col-4">
                <p>
                  <b>Beatrice Ashitey</b> <br />
                  {/* company here */}
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-8" />
        </div>
      </div>

      {/* <div className="row geriatrics">
        <div className="col-md-12">
          <h1 className="text-center heading">
            Special Geriatrics Service Package
          </h1>
        </div>
        <section className="pricing py-5">
          <div className="container">
            <div className="row">
              <div className="col-lg-4">
                <div className="card mb-5 mb-lg-0">
                  <div className="card-body">
                    <h5 className="card-title text-muted text-uppercase text-center">
                      Free
                    </h5>
                    <h6 className="card-price text-center">
                      $0<span className="period">/month</span>
                    </h6>

                    <ul className="fa-ul">
                      <li>
                        <span className="fa-li">
                          <i className="fas fa-check" />
                        </span>
                        Single User
                      </li>
                      <li>
                        <span className="fa-li">
                          <i className="fas fa-check" />
                        </span>
                        5GB Storage
                      </li>
                      <li>
                        <span className="fa-li">
                          <i className="fas fa-check" />
                        </span>
                        Unlimited Public Projects
                      </li>
                      <li>
                        <span className="fa-li">
                          <i className="fas fa-check" />
                        </span>
                        Community Access
                      </li>
                      <li className="text-muted">
                        <span className="fa-li">
                          <i className="fas fa-times" />
                        </span>
                        Unlimited Private Projects
                      </li>
                      <li className="text-muted">
                        <span className="fa-li">
                          <i className="fas fa-times" />
                        </span>
                        Dedicated Phone Support
                      </li>
                      <li className="text-muted">
                        <span className="fa-li">
                          <i className="fas fa-times" />
                        </span>
                        Free Subdomain
                      </li>
                      <li className="text-muted">
                        <span className="fa-li">
                          <i className="fas fa-times" />
                        </span>
                        Monthly Status Reports
                      </li>
                    </ul>
                    <a
                      href="#"
                      className="btn btn-block btn-primary text-uppercase"
                    >
                      Button
                    </a>
                  </div>
                </div>
              </div>

              <div className="col-lg-4">
                <div className="card mb-5 mb-lg-0">
                  <div className="card-body">
                    <h5 className="card-title text-muted text-uppercase text-center">
                      Plus
                    </h5>
                    <h6 className="card-price text-center">
                      $9<span className="period">/month</span>
                    </h6>

                    <ul className="fa-ul">
                      <li>
                        <span className="fa-li">
                          <i className="fas fa-check" />
                        </span>
                        <strong>5 Users</strong>
                      </li>
                      <li>
                        <span className="fa-li">
                          <i className="fas fa-check" />
                        </span>
                        50GB Storage
                      </li>
                      <li>
                        <span className="fa-li">
                          <i className="fas fa-check" />
                        </span>
                        Unlimited Public Projects
                      </li>
                      <li>
                        <span className="fa-li">
                          <i className="fas fa-check" />
                        </span>
                        Community Access
                      </li>
                      <li>
                        <span className="fa-li">
                          <i className="fas fa-check" />
                        </span>
                        Unlimited Private Projects
                      </li>
                      <li>
                        <span className="fa-li">
                          <i className="fas fa-check" />
                        </span>
                        Dedicated Phone Support
                      </li>
                      <li>
                        <span className="fa-li">
                          <i className="fas fa-check" />
                        </span>
                        Free Subdomain
                      </li>
                      <li className="text-muted">
                        <span className="fa-li">
                          <i className="fas fa-times" />
                        </span>
                        Monthly Status Reports
                      </li>
                    </ul>
                    <a
                      href="#"
                      className="btn btn-block btn-primary text-uppercase"
                    >
                      Button
                    </a>
                  </div>
                </div>
              </div>

              <div className="col-lg-4">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title text-muted text-uppercase text-center">
                      Pro
                    </h5>
                    <h6 className="card-price text-center">
                      $49<span className="period">/month</span>
                    </h6>

                    <ul className="fa-ul">
                      <li>
                        <span className="fa-li">
                          <i className="fas fa-check" />
                        </span>
                        <strong>Unlimited Users</strong>
                      </li>
                      <li>
                        <span className="fa-li">
                          <i className="fas fa-check" />
                        </span>
                        150GB Storage
                      </li>
                      <li>
                        <span className="fa-li">
                          <i className="fas fa-check" />
                        </span>
                        Unlimited Public Projects
                      </li>
                      <li>
                        <span className="fa-li">
                          <i className="fas fa-check" />
                        </span>
                        Community Access
                      </li>
                      <li>
                        <span className="fa-li">
                          <i className="fas fa-check" />
                        </span>
                        Unlimited Private Projects
                      </li>
                      <li>
                        <span className="fa-li">
                          <i className="fas fa-check" />
                        </span>
                        Dedicated Phone Support
                      </li>
                      <li>
                        <span className="fa-li">
                          <i className="fas fa-check" />
                        </span>
                        <strong>Unlimited</strong> Free Subdomains
                      </li>
                      <li>
                        <span className="fa-li">
                          <i className="fas fa-check" />
                        </span>
                        Monthly Status Reports
                      </li>
                    </ul>
                    <a
                      href="#"
                      className="btn btn-block btn-primary text-uppercase"
                    >
                      Button
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div> */}

      <div className="row health_professional">
        <div className="col-md-2" />
        <div className="col-md-8 p-0">
          <div className="row">
            <div className="col-md-6 mt-3">
              <img className="join_professional" src={professional} />
            </div>
            <div className="col-md-6">
              <h4 className="caption">
                Smart, hassle-free, same-day appointments available at the
                comfort of your home.
              </h4>
            </div>
          </div>
        </div>
        <div className="col-md-2" />
      </div>
      <div className="row health_professional_second">
        <div className="col-md-2" />
        <div className="col-md-8 p-0">
          <div className="row">
            <div className="col-md-6 mt-3">
              <h3 className="heading">Health professional?</h3>
              <h4 className="caption">
                Sign up today and start receiving appointments.
              </h4>
              <div className="row">
                <div className="col-md-12">
                  <a href="/pro/register" className="btn btn-green get-started">
                    Get Started
                  </a>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <img className="join_professional" src={cards} />
            </div>
          </div>
        </div>
        <div className="col-md-2" />
      </div>
      <div className="row">
        <div className="col-md-2" />
        <div className="col-md-8 p-0">
          <hr style={{ border: '3px dashed #9a9494', width: '100%' }} />
        </div>
        <div className="col-md-2" />
      </div>

      {/* <div className="row trusted_companies">
        <div className="col-md-2" />
        <div className="col-md-8">
          <h1 className="text-center heading">
            Trusted by these great organizations
          </h1>
          <div className="row mt-5">
            <div className="col-md-2">
              <img src={bulb} />
            </div>
            <div className="col-md-2">
              <img src={freud} />
            </div>
            <div className="col-md-2">
              <img src={wework} />
            </div>
            <div className="col-md-2">
              <img src={snap} />
            </div>
            <div className="col-md-2">
              <img src={warner} />
            </div>
            <div className="col-md-2">
              <img src={elvis} />
            </div>
          </div>
          <div className="row mt-5">
            <div className="col-md-2" />
            <div className="col-md-2" />
            <div className="col-md-2">
              <img src={wpp} />
            </div>
            <div className="col-md-2">
              <img src={capital} />
            </div>
            <div className="col-md-2">
              <img src={reiss} />
            </div>
            <div className="col-md-2" />
            <div className="col-md-2" />
          </div>
        </div>
        <div className="col-md-2" />
      </div> */}

      <div className="row lapreasef_second ">
        <div className="col-md-3" />
        <div className="col-md-5 p-0">
          <h4 className="caption">
            We love <span className="txt-green ">creative minds.</span> Wanna
            join us? Check out our career's page!
          </h4>
          <div className="row">
            <div className="col-md-12">
              <a href="" className="btn btn-green checkout_career">
                <a href="/career">Visit Career's Page</a>
              </a>
            </div>
          </div>
        </div>
        <div className="col-md-4" />
      </div>
      <Footer />
      {/* <div className="row ">
        <div className="col-md-1" />
        <div className="col-md-10 footer_section mt-10">
          <div className="row">
            <div className="col-md-3">
              <h3 className="heading">About Us</h3>
              <h5 className="menu">
                <a href="/article">Our Story</a>
              </h5>
              <h5 className="menu">
                <a href="/career">Career</a>
              </h5>
            </div>
            <div className="col-md-3">
              <h3 className="heading">Our Policies</h3>
              <h5 className="menu">
                <a href="/terms#Data">Data Policy</a>
              </h5>
              <h5 className="menu">
                <a href="/terms#Data">Privacy Policy</a>
              </h5>
              <h5 className="menu">
                <a href="/terms#Terms">Terms Of Service</a>
              </h5>
            </div>
            <div className="col-md-3">
              <h3 className="heading">Contact</h3>
              <h5 className="menu">doc@bookadoc.online</h5>
              <h5 className="menu">+233205533304</h5>
              <h5 className="menu">
                <a href="/help">Help Center</a>
              </h5>
            </div>
            <div className="col-md-3">
              <h3 className="heading">Social</h3>
              <h5 className="menu">LoveRealm</h5>
              <h5 className="menu">Twitter</h5>
              <h5 className="menu">LinkedIn</h5>
              <h5 className="menu">Facebook</h5>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">@2020 BookADoc, Inc</div>
          </div>
        </div>
        <div className="col-md-1" />
      </div> */}
      {/* Begin professional dropdown */}
      <ProfessionalDropdown
        anchorEl={professionEl}
        onChange={handleProfessionChange}
        show={showProfession}
        onClose={() => setShowProfession(false)}
      />
      {/* End professional dropdown */}
    </div>
  );
}

LandingPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  landingPage: makeSelectLandingPage(),
  doctorLogin: makeSelectDoctorLogin(),
  patientLogin: makeSelectPatientLogin(),
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

export default withRouter(
  compose(
    withConnect,
    memo,
)(LandingPage));
