/*
 *
 * Search actions
 *
 */

import {
  DEFAULT_ACTION,
  GET_DOCTORS,
  GET_DOCTORS_SUCCESS,
  GET_DOCTORS_FAILED,
  GET_LANGUAGES,
  GET_LANGUAGES_SUCCESS,
  GET_LANGUAGES_FAILED,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function getDoctors(payload, toastr, shouldRefresh) {
  return {
    type: GET_DOCTORS,
    payload,
    toastr,
    shouldRefresh,
  };
}

export function getDoctorsSuccessAction(payload, shouldRefresh) {
  return {
    type: GET_DOCTORS_SUCCESS,
    payload,
    shouldRefresh,
  };
}

export function getDoctorsFailedAction(payload) {
  return {
    type: GET_DOCTORS_FAILED,
    payload,
  };
}

export function getLanguagesAction(toastr) {
  return {
    type: GET_LANGUAGES,
    toastr,
  };
}

export function getLanguagesSuccessAction(payload) {
  return {
    type: GET_LANGUAGES_SUCCESS,
    payload,
  };
}

export function getLanguagesFailedAction() {
  return {
    type: GET_LANGUAGES_FAILED,
  };
}
