import { takeLatest, call, put } from 'redux-saga/effects';
import { push } from 'connected-react-router/immutable';
import { postUtil } from '../../utils/service';
import { PATIENT_REGISTER } from './constants';
import { patientRegisterFailedAction } from './actions';
import { signInSuccessAction } from '../Login/actions';

export function* patientRegisterApi(action) {
  try {
    const url = '/user/SignUp';
    const response = yield call(postUtil, url, action.payload);
    if (response.data.status === true && response.data.statusCode === 200) {
      window.localStorage.setItem('token', response.data.sessionToken);
      window.localStorage.setItem('user', JSON.stringify(response.data.user));
      yield put(signInSuccessAction(response.data.user));
      // yield put(push('/'));
      window.location.href = '/';
    } else {
      action.toastr.info(response.data.message);
      yield put(
        patientRegisterFailedAction('Something went wrong! please try again'),
      );
    }
  } catch (err) {
    action.toastr.error('Something went wrong! please try again');
    yield put(
      patientRegisterFailedAction('Something went wrong! please try again'),
    );
  }
}
// Individual exports for testing
export default function* registerSaga() {
  if (window.localStorage.getItem('user') !== null) {
    yield put(push('/'));
  }
  yield takeLatest(PATIENT_REGISTER, patientRegisterApi);
}
