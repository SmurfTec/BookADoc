import React, { memo } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';

import PatientAppointments from '../PatientAppointments/Loadable';

export function PatientDashboard() {
  return <PatientAppointments />;
}

const withConnect = connect();

export default compose(withConnect, memo)(PatientDashboard);
