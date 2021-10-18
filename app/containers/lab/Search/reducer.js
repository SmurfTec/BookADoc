import produce from 'immer';

import {
  DEFAULT_ACTION,
  GET_SERVICES,
  GET_SERVICES_SUCCESS,
  GET_SERVICES_FAILED,
  GET_LABS,
  GET_LABS_SUCCESS,
  GET_LABS_FAILED,
} from './constants';

export const initialState = {
  servicesLoading: false,
  services: [],
  searching: false,
  labs: {},
  error: null,
};

const labSearchReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case GET_SERVICES:
        draft.servicesLoading = true;
        break;
      case GET_SERVICES_SUCCESS:
        draft.servicesLoading = false;
        draft.services = action.payload;
        draft.error = null;
        break;
      case GET_SERVICES_FAILED:
        draft.servicesLoading = false;
        draft.error = action.payload;
        break;
      case GET_LABS:
        draft.searching = true;
        break;
      case GET_LABS_SUCCESS:
        draft.searching = false;
        draft.labs = action.payload;
        draft.error = null;
        break;
      case GET_LABS_FAILED:
        draft.searching = false;
        draft.error = action.payload;
        break;
      case DEFAULT_ACTION:
        break;
      default:
        break;
    }
  });

export default labSearchReducer;
