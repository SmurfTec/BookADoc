import { takeLatest, call, put, select } from 'redux-saga/effects';
import { push } from 'connected-react-router/immutable';
import { postUtil } from '../../utils/service';
import {
  FETCH_SCHEDULE_TIMING,
  SAVE_CONSULTATION_TIME,
  UPDATE_TIME_SLOTS,
  UPDATE_SINGLE_DAY_TIME_SLOT
} from './constants';
import {
  fetchScheduleTimingsSuccessAction,
  fetchScheduleTimingsFailedAction,
  saveAverageConsultationTimeSuccessAction,
  saveAverageConsultationTimeFailedAction,
  updateSingleDayTimeSlotSuccessAction,
  updateSingleDayTimeSlotFailedAction
} from './actions';

export function* fetchScheduleTimingAPI() {
  try {
    const getUserData = JSON.parse(localStorage.getItem('user'));
    const getToken = localStorage.getItem('token');
    const data = {
      doctorEmail: getUserData.email,
      sessionToken: getToken,
    };

    const url = '/schedule/getSchedule';
    const response = yield call(postUtil, url, data);
    if (response.data.status === true && response.data.statusCode === 200) {
      let { doctorSchedule } = response.data;
      if (!doctorSchedule) {
        doctorSchedule = { doctorScheduler: []};
      }
      yield put(fetchScheduleTimingsSuccessAction(doctorSchedule));
    } else {
      yield put(fetchScheduleTimingsFailedAction(response.data.message));
    }
  } catch (err) {
    yield put(
      fetchScheduleTimingsFailedAction('Something went wrong! please try again'),
    );
  }
}

export function* saveAverageConsultationTimeAPI(action) {
  try {
    const user = JSON.parse(localStorage.getItem('user'));
    const sessionToken = localStorage.getItem('token');
    const data = {
      doctorEmail: user.email,
      sessionToken,
      averageTimeConsultation: action.payload,
    };

    const url = '/schedule/updateAverageTimeConsultation';
    const response = yield call(postUtil, url, data);
    if (response.data.status === true && response.data.statusCode === 200) {
      yield put(saveAverageConsultationTimeSuccessAction(action.payload));
      action.toastr.success("Average time for consultation saved successfully");
    } else {
      yield put(saveAverageConsultationTimeFailedAction(response.data.message));
      action.toastr.error(response.data.message);
    }
  } catch (err) {
    yield put(
      saveAverageConsultationTimeFailedAction('Something went wrong! please try again'),
    );
    action.toastr.error('Something went wrong! please try again');
  }
}

export function* saveOneDayTimingAPI(action) {
  try {
    const user = JSON.parse(localStorage.getItem('user'));
    const sessionToken = localStorage.getItem('token');
    const data = {
      doctorEmail: user.email,
      sessionToken,
      applyToOtherDay: false,
      schedule: action.payload,
    };

    const url = '/schedule/insertOneDay';
    const response = yield call(postUtil, url, data);
    if (response.data.status === true && response.data.statusCode === 200) {
      yield put(updateSingleDayTimeSlotSuccessAction(action.payload));
      action.toastr.success("Schedule saved successfully");
    } else {
      yield put(updateSingleDayTimeSlotFailedAction(response.data.message));
      action.toastr.error(response.data.message);
    }
  } catch (err) {
    yield put(
      updateSingleDayTimeSlotFailedAction('Something went wrong! please try again'),
    );
    action.toastr.error('Something went wrong! please try again');
  }
}

export function* saveMultiDayTimingAPI(action) {
  try {
    const user = JSON.parse(localStorage.getItem('user'));
    const sessionToken = localStorage.getItem('token');
    const data = {
      doctorEmail: user.email,
      sessionToken,
      applyToOtherDay: false,
      schedule: action.payload,
    };

    const url = '/schedule/storeSchedule';
    const response = yield call(postUtil, url, data);
    if (response.data.status === true && response.data.statusCode === 200) {
      yield put(updateSingleDayTimeSlotSuccessAction(action.payload));
      action.toastr.success("Schedule saved successfully");
    } else {
      yield put(updateSingleDayTimeSlotFailedAction(response.data.message));
      action.toastr.error(response.data.message);
    }
  } catch (err) {
    yield put(
      updateSingleDayTimeSlotFailedAction('Something went wrong! please try again'),
    );
    action.toastr.error('Something went wrong! please try again');
  }
}

// Individual exports for testing
export default function* scheduleTimingsSaga() {
  // redirect if the user role is not doctor
  const user = JSON.parse(window.localStorage.getItem('user'));
  if (user === null || user.role.toLowerCase() !== 'doctor') {
    yield put(push('/'));
  }

  yield takeLatest(FETCH_SCHEDULE_TIMING, fetchScheduleTimingAPI);
  yield takeLatest(SAVE_CONSULTATION_TIME, saveAverageConsultationTimeAPI);
  yield takeLatest(UPDATE_SINGLE_DAY_TIME_SLOT, saveOneDayTimingAPI);
  yield takeLatest(UPDATE_TIME_SLOTS, saveMultiDayTimingAPI);
}
