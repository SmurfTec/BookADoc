/*
 *
 * ScheduleTimings reducer
 *
 */
import produce from 'immer';
import {
  DEFAULT_ACTION,
  FETCH_SCHEDULE_TIMING,
  FETCH_SCHEDULE_TIMING_SUCCESS,
  FETCH_SCHEDULE_TIMING_FAILED,
  SAVE_CONSULTATION_TIME,
  SAVE_CONSULTATION_TIME_SUCCESS,
  SAVE_CONSULTATION_TIME_FAILED,
  UPDATE_SINGLE_DAY_TIME_SLOT,
  UPDATE_SINGLE_DAY_TIME_SLOT_SUCCESS,
  UPDATE_SINGLE_DAY_TIME_SLOT_FAILED,
  UPDATE_TIME_SLOTS,
  UPDATE_TIME_SLOTS_SUCCESS,
  UPDATE_TIME_SLOTS_FAILED,
} from './constants';

export const initialState = {
  doctorSchedule: {
    doctorScheduler: [],
  },
};

/* eslint-disable default-case, no-param-reassign */
const scheduleTimingsReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case FETCH_SCHEDULE_TIMING:
        draft.loading = true;
        draft.errorMsg = '';
        break;
      case FETCH_SCHEDULE_TIMING_SUCCESS:
        draft.loading = false;
        draft.doctorSchedule = action.payload;
        break;
      case FETCH_SCHEDULE_TIMING_FAILED:
        draft.loading = false;
        draft.errorMsg = action.payload;
        break;

      case SAVE_CONSULTATION_TIME:
        draft.savingAverageConsultationTime = true;
        draft.errorMsg = '';
        break;
      case SAVE_CONSULTATION_TIME_SUCCESS:
        draft.savingAverageConsultationTime = false;
        draft.doctorSchedule.avergeTimeConsultation = action.payload;
        break;
      case SAVE_CONSULTATION_TIME_FAILED:
        draft.savingAverageConsultationTime = false;
        draft.errorMsg = action.payload;
        break;

      case UPDATE_SINGLE_DAY_TIME_SLOT:
      case UPDATE_TIME_SLOTS:
        draft.saving = true;
        draft.errorMsg = '';
        break;
      case UPDATE_SINGLE_DAY_TIME_SLOT_SUCCESS:
        draft.saving = false;
        const scheduler = (draft.doctorSchedule.doctorScheduler || []);
        const slot =  scheduler.find(s => s.weekDay === action.payload.weekDay);

        if (slot) {
          draft.doctorSchedule.doctorScheduler = scheduler.map(s => {
            if (slot === s) {
              return action.payload;
            }

            return s;
          });
        } else {
          draft.doctorSchedule.doctorScheduler = [...scheduler, action.payload]
            .sort((a, b) => a.weekDay - b.weekDay);
        }
        break;
      case UPDATE_TIME_SLOTS_SUCCESS:
        draft.saving = false;
        draft.doctorSchedule = action.payload.doctorSchedule;
        break;
      case UPDATE_SINGLE_DAY_TIME_SLOT_FAILED:
      case UPDATE_TIME_SLOTS_FAILED:
        draft.saving = false;
        draft.errorMsg = action.payload;
        break;
      case DEFAULT_ACTION:
        break;
    }
  });

export default scheduleTimingsReducer;
