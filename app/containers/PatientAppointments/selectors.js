import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the patientAppointments state domain
 */

const selectPatientAppointmentsDomain = state =>
  state.patientAppointments || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by PatientAppointments
 */

const makeSelectPatientAppointments = () =>
  createSelector(
    selectPatientAppointmentsDomain,
    substate => substate,
  );

export default makeSelectPatientAppointments;
export { selectPatientAppointmentsDomain };
