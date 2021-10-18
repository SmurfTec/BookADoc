import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the register state domain
 */

const selectPatientRegisterDomain = state => state.patientRegister || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by Register
 */

const makeSelectPatientRegister = () =>
  createSelector(
    selectPatientRegisterDomain,
    substate => substate,
  );

export default makeSelectPatientRegister;
export { selectPatientRegisterDomain };
