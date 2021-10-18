import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the doctorAppointments state domain
 */

const SelectDoctorAppointmentsDomain = state =>
  state.doctorAppointments || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by doctorAppointments
 */

const makeSelectDoctorAppointments = () =>
  createSelector(
    SelectDoctorAppointmentsDomain,
    substate => substate,
  );

export default makeSelectDoctorAppointments;
export { SelectDoctorAppointmentsDomain };
