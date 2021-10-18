import {
  DEFAULT_ACTION,
  GET_SERVICES,
  GET_SERVICES_SUCCESS,
  GET_SERVICES_FAILED,

  GET_LABS,
  GET_LABS_SUCCESS,
  GET_LABS_FAILED,
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

export function searchLabsAction(payload, toastr) {
  return {
    type: GET_LABS,
    payload,
    toastr,
  };
}

export function searchLabsSuccessAction(payload) {
  return {
    type: GET_LABS_SUCCESS,
    payload,
  };
}

export function searchLabsFailedAction(payload) {
  return {
    type: GET_LABS_FAILED,
    payload,
  };
}
