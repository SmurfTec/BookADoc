import { takeLatest, call, put } from 'redux-saga/effects';
import { push } from 'connected-react-router/immutable';
import { postUtil } from '../../utils/service';
import { DOCTOR_SIGN_IN } from './constants';

import { doctorSignInSuccessAction, doctorSignInFailedAction } from './actions';
export function* doctorLoginApi(action) {
  try {
    const url = '/user/SignIn';
    const response = yield call(postUtil, url, action.payload);
    if (response.data.status === true && response.data.statusCode === 200) {
      window.localStorage.setItem('token', response.data.sessionToken);
      window.localStorage.setItem('user', JSON.stringify(response.data.user));
      yield put(doctorSignInSuccessAction(response.data.user));
      // yield put(push('/'));
      window.location.href = '/dashboard';
    } else if (
      response.data.status === false &&
      response.data.statusCode === 200 &&
      response.data.message === 'Authentication failed'
    ) {
      yield put(doctorSignInFailedAction('User not found'));
    } else if (
      response.data.status === false &&
      response.data.statusCode === 200 &&
      response.data.message === "Incorrect user's password"
    ) {
      yield put(doctorSignInFailedAction("Incorrect user's password"));
    } else if (
      response.data.status === false &&
      response.data.statusCode === 200 &&
      response.data.message ===
        'The user is not registered with the type "GPLUS"'
    ) {
      yield put(
        doctorSignInFailedAction(
          'The user is not registered with the type GPLUS',
        ),
      );
    } else {
      yield put(doctorSignInFailedAction(response.data.message));
    }
  } catch (err) {
    yield put(
      doctorSignInFailedAction('Something went wrong! please try again'),
    );
  }
}

// Individual exports for testing
export default function* loginSaga() {
  if (window.localStorage.getItem('user') !== null) {
    yield put(push('/'));
  }
  yield takeLatest(DOCTOR_SIGN_IN, doctorLoginApi);
}
