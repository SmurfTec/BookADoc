import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the bookingSuccess state domain
 */

const selectBookingSuccessDomain = state =>
  state.bookingSuccess || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by BookingSuccess
 */

const makeSelectBookingSuccess = () =>
  createSelector(
    selectBookingSuccessDomain,
    substate => substate,
  );

export default makeSelectBookingSuccess;
export { selectBookingSuccessDomain };
