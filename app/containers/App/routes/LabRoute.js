import React from 'react';
import { Switch, Route } from 'react-router-dom';

import LandingPage from 'containers/LandingPage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import BookingSuccess from '../../BookingSuccess';
import Dashboard from '../../lab/Dashboard/loadable';
import Scheduler from '../../lab/Scheduler/loadable';
import ProfileSettings from '../../lab/Settings/Loadable';
import TestPricing from '../../lab/TestPricing/loadable';
import ChangePassword from '../../lab/ChangePassword';
import Search from '../../Search';
import LabSearch from '../../lab/Search';

const LabRoute = () => {
  return (
    <Switch>
      <Route exact path="/" component={LandingPage} />
      <Route exact path="/booking-success" component={BookingSuccess} />
      <Route exact path="/dashboard" component={Dashboard} />
      <Route exact path="/scheduler" component={Scheduler} />
      <Route exact path="/settings" component={ProfileSettings} />
      <Route exact path="/pricing" component={TestPricing} />
      <Route exact path="/change-password" component={ChangePassword} />
      <Route exact path="/search" component={Search} />
      <Route exact path="/lab/search" component={LabSearch} />
      <Route path="" component={NotFoundPage} />
    </Switch>
  );
};

// const withConnect = connect();

export default LabRoute; // withRouter(compose(withConnect)(LabRoute));
