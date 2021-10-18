import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the booking state domain
 */

const selectBookingDomain = state => state.booking || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by Booking
 */

const makeSelectBooking = () =>
  createSelector(
    selectBookingDomain,
    substate => substate,
  );

export default makeSelectBooking;
export { selectBookingDomain };
