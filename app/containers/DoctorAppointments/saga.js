import { takeLatest, call, put } from 'redux-saga/effects';
import { postUtil } from '../../utils/service';
import { GET_DOCTOR_APPOINTMENTS, UPDATE_LIST_INDEX } from './constants';
import {
  updateListIndexSuccessAction,
  updateListIndexFailedAction,
  getDoctorAppointmentsFailedAction,
  getDoctorAppointmentsSuccessAction,
} from './actions';

// Get The Appointment List For Doctor Dashboard
export function* getDoctorAppointmentsApi(action) {
  try {
  const url = '/appointment/getAppointmentOfPatients';
  const getUserData = JSON.parse(localStorage.getItem('user'));
  if(getUserData !== null) {
    const getToken = localStorage.getItem('token');
    const doctorEmail = getUserData.email;
    const sessionToken = getToken;
    const requestParams = {
      doctorEmail,
      sessionToken,
      versionCode: '1',
      appType: 'WINDOWS',
      listIndex: action.listIndexTemp,
    };
    const response = yield call(postUtil, url, requestParams);
    // console.log('response', response.data.appointments);
    if (response.data.status === true && response.data.statusCode === 200) {
      yield put(getDoctorAppointmentsSuccessAction(response.data.appointments));
    } else {
      yield put(getDoctorAppointmentsFailedAction(response.data.message));
    }
  }
   } catch (err) {
    action.toastr.error('Something went wrong while getting Appointments');
    yield put(
      getDoctorAppointmentsFailedAction(
        'Something went wrong! please try again',
      ),
    );
  }
}

export function* updateListIndexApi() {
  try {
    yield put(updateListIndexSuccessAction());
  } catch (err) {
    yield put(
      updateListIndexFailedAction('Something went wrong! please try again'),
    );
  }
}

// Individual exports for testing
export default function* doctorAppointmentsSaga() {
  yield takeLatest(GET_DOCTOR_APPOINTMENTS, getDoctorAppointmentsApi);

  yield takeLatest(UPDATE_LIST_INDEX, updateListIndexApi);
}
