/*
 *
 * PastConsult actions
 *
 */

import {
  DEFAULT_ACTION,
  FETCH_PAST_CONSULT,
  FETCH_PAST_CONSULT_FAILED,
  FETCH_PAST_CONSULT_SUCCESS,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function fetchPastConsultAction(toastr) {
  return {
    type: FETCH_PAST_CONSULT,
    toastr,
  };
}
export function fetchPastConsultSuccessAction(payload) {
  return {
    type: FETCH_PAST_CONSULT_SUCCESS,
    payload,
  };
}

export function fetchPastConsultFailedAction() {
  return {
    type: FETCH_PAST_CONSULT_FAILED,
  };
}
