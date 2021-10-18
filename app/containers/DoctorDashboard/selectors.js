import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the doctorDashboard state domain
 */

const selectDoctorDashboardDomain = state =>
  state.doctorDashboard || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by DoctorDashboard
 */

const makeSelectDoctorDashboard = () =>
  createSelector(
    selectDoctorDashboardDomain,
    substate => substate,
  );

export default makeSelectDoctorDashboard;
export { selectDoctorDashboardDomain };
