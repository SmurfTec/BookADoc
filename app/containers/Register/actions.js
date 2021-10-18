/*
 *
 * Register actions
 *
 */

import {
  DEFAULT_ACTION,
  REGISTER,
  REGISTER_SUCCESS,
  REGISTER_FAILED,
  SEND_EMAIL,
  SEND_EMAIL_FAILED,
  SEND_EMAIL_SUCCESS,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function registerAction(payload, toastr, sendEmailFun) {
  return {
    type: REGISTER,
    payload,
    toastr,
    sendEmailFun,
  };
}

export function registerSuccessAction(payload) {
  return {
    type: REGISTER_SUCCESS,
    payload,
  };
}

export function registerFailedAction(payload) {
  return {
    type: REGISTER_FAILED,
    payload,
  };
}

export function sendEmailAction(payload, toastr, resetFormFunc) {
  return {
    type: SEND_EMAIL,
    payload,
    toastr,
    resetFormFunc,
  };
}

export function sendEmailSuccessAction(payload) {
  return {
    type: SEND_EMAIL_SUCCESS,
    payload,
  };
}

export function sendEmailFailedAction(payload) {
  return {
    type: SEND_EMAIL_FAILED,
    payload,
  };
}
