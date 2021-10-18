/*
 *
 * ChangePassword reducer
 *
 */
import produce from 'immer';
import {
  DEFAULT_ACTION,
  CHANGE_PASSWORD,
  CHANGE_PASSWORD_SUCCESS,
  CHANGE_PASSWORD_FAILED,
} from './constants';

export const initialState = {};

/* eslint-disable default-case, no-param-reassign */
const changePasswordReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case CHANGE_PASSWORD:
        draft.isLoading = true;
        break;
      case CHANGE_PASSWORD_SUCCESS:
        draft.isLoading = false;
        break;
      case CHANGE_PASSWORD_FAILED:
        draft.isLoading = false;
        break;
      case DEFAULT_ACTION:
        break;
    }
  });

export default changePasswordReducer;
