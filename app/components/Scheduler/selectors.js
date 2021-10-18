import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the scheduleTimings state domain
 */

const selectScheduleTimingsDomain = state =>
  state.scheduleTimings || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by ScheduleTimings
 */

const makeSelectScheduleTimings = () =>
  createSelector(
    selectScheduleTimingsDomain,
    substate => substate,
  );

export default makeSelectScheduleTimings;
export { selectScheduleTimingsDomain };
