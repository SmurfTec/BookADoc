import React from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';

import PatientLogin from 'containers/Login/Loadable';
import LandingPage from 'containers/LandingPage/Loadable';
import PatientRegister from 'containers/PatientRegister/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import ForgotPassword from '../../ForgotPassword';
import BookingSuccess from '../../BookingSuccess';
import PasswordResetSuccess from 'containers/PasswordResetSuccess/Loadable';
import PatientDashboard from '../../PatientDashboard';
import PatientAppointments from '../../PatientAppointments';
import PatientChangePassword from '../../PatientChangePassword';
import PatientProfileSettings from '../../PatientSettings';
import Search from '../../Search';
import LabSearch from '../../lab/Search';

const PatientRoute = () => {
  return (
    <Switch>
      <Route exact path="/" component={LandingPage} />
      <Route exact path="/patient/login" component={PatientLogin} />
      <Route exact path="/patient/register" component={PatientRegister} />
      <Route exact path="/booking-success" component={BookingSuccess} />
      <Route exact path="/forgot-password" component={ForgotPassword} />
      <Route exact path="/password-reset-success" component={PasswordResetSuccess} />
      <Route exact path="/dashboard" component={PatientDashboard} />
      <Route exact path="/appointments" component={PatientAppointments} />
      <Route exact path="/settings" component={PatientProfileSettings} />
      <Route exact path="/change-password" component={PatientChangePassword} />
      <Route exact path="/search" component={Search} />
      <Route exact path="/lab/search" component={LabSearch} />
      <Route path="" component={NotFoundPage} />
    </Switch>
  );
};

// const withConnect = connect();

export default PatientRoute; // withRouter(compose(withConnect)(PatientRoute));
