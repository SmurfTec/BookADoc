import produce from 'immer';

import {
  DEFAULT_ACTION,
  GET_SERVICES,
  GET_SERVICES_SUCCESS,
  GET_SERVICES_FAILED,
  GET_SERVICE_ITEMS,
  GET_SERVICE_ITEMS_SUCCESS,
  GET_SERVICE_ITEMS_FAILED,
  GET_USER_SERVICES,
  GET_USER_SERVICES_SUCCESS,
  GET_USER_SERVICES_FAILED,
  SAVE_SERVICES,
  SAVE_SERVICES_SUCCESS,
  SAVE_SERVICES_FAILED,
} from './constants';

export const initialState = {
  groupLoading: false,
  serviceLoading: false,
  userServiceLoading: false,
  saving: false,
  groups: [],
  services: [],
  userServices: [],
  error: null,
};

const labTestingReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case GET_SERVICES:
        draft.groupLoading = true;
        break;
      case GET_SERVICES_SUCCESS:
        draft.groupLoading = false;
        draft.groups = action.payload;
        draft.error = null;
        break;
      case GET_SERVICES_FAILED:
        draft.groupLoading = false;
        draft.error = action.payload;
        break;
      case GET_SERVICE_ITEMS:
        draft.serviceLoading = true;
        break;
      case GET_SERVICE_ITEMS_SUCCESS:
        draft.serviceLoading = false;
        draft.services = action.payload;
        draft.error = null;
        break;
      case GET_SERVICE_ITEMS_FAILED:
        draft.serviceLoading = false;
        draft.error = action.payload;
        break;
      case GET_USER_SERVICES:
        draft.userServiceLoading = true;
        break;
      case GET_USER_SERVICES_SUCCESS:
        draft.userServiceLoading = false;
        draft.userServices = action.payload;
        draft.error = null;
        break;
      case GET_USER_SERVICES_FAILED:
        draft.userServiceLoading = false;
        draft.error = action.payload;
        break;
      case SAVE_SERVICES:
        draft.saving = true;
        break;
      case SAVE_SERVICES_SUCCESS:
        draft.saving = false;
        draft.error = null;
        break;
      case SAVE_SERVICES_FAILED:
        draft.saving = false;
        draft.error = action.payload;
        break;
      case DEFAULT_ACTION:
        break;
      default:
        break;
    }
  });

export default labTestingReducer;
