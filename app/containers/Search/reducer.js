/*
 *
 * Search reducer
 *
 */
import produce from 'immer';
import {
  DEFAULT_ACTION,
  GET_LANGUAGES,
  GET_LANGUAGES_FAILED,
  GET_LANGUAGES_SUCCESS,
  GET_DOCTORS,
  GET_DOCTORS_FAILED,
  GET_DOCTORS_SUCCESS,
} from './constants';

export const initialState = {
  users: [],
  languages: [],
  categories: [],
  latitude: '31.5565955',
  longitude: '74.310029',
  listIndex: 0,
};

/* eslint-disable default-case, no-param-reassign */
const searchReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case GET_DOCTORS:
        draft.loading = true;
        draft.errorMsg = '';
        break;
      case GET_DOCTORS_SUCCESS:
        draft.loading = false;
        draft.users = action.payload;
        break;
      case GET_DOCTORS_FAILED:
        draft.loading = false;
        draft.errorMsg = action.payload;
        break;
      case GET_LANGUAGES:
        draft.loadingLanguage = true;
        break;
      case GET_LANGUAGES_SUCCESS:
        draft.loadingLanguage = false;
        draft.languages = action.payload;
        break;
      case GET_LANGUAGES_FAILED:
        draft.loadingLanguage = false;
        draft.errorMsg = action.payload;
        break;
      case DEFAULT_ACTION:
        break;
    }
  });

export default searchReducer;
