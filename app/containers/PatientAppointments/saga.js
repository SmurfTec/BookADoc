import { takeLatest, call, put } from 'redux-saga/effects';
import { postUtil } from '../../utils/service';
import { GET_PATIENT_APPOINTMENTS, UPDATE_LIST_INDEX } from './constants';
import {
  updateListIndexSuccessAction,
  updateListIndexFailedAction,
  getPatientAppointmentsFailedAction,
  getPatientAppointmentsSuccessAction,
} from './actions';

// Get The Appointment List For Doctor Dashboard
export function* getPatientAppointmentsApi(action) {
  try {
  const url = '/appointment/getPatientAppointments';
  const getUserData = JSON.parse(localStorage.getItem('user'));
  if(getUserData !== null) {
    const getToken = localStorage.getItem('token');
    const patientEmail = getUserData.email;
    const sessionToken = getToken;
    const requestParams = {
      patientEmail,
      sessionToken,
      versionCode: '1',
      appType: 'WINDOWS',
      listIndex: action.listIndexTemp,
    };
    const response = yield call(postUtil, url, requestParams);
    // console.log('response', response.data.appointments);
    if (response.data.status === true && response.data.statusCode === 200) {
      yield put(getPatientAppointmentsSuccessAction(response.data.appointments));
    } else {
      yield put(getPatientAppointmentsFailedAction(response.data.message));
    }
  }
   } catch (err) {
    action.toastr.error('Something went wrong while getting Appointments');
    yield put(
      getPatientAppointmentsFailedAction(
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
export default function* patientAppointmentsSaga() {
  yield takeLatest(GET_PATIENT_APPOINTMENTS, getPatientAppointmentsApi);

  yield takeLatest(UPDATE_LIST_INDEX, updateListIndexApi);
}
