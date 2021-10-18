/*
 *
 * Settings reducer
 *
 */
import produce from 'immer';
import {
  DEFAULT_ACTION,
  FETCH_PROFILE_DETAIL_SUCCESS,
  GET_LANGUAGES_SUCCESS,

  GET_SPECIALTIES_BY_PROFESSION,
  GET_SPECIALTIES_BY_PROFESSION_SUCCESS,
  GET_SPECIALTIES_BY_PROFESSION_FAILED,
} from './constants';

export const initialState = {
  profileDetails: {},
  languages: [],
  specialties: [],
};

/* eslint-disable default-case, no-param-reassign */
const settingsReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case FETCH_PROFILE_DETAIL_SUCCESS:
        draft.profileDetails = action.payload;
        break;
      case GET_LANGUAGES_SUCCESS:
        draft.languages = action.payload;
        break;
      case GET_SPECIALTIES_BY_PROFESSION_SUCCESS:
        draft.specialties = action.payload;
        break;
      case DEFAULT_ACTION:
        break;
    }
  });

export default settingsReducer;
