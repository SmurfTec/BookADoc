/*
 *
 * Register actions
 *
 */

import {
  DEFAULT_ACTION,
  PATIENT_REGISTER,
  PATIENT_REGISTER_FAILED,
  PATIENT_REGISTER_SUCCESS,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function patientRegisterAction(payload, toastr) {
  return {
    type: PATIENT_REGISTER,
    payload,
    toastr,
  };
}

export function patientRegisterSuccessAction(payload) {
  return {
    type: PATIENT_REGISTER_SUCCESS,
    payload,
  };
}

export function patientRegisterFailedAction(payload) {
  return {
    type: PATIENT_REGISTER_FAILED,
    payload,
  };
}
