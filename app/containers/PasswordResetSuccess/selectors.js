import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the passwordResetSuccess state domain
 */

const selectPasswordResetSuccessDomain = state =>
  state.passwordResetSuccess || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by PasswordResetSuccess
 */

const makeSelectPasswordResetSuccess = () =>
  createSelector(
    selectPasswordResetSuccessDomain,
    substate => substate,
  );

export default makeSelectPasswordResetSuccess;
export { selectPasswordResetSuccessDomain };
