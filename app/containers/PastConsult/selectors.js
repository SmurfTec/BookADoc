import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the pastConsult state domain
 */

const selectPastConsultDomain = state => state.pastConsult || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by PastConsult
 */

const makeSelectPastConsult = () =>
  createSelector(
    selectPastConsultDomain,
    substate => substate,
  );

export default makeSelectPastConsult;
export { selectPastConsultDomain };
