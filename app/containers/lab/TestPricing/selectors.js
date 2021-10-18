import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectLabTestPricingDomain = state =>
  state.labTestPricing || initialState;

const makeSelectLabTestPricing = () =>
  createSelector(
    selectLabTestPricingDomain,
    subState => subState,
  );

export default makeSelectLabTestPricing;

export { selectLabTestPricingDomain };
