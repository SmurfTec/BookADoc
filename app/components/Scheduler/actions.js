/*
 *
 * ScheduleTimings actions
 *
 */

import {
  DEFAULT_ACTION,
  FETCH_SCHEDULE_TIMING,
  FETCH_SCHEDULE_TIMING_FAILED,
  FETCH_SCHEDULE_TIMING_SUCCESS,
  SAVE_CONSULTATION_TIME,
  SAVE_CONSULTATION_TIME_SUCCESS,
  SAVE_CONSULTATION_TIME_FAILED,
  UPDATE_TIME_SLOTS,
  UPDATE_TIME_SLOTS_FAILED,
  UPDATE_TIME_SLOTS_SUCCESS,
  UPDATE_SINGLE_DAY_TIME_SLOT_SUCCESS,
  UPDATE_SINGLE_DAY_TIME_SLOT_FAILED,
  UPDATE_SINGLE_DAY_TIME_SLOT,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function fetchScheduleTimingsAction() {
  return {
    type: FETCH_SCHEDULE_TIMING,
  };
}

export function fetchScheduleTimingsSuccessAction(payload) {
  return {
    type: FETCH_SCHEDULE_TIMING_SUCCESS,
    payload,
  };
}

export function fetchScheduleTimingsFailedAction(payload) {
  return {
    type: FETCH_SCHEDULE_TIMING_FAILED,
    payload,
  };
}

export function saveAverageConsultationTimeAction(payload, toastr) {
  return {
    type: SAVE_CONSULTATION_TIME,
    payload,
    toastr,
  };
}

export function saveAverageConsultationTimeSuccessAction(payload) {
  return {
    type: SAVE_CONSULTATION_TIME_SUCCESS,
    payload,
  };
}

export function saveAverageConsultationTimeFailedAction(payload) {
  return {
    type: SAVE_CONSULTATION_TIME_FAILED,
    payload,
  };
}

export function updateTimeSlotsAction(payload, toastr) {
  return {
    type: UPDATE_TIME_SLOTS,
    payload,
    toastr,
  };
}

export function updateTimeSlotsSuccessAction(payload) {
  return {
    type: UPDATE_TIME_SLOTS_SUCCESS,
    payload,
  };
}

export function updateTimeSlotsFailedAction(payload) {
  return {
    type: UPDATE_TIME_SLOTS_FAILED,
    payload,
  };
}

export function updateSingleDayTimeSlotAction(payload, toastr) {
  return {
    type: UPDATE_SINGLE_DAY_TIME_SLOT,
    payload,
    toastr,
  };
}

export function updateSingleDayTimeSlotSuccessAction(payload) {
  return {
    type: UPDATE_SINGLE_DAY_TIME_SLOT_SUCCESS,
    payload,
  };
}

export function updateSingleDayTimeSlotFailedAction(payload) {
  return {
    type: UPDATE_SINGLE_DAY_TIME_SLOT_FAILED,
    payload,
  };
}
