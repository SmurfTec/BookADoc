import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the fee state domain
 */

const selectFeeDomain = state => state.fee || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by Fee
 */

const makeSelectFee = () =>
  createSelector(
    selectFeeDomain,
    substate => substate,
  );

export default makeSelectFee;
export { selectFeeDomain };
