import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the settings state domain
 */

const selectSettingsDomain = state => state.settings || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by Settings
 */

const makeSelectSettings = () =>
  createSelector(
    selectSettingsDomain,
    substate => substate,
  );

export default makeSelectSettings;
export { selectSettingsDomain };
