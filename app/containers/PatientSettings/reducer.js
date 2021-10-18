/*
 *
 * Settings reducer
 *
 */
import produce from 'immer';
import {
  DEFAULT_ACTION,
  FETCH_PROFILE_DETAIL_SUCCESS,
  UPDATE_PROFILE_DETAIL_SUCCESS,
  GET_LANGUAGES_SUCCESS,
} from './constants';

export const initialState = {
  profileDetails: {},
  languages: [],
};

/* eslint-disable default-case, no-param-reassign */
const settingsReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case FETCH_PROFILE_DETAIL_SUCCESS:
      case UPDATE_PROFILE_DETAIL_SUCCESS:
        draft.profileDetails = action.payload;
        break;
      case GET_LANGUAGES_SUCCESS:
        draft.languages = action.payload;
        break;
      case DEFAULT_ACTION:
        break;
    }
  });

export default settingsReducer;
