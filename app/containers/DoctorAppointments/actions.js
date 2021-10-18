/*
 *
 * DoctorAppointments actions
 *
 */

import {
  DEFAULT_ACTION,
  GET_DOCTOR_APPOINTMENTS,
  GET_DOCTOR_APPOINTMENTS_FAILED,
  GET_DOCTOR_APPOINTMENTS_SUCCESS,
  UPDATE_LIST_INDEX_SUCCESS,
  UPDATE_LIST_INDEX,
  UPDATE_LIST_INDEX_FAILED,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function getDoctorAppointmentsAction(listIndexTemp, toastr) {
  return {
    type: GET_DOCTOR_APPOINTMENTS,
    toastr,
    listIndexTemp,
  };
}

export function getDoctorAppointmentsSuccessAction(payload) {
  return {
    type: GET_DOCTOR_APPOINTMENTS_SUCCESS,
    payload,
  };
}

export function getDoctorAppointmentsFailedAction(payload) {
  return {
    type: GET_DOCTOR_APPOINTMENTS_FAILED,
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
