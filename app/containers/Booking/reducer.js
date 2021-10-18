/*
 *
 * Booking reducer
 *
 */
import produce from 'immer';
import {
  DEFAULT_ACTION,
  BOOK_APPOINTMENT_SUCCESS,
} from './constants';

export const initialState = {
  schedule: {},
};

/* eslint-disable default-case, no-param-reassign */
const bookingReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case BOOK_APPOINTMENT_SUCCESS:
        draft.schedule = action.payload;
        break;
      case DEFAULT_ACTION:
        break;
    }
  });

export default bookingReducer;
