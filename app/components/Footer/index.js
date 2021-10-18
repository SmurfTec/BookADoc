import React from 'react';
import { Link } from 'react-router-dom';

import logo from '../../theme/img/footer-logo.png';

function Footer() {
  return (
    <footer className="footer">
      <div className="row">
        <div className="col-sm-12 col-md-12 col-lg-3 text-center col-lg-text-left">
          <ul>
            <li>
              <h1 className="">About Us</h1>
            </li>
            <li>
              <a href="/article">Our Story</a>
            </li>
            <li>
              <a href="/career">Careers</a>
            </li>
          </ul>
        </div>
        <div className="col-sm-12 col-md-12 col-lg-3 text-center col-lg-text-left">
          <ul>
            <li>
              <h1 className="">Our Policies</h1>
            </li>
            <li>
              <a href="/terms#Data">Data and Privacy Policy</a>
            </li>
            <li>
              <a href="/terms#Terms">Terms of Service</a>
            </li>
            <li>
              <a href="/terms#Innovation">Innovation and Bug Bounty</a>
            </li>
          </ul>
        </div>
        <div className="col-sm-12 col-md-12 col-lg-3 text-center col-lg-text-left">
          <ul>
            <li>
              <h1 className="">Contact</h1>
            </li>
            <li>
              <a href="/help">Help Center</a>
            </li>
            <li>
              <a href="mailto:doc@bookadoc.online">doc@bookadoc.online</a>
            </li>
            <li>
              <a href="tel:+233205533304">+233205533304</a>
            </li>
          </ul>
        </div>
        <div className="col-sm-12 col-md-12 col-lg-3 text-center col-lg-text-left">
          <ul>
            <li>
              <h1 className="">Social</h1>
            </li>
            <li>
              <a href="https://www.instagram.com/bookadoc/" target="_blank">
                Instagram
              </a>
            </li>
            <li>
              <a href="https://twitter.com/TeamBookADoc" target="_blank">
                Twitter
              </a>
            </li>
            <li>
              <a
                href="https://gh.linkedin.com/company/bookadoc"
                target="_blank"
              >
                LinkedIn
              </a>
            </li>
            <li>
              <a href="https://www.facebook.com/bookadoc/" target="_blank">
                Facebook
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <ul>
            <li>
              <a href="/">© 2020 BookADoc, Inc.</a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
    // <footer className="footer">
    //   <div className="footer-top">
    //     <div className="container-fluid">
    //       <div className="row">
    //         <div className="col-lg-3 col-md-6">
    //           <div className="footer-widget footer-about">
    //             <div className="footer-logo">
    //               <img src={logo} alt="logo" />
    //             </div>
    //             <div className="footer-about-content">
    //               <div className="social-icon">
    //                 <ul>
    //                   <li>
    //                     <a
    //                       href="https://www.facebook.com/yourhealthafrique"
    //                       target="_blank"
    //                     >
    //                       <i className="fa fa-facebook" />{' '}
    //                     </a>
    //                   </li>
    //                   <li>
    //                     <a
    //                       href="https://www.twitter.com/healthafrique"
    //                       target="_blank"
    //                     >
    //                       <i className="fa fa-twitter" />{' '}
    //                     </a>
    //                   </li>

    //                   <li>
    //                     <a
    //                       href="https://www.instagram.com/healthafrique"
    //                       target="_blank"
    //                     >
    //                       <i className="fa fa-instagram" />
    //                     </a>
    //                   </li>
    //                 </ul>
    //               </div>
    //             </div>
    //           </div>
    //         </div>

    //         <div className="col-lg-3 col-md-6">
    //           <div className="footer-widget  footer-menu footer-list">
    //             <h2 className="footer-title">For Patients</h2>
    //             <ul>
    //               <li>
    //                 <Link to="search">
    //                   {' '}
    //                   <i className="fa fa-angle-double-right" /> Search for
    //                   Doctors
    //                 </Link>
    //               </li>
    //               <li>
    //                 <Link to="login">
    //                   <i className="fa fa-angle-double-right" /> Login
    //                 </Link>
    //               </li>
    //               <li>
    //                 <Link to="register">
    //                   <i className="fa fa-angle-double-right" /> Register
    //                 </Link>
    //               </li>
    //               <li>
    //                 <Link to="booking">
    //                   <i className="fa fa-angle-double-right" /> Booking
    //                 </Link>
    //               </li>
    //               <li>
    //                 <Link to="patient-dashboard">
    //                   <i className="fa fa-angle-double-right" /> Patient
    //                   Dashboard
    //                 </Link>
    //               </li>
    //             </ul>
    //           </div>
    //         </div>

    //         <div className="col-lg-3 col-md-6">
    //           <div className="footer-widget footer-menu">
    //             <h2 className="footer-title">For Doctors</h2>
    //             <ul>
    //               <li>
    //                 <Link to="appointments">
    //                   <i className="fa fa-angle-double-right" /> Appointments
    //                 </Link>
    //               </li>
    //               <li>
    //                 <Link to="chat">
    //                   <i className="fa fa-angle-double-right" /> Chat
    //                 </Link>
    //               </li>
    //               <li>
    //                 <Link to="login">
    //                   <i className="fa fa-angle-double-right" /> Login
    //                 </Link>
    //               </li>
    //               <li>
    //                 <Link to="doctor-register">
    //                   <i className="fa fa-angle-double-right" /> Register
    //                 </Link>
    //               </li>
    //               <li>
    //                 <Link to="doctor-dashboard">
    //                   <i className="fa fa-angle-double-right" /> Doctor
    //                   Dashboard
    //                 </Link>
    //               </li>
    //             </ul>
    //           </div>
    //         </div>

    //         <div className="col-lg-3 col-md-6">
    //           <div className="footer-widget footer-contact">
    //             <h2 className="footer-title">Contact Us</h2>
    //             <div className="footer-contact-info">
    //               <div className="footer-address">
    //                 <span>
    //                   <i className="fa fa-map-marker" />
    //                 </span>
    //                 <p> 1st Abla Marmon Link </p>
    //               </div>
    //               <p>
    //                 <i className="fa fa-phone" />
    //                 0593922018
    //               </p>
    //               <p className="mb-0">
    //                 <i className="fa fa-envelope" />
    //                 doc@bookadoc.online
    //               </p>
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    //   <div className="footer-bottom">
    //     <div className="container-fluid">
    //       <div className="copyright">
    //         <div className="row">
    //           <div className="col-md-6 col-lg-6">
    //             <div className="copyright-text">
    //               <p className="mb-0">&copy; BookADoc, Inc</p>
    //             </div>
    //           </div>
    //           <div className="col-md-6 col-lg-6">
    //             <div className="copyright-menu">
    //               <ul className="policy-menu">
    //                 <li>
    //                   <a href="term-condition.html">Terms and Conditions</a>
    //                 </li>
    //                 <li>
    //                   <a href="privacy-policy.html">Policy</a>
    //                 </li>
    //               </ul>
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </footer>
  );
}

export default Footer;
