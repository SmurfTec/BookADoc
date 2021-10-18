import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectLabSearchDomain = state => state.labSearch || initialState;

const makeSelectLabSearch = () =>
  createSelector(
    selectLabSearchDomain,
    subState => subState,
  );

export default makeSelectLabSearch;

export { selectLabSearchDomain };
