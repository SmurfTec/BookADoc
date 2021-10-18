/*
 *
 * Fee reducer
 *
 */
import produce from 'immer';
import {
  DEFAULT_ACTION,
  UPDATE_FEE_SUCCESS,
  FETCH_FEE_SUCCESS,
} from './constants';

export const initialState = {
  initialConsultationFee: 0,
  reviewConsultationFee: 0,
};

/* eslint-disable default-case, no-param-reassign */
const feeReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case FETCH_FEE_SUCCESS:
        draft.initialConsultationFee = action.payload.consultationFee;
        draft.reviewConsultationFee = action.payload.reviewConsultationFee;
        break;
      case UPDATE_FEE_SUCCESS:
        break;
      case DEFAULT_ACTION:
        break;
    }
  });

export default feeReducer;
