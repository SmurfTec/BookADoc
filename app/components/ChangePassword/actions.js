/*
 *
 * ChangePassword actions
 *
 */

import {
  DEFAULT_ACTION,
  CHANGE_PASSWORD,
  CHANGE_PASSWORD_SUCCESS,
  CHANGE_PASSWORD_FAILED,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}
export function changePasswordAction(payload, toastr, resetFormFunc) {
  return {
    type: CHANGE_PASSWORD,
    payload,
    toastr,
    resetFormFunc,
  };
}

export function changePasswordSuccessAction(payload) {
  return {
    type: CHANGE_PASSWORD_SUCCESS,
    payload,
  };
}

export function changePasswordFailedAction(payload) {
  return {
    type: CHANGE_PASSWORD_FAILED,
    payload,
  };
}
