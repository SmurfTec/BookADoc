/*
 *
 * Login reducer
 *
 */
import produce from 'immer';
import { DEFAULT_ACTION, DOCTOR_SIGN_IN_SUCCESS, DOCTOR_SIGN_IN_FAILED } from './constants';

export const initialState = {
  user: {},
  errorMsg: '',
};

/* eslint-disable default-case, no-param-reassign */
const doctorLoginReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case DOCTOR_SIGN_IN_SUCCESS:
        draft.user = action.payload;
        draft.errorMsg = '';
        break;
      case DOCTOR_SIGN_IN_FAILED:
        draft.user = {};
        draft.errorMsg = action.payload;
        break;
      case DEFAULT_ACTION:
        break;
    }
  });

export default doctorLoginReducer;
