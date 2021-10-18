/*
 *
 * Login actions
 *
 */

import {
  DEFAULT_ACTION,
  DOCTOR_SIGN_IN,
  DOCTOR_SIGN_IN_FAILED,
  DOCTOR_SIGN_IN_SUCCESS,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function doctorSignInAction(payload, toastr) {
  return {
    type: DOCTOR_SIGN_IN,
    payload,
    toastr,
  };
}

export function doctorSignInSuccessAction(payload) {
  return {
    type: DOCTOR_SIGN_IN_SUCCESS,
    payload,
  };
}

export function doctorSignInFailedAction(payload) {
  return {
    type: DOCTOR_SIGN_IN_FAILED,
    payload,
  };
}
