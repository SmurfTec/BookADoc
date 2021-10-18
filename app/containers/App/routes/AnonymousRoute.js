import React from 'react';
import { Switch, Route } from 'react-router-dom';

import PasswordResetSuccess from 'containers/PasswordResetSuccess/Loadable';
import ForgotPassword from '../../ForgotPassword';
import DoctorRegister from 'containers/Register/Loadable';
import LandingPage from 'containers/LandingPage/Loadable';
import PatientLogin from 'containers/Login/Loadable';
import PatientRegister from 'containers/PatientRegister/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import DoctorLogin from 'containers/DoctorLogin/Loadable';
import Search from '../../Search';
import LabSearch from '../../lab/Search';

const AnonymousRoute = () => {
  return (
    <Switch>
      <Route exact path="/" component={LandingPage} />
      <Route exact path="/pro/login" component={DoctorLogin} />
      <Route exact path="/pro/register" component={DoctorRegister} />
      <Route exact path="/patient/login" component={PatientLogin} />
      <Route exact path="/patient/register" component={PatientRegister} />
      <Route exact path="/search" component={Search} />
      <Route exact path="/lab/search" component={LabSearch} />
      <Route exact path="/forgot-password" component={ForgotPassword} />
      <Route exact path="/password-reset-success" component={PasswordResetSuccess} />
      <Route path="" component={NotFoundPage} />
    </Switch>
  );
};

// const withConnect = connect();

export default AnonymousRoute; // withRouter(compose(withConnect)(AnonymousRoute));
