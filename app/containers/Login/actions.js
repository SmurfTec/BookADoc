/*
 *
 * Login actions
 *
 */

import { DEFAULT_ACTION, SIGN_IN, SIGN_IN_SUCCESS, SIGN_IN_FAILED } from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function signInAction(payload, toastr) {
  return {
    type: SIGN_IN,
    payload,
    toastr,
  };
}

export function signInSuccessAction(payload) {
  return {
    type: SIGN_IN_SUCCESS,
    payload,
  };
}

export function signInFailedAction(payload) {
  return {
    type: SIGN_IN_FAILED,
    payload,
  };
}
