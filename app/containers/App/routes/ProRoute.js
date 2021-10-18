import React from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';

import DoctorRegister from 'containers/Register/Loadable';
import LandingPage from 'containers/LandingPage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import PasswordResetSuccess from 'containers/PasswordResetSuccess/Loadable';
import DoctorLogin from 'containers/DoctorLogin/Loadable';
import ForgotPassword from '../../ForgotPassword';
import BookingSuccess from '../../BookingSuccess';
import DoctorDashboard from '../../DoctorDashboard';
import FillConsult from '../../FillConsult';
import ScheduleTimings from '../../ScheduleTimings';
import ChangePassword from '../../ChangePassword';
import ProfileSettings from '../../Settings';
import Fee from '../../Fee';
import Booking from '../../Booking';
import Search from '../../Search';
import LabSearch from '../../lab/Search';

const ProRoute = () => {
  return (
    <Switch>
      <Route exact path="/" component={LandingPage} />
      <Route exact path="/pro/login" component={DoctorLogin} />
      <Route exact path="/pro/register" component={DoctorRegister} />
      <Route exact path="/booking-success" component={BookingSuccess} />
      <Route exact path="/forgot-password" component={ForgotPassword} />
      <Route
        exact
        path="/password-reset-success"
        component={PasswordResetSuccess}
      />
      <Route exact path="/dashboard" component={DoctorDashboard} />
      <Route exact path="/scheduler" component={ScheduleTimings} />
      <Route exact path="/settings" component={ProfileSettings} />
      <Route exact path="/fee" component={Fee} />
      <Route exact path="/fill-consult" component={FillConsult} />
      <Route exact path="/change-password" component={ChangePassword} />
      <Route exact path="/search" component={Search} />
      <Route exact path="/lab/search" component={LabSearch} />
      <Route exact path="/booking/:userId" component={Booking} />
      <Route path="" component={NotFoundPage} />
    </Switch>
  );
};

// const withConnect = connect();

export default ProRoute; // withRouter(compose(withConnect)(ProRoute));
