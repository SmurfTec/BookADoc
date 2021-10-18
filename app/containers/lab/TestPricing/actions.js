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

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function getLabServicesAction(payload, toastr) {
  return {
    type: GET_SERVICES,
    payload,
    toastr,
  };
}

export function getLabServicesSuccessAction(payload) {
  return {
    type: GET_SERVICES_SUCCESS,
    payload,
  };
}

export function getLabServicesFailedAction(payload) {
  return {
    type: GET_SERVICES_FAILED,
    payload,
  };
}

export function getLabServiceItemsAction(payload, toastr) {
  return {
    type: GET_SERVICE_ITEMS,
    payload,
    toastr,
  };
}

export function getLabServiceItemsSuccessAction(payload) {
  return {
    type: GET_SERVICE_ITEMS_SUCCESS,
    payload,
  };
}

export function getLabServiceItemsFailedAction(payload) {
  return {
    type: GET_SERVICE_ITEMS_FAILED,
    payload,
  };
}

export function getLabUserServicesAction(payload, toastr) {
  return {
    type: GET_USER_SERVICES,
    payload,
    toastr,
  };
}

export function getLabUserServicesSuccessAction(payload) {
  return {
    type: GET_USER_SERVICES_SUCCESS,
    payload,
  };
}

export function getLabUserServicesFailedAction(payload) {
  return {
    type: GET_USER_SERVICES_FAILED,
    payload,
  };
}

export function saveLabServicesAction(payload, toastr) {
  return {
    type: SAVE_SERVICES,
    payload,
    toastr,
  };
}

export function saveLabServicesSuccessAction(payload) {
  return {
    type: SAVE_SERVICES_SUCCESS,
    payload,
  };
}

export function saveLabServicesFailedAction(payload) {
  return {
    type: SAVE_SERVICES_FAILED,
    payload,
  };
}
