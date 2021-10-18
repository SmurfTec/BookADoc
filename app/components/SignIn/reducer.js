/*
 *
 * Login reducer
 *
 */
import produce from 'immer';
import {
  DEFAULT_ACTION,
  SIGN_IN,
  SIGN_IN_FAILED,
  SIGN_IN_SUCCESS,
} from './constants';

export const initialState = {
  user: {},
  errorMsg: '',
};

/* eslint-disable default-case, no-param-reassign */
const loginReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case SIGN_IN:
        draft.loading = true;
        draft.user = action.payload;
        draft.errorMsg = '';
        break;
      case SIGN_IN_SUCCESS:
        draft.loading = false;
        draft.user = action.payload;
        draft.errorMsg = '';
        break;
      case SIGN_IN_FAILED:
        draft.loading = false;
        draft.user = {};
        draft.errorMsg = action.payload;
        break;
      case DEFAULT_ACTION:
        break;
    }
  });

export default loginReducer;
