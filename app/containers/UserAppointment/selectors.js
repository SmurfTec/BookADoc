import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the userAppointments state domain
 */

const selectUserAppointmentsDomain = state =>
  state.userAppointments || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by UserAppointments
 */

const makeSelectUserAppointments = () =>
  createSelector(
    selectUserAppointmentsDomain,
    substate => substate,
  );

export default makeSelectUserAppointments;
export { selectUserAppointmentsDomain };
