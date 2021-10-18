import { takeLatest, call, put } from 'redux-saga/effects';
import { postUtil } from '../../utils/service';
import { GET_DOCTORS, GET_LANGUAGES } from './constants';
import {
  getLanguagesSuccessAction,
  getLanguagesFailedAction,
  getDoctorsSuccessAction,
  getDoctorsFailedAction,
} from './actions';

export function* getDoctorsApi(action) {
  try {
    const url = '/user/getNearestDoctors';
    const user = JSON.parse(localStorage.getItem('user'));
    const { payload } = action;

    if (user) {
      payload.email = user.email;
    }
    const token = localStorage.getItem('token');
    payload.sessionToken = token || undefined;
    const response = yield call(postUtil, url, payload);
    if (response.data.status === true && response.data.statusCode === 200) {
      yield put(
        getDoctorsSuccessAction(response.data.users, action.shouldRefresh),
      );
    } else {
      yield put(getDoctorsFailedAction(response.data.message));
    }
  } catch (err) {
    yield put(getDoctorsFailedAction('Something went wrong! please try again'));
  }
}

export function* getLanguagesApi() {
  try {
    const url = '/language/getAll';

    const requestParams = {};
    const response = yield call(postUtil, url, requestParams);
    if (response.data.status === true && response.data.statusCode === 200) {
      yield put(getLanguagesSuccessAction(response.data.languages));
    } else {
      yield put(getLanguagesFailedAction(''));
    }
    // }
  } catch (err) {
    yield put(
      getLanguagesFailedAction('Something went wrong! please try again'),
    );
  }
}

// Individual exports for testing
export default function* searchSaga() {
  yield takeLatest(GET_DOCTORS, getDoctorsApi);
  yield takeLatest(GET_LANGUAGES, getLanguagesApi);
}
