/*
 *
 * Fee actions
 *
 */

import {
  DEFAULT_ACTION,
  FETCH_FEE,
  FETCH_FEE_SUCCESS,
  FETCH_FEE_FAILED,
  UPDATE_FEE,
  UPDATE_FEE_SUCCESS,
  UPDATE_FEE_FAILED,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function fetchFeeAction(toastr) {
  return {
    type: FETCH_FEE,
    toastr,
  };
}

export function fetchFeeSuccessAction(payload) {
  return {
    type: FETCH_FEE_SUCCESS,
    payload,
  };
}

export function fetchFeeFailedAction(payload) {
  return {
    type: FETCH_FEE_FAILED,
    payload,
  };
}

export function updateFeeAction(payload, toastr) {
  return {
    type: UPDATE_FEE,
    payload,
    toastr,
  };
}

export function updateFeeSuccessAction(payload) {
  return {
    type: UPDATE_FEE_SUCCESS,
    payload,
  };
}

export function updateFeeFailedAction(payload) {
  return {
    type: UPDATE_FEE_FAILED,
    payload,
  };
}
