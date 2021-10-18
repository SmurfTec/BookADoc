/*
 *
 * PastConsult reducer
 *
 */
import produce from 'immer';
import {
  DEFAULT_ACTION,
  FETCH_PAST_CONSULT_SUCCESS,
  FETCH_PAST_CONSULT_FAILED,
} from './constants';

export const initialState = {
  oldConsults: [],
  listIndex: 0,
};

/* eslint-disable default-case, no-param-reassign */
const pastConsultReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case FETCH_PAST_CONSULT_SUCCESS:
        draft.oldConsults = action.payload;
        draft.listIndex += 1;
        break;
      case FETCH_PAST_CONSULT_FAILED:
        draft.oldConsults = [];
        draft.listIndex = 0;
        break;
      case DEFAULT_ACTION:
        break;
    }
  });

export default pastConsultReducer;
