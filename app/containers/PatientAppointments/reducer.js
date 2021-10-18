/*
 *
 * PatientAppointments reducer
 *
 */
import produce from 'immer';
import {
  DEFAULT_ACTION,
  GET_PATIENT_APPOINTMENTS,
  GET_PATIENT_APPOINTMENTS_SUCCESS,
  GET_PATIENT_APPOINTMENTS_FAILED,
  UPDATE_LIST_INDEX_SUCCESS,
} from './constants';

export const initialState = {
  appointments: {
    appointment: [],
  },
  listIndex: 0,
};

/* eslint-disable default-case, no-param-reassign */
const patientAppointmentsReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case GET_PATIENT_APPOINTMENTS:
        draft.loading = true;
        break;
      case GET_PATIENT_APPOINTMENTS_SUCCESS:
        draft.loading = false;
        if (draft.listIndex > 0)
          draft.appointments = draft.appointments.concat(action.payload);
        else draft.appointments = action.payload;
        break;
      case GET_PATIENT_APPOINTMENTS_FAILED:
        draft.loading = false;
        draft.errorMsg = action.payload;
        break;
      case UPDATE_LIST_INDEX_SUCCESS:
        draft.listIndex = parseInt(draft.listIndex) + 1;
        break;
      case DEFAULT_ACTION:
        break;
    }
  });

export default patientAppointmentsReducer;
