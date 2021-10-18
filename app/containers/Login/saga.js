import { takeLatest, call, put } from 'redux-saga/effects';
import $ from 'jquery';
import { postUtil } from '../../utils/service';
import { SIGN_IN } from './constants';
import { push } from 'connected-react-router/immutable';

import { signInFailedAction, signInSuccessAction } from './actions';
export function* loginApi(action) {
  try {
    const url = '/user/SignIn';
    const response = yield call(postUtil, url, action.payload);
    if (response.data.status === true && response.data.statusCode === 200) {
      window.localStorage.setItem('token', response.data.sessionToken);
      window.localStorage.setItem('user', JSON.stringify(response.data.user));
      yield put(signInSuccessAction(response.data.user));
      // yield put(push('/'));
      window.location.href = '/';
    } else if (
      response.data.status === false &&
      response.data.statusCode === 200 &&
      response.data.message === 'Authentication failed'
    ) {
      yield put(signInFailedAction('User not found'));
    } else if (
      response.data.status === false &&
      response.data.statusCode === 200 &&
      response.data.message === "Incorrect user's password"
    ) {
      yield put(signInFailedAction("Incorrect user's password"));
    } else if (
      response.data.status === false &&
      response.data.statusCode === 200 &&
      response.data.message ===
        'The user is not registered with the type "GPLUS"'
    ) {
      yield put(
        signInFailedAction(response.data.message),
      );
    } else {
      yield put(signInFailedAction(response.data.message));
    }
  } catch (err) {
    yield put(signInFailedAction('Something went wrong! please try again'));
  }
}

// Individual exports for testing
export default function* loginSaga() {
  if (window.localStorage.getItem('user') !== null) {
    yield put(push('/'));
  }
  yield takeLatest(SIGN_IN, loginApi);
}
