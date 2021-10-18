/*
 *
 * Settings actions
 *
 */

import {
  DEFAULT_ACTION,
  FETCH_PROFILE_DETAIL,
  FETCH_PROFILE_DETAIL_SUCCESS,
  FETCH_PROFILE_DETAIL_FAILED,
  UPDATE_PROFILE_DETAIL,
  UPDATE_PROFILE_DETAIL_FAILED,
  UPDATE_PROFILE_DETAIL_SUCCESS,
  GET_LANGUAGES,
  GET_LANGUAGES_FAILED,
  GET_LANGUAGES_SUCCESS,
  GET_SPECIALTIES_BY_PROFESSION,
  GET_SPECIALTIES_BY_PROFESSION_SUCCESS,
  GET_SPECIALTIES_BY_PROFESSION_FAILED
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function fetchProfileDetailsAction(toastr) {
  return {
    type: FETCH_PROFILE_DETAIL,
    toastr,
  };
}

export function fetchProfileDetailsSuccessAction(payload) {
  return {
    type: FETCH_PROFILE_DETAIL_SUCCESS,
    payload,
  };
}

export function fetchProfileDetailsFailedAction() {
  return {
    type: FETCH_PROFILE_DETAIL_FAILED,
  };
}

export function updateProfileDetailsAction(payload, toastr) {
  return {
    type: UPDATE_PROFILE_DETAIL,
    payload,
    toastr,
  };
}

export function updateProfileDetailsSuccessAction(payload) {
  return {
    type: UPDATE_PROFILE_DETAIL_SUCCESS,
    payload,
  };
}

export function updateProfileDetailsFailedAction() {
  return {
    type: UPDATE_PROFILE_DETAIL_FAILED,
  };
}

export function getLanguagesAction(toastr) {
  return {
    type: GET_LANGUAGES,
    toastr,
  };
}

export function getLanguagesSuccessAction(payload) {
  return {
    type: GET_LANGUAGES_SUCCESS,
    payload,
  };
}

export function getLanguagesFailedAction() {
  return {
    type: GET_LANGUAGES_FAILED,
  };
}

export function getSpecialtiesAction(toastr) {
  return {
    type: GET_SPECIALTIES_BY_PROFESSION,
    toastr,
  };
}

export function getSpecialtiesSuccessAction(payload) {
  return {
    type: GET_SPECIALTIES_BY_PROFESSION_SUCCESS,
    payload,
  };
}

export function getSpecialtiesFailedAction(payload) {
  return {
    type: GET_SPECIALTIES_BY_PROFESSION_FAILED,
    payload,
  };
}
