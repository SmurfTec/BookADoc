/*
 *
 * PatientAppointments actions
 *
 */

import {
  DEFAULT_ACTION,
  GET_PATIENT_APPOINTMENTS,
  GET_PATIENT_APPOINTMENTS_FAILED,
  GET_PATIENT_APPOINTMENTS_SUCCESS,
  UPDATE_LIST_INDEX_SUCCESS,
  UPDATE_LIST_INDEX,
  UPDATE_LIST_INDEX_FAILED,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function getPatientAppointmentsAction(listIndexTemp, toastr) {
  return {
    type: GET_PATIENT_APPOINTMENTS,
    toastr,
    listIndexTemp,
  };
}

export function getPatientAppointmentsSuccessAction(payload) {
  return {
    type: GET_PATIENT_APPOINTMENTS_SUCCESS,
    payload,
  };
}

export function getPatientAppointmentsFailedAction(payload) {
  return {
    type: GET_PATIENT_APPOINTMENTS_FAILED,
    payload,
  };
}

export function updateListIndexAction(toastr) {
  return {
    type: UPDATE_LIST_INDEX,
    toastr,
  };
}

export function updateListIndexSuccessAction() {
  return {
    type: UPDATE_LIST_INDEX_SUCCESS,
  };
}

export function updateListIndexFailedAction() {
  return {
    type: UPDATE_LIST_INDEX_FAILED,
  };
}
