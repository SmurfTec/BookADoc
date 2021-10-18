/*
 *
 * PatientAppointments reducer
 *
 */
import produce from 'immer';
import {
  DEFAULT_ACTION,
  GET_DOCTOR_APPOINTMENTS_SUCCESS,
  UPDATE_LIST_INDEX_SUCCESS,
} from './constants';

export const initialState = {
  appointments: [],
  listIndex: 0,
};

/* eslint-disable default-case, no-param-reassign */
const doctorAppointmentsReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case GET_DOCTOR_APPOINTMENTS_SUCCESS:
        if (draft.listIndex > 0)
          draft.appointments = [...draft.appointments, ...action.payload];
        else draft.appointments = action.payload;
        break;
      case UPDATE_LIST_INDEX_SUCCESS:
        draft.listIndex = parseInt(draft.listIndex) + 1;
        break;
      case DEFAULT_ACTION:
        break;
    }
  });

export default doctorAppointmentsReducer;
