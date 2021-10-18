/*
 *
 * UserAppointments reducer
 *
 */
import produce from 'immer';
import { DEFAULT_ACTION, BOOK_APPOINTMENT, BOOK_APPOINTMENT_SUCCESS, BOOK_APPOINTMENT_FAILED } from './constants';

export const initialState = {};

/* eslint-disable default-case, no-param-reassign */
const userAppointmentsReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case BOOK_APPOINTMENT:
        draft.saving = true;
        break;
      case BOOK_APPOINTMENT_SUCCESS:
        draft.saving = false;
        draft.data = action.payload;
        break;
      case BOOK_APPOINTMENT_FAILED:
        draft.saving = false;
        draft.errorMsg = action.payload;
        break;
      case DEFAULT_ACTION:
        break;
    }
  });

export default userAppointmentsReducer;
