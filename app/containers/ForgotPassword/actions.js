/*
 *
 * ForgotPassword actions
 *
 */

import {
  DEFAULT_ACTION,
  FORGOT_PASSWORD_RESET,
  FORGOT_PASSWORD_RESET_SUCCESS,
  FORGOT_PASSWORD_RESET_FAILED,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function forgotPasswordAction(payload, toastr) {
  return {
    type: FORGOT_PASSWORD_RESET,
    payload,
    toastr,
  };
}

export function forgotPasswordSuccessAction(payload) {
  return {
    type: FORGOT_PASSWORD_RESET_SUCCESS,
    payload,
  };
}

export function forgotPasswordFailedAction(payload) {
  return {
    type: FORGOT_PASSWORD_RESET_FAILED,
    payload,
  };
}
