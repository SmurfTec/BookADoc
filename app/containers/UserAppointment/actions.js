/*
 *
 * UserAppointments actions
 *
 */

import {
  DEFAULT_ACTION,
  BOOK_APPOINTMENT,
  BOOK_APPOINTMENT_FAILED,
  BOOK_APPOINTMENT_SUCCESS,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function bookAppointmentAction(payload, toastr) {
  return {
    type: BOOK_APPOINTMENT,
    payload,
    toastr,
  };
}

export function bookAppointmentSuccessAction(payload) {
  return {
    type: BOOK_APPOINTMENT_SUCCESS,
    payload,
  };
}

export function bookAppointmentFailedAction(payload) {
  return {
    type: BOOK_APPOINTMENT_FAILED,
    payload,
  };
}
