import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the fillConsult state domain
 */

const selectFillConsultDomain = state => state.fillConsult || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by FillConsult
 */

const makeSelectFillConsult = () =>
  createSelector(
    selectFillConsultDomain,
    substate => substate,
  );

export default makeSelectFillConsult;
export { selectFillConsultDomain };
