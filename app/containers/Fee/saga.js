import { takeLatest, call, put } from 'redux-saga/effects';
import { push } from 'connected-react-router/immutable';
import { FETCH_FEE, UPDATE_FEE } from './constants';
import { postUtil } from '../../utils/service';

import {
  updateFeeSuccessAction,
  updateFeeFailedAction,
  fetchFeeSuccessAction,
  fetchFeeFailedAction,
} from './actions';

export function* fetchFeeApi(action) {
  try {
    // console.log('fetch fee api');
    // const url = '/updateConsultationFee';
    // const response = yield call(getUtil, url);
    // if (response.status === true && response.statusCode === 200) {
    //   yield put(fetchFeeSuccessAction(response.data));
    // } else {
    //   yield put(fetchFeeFailedAction(''));
    // }
    const user = JSON.parse(localStorage.getItem('user'));
    yield put(fetchFeeSuccessAction(user));

  } catch (err) {
    action.toastr.error('Something went wrong');
    yield put(fetchFeeFailedAction('Something went wrong'));
  }
}

export function* updateFeeApi(action) {
  try {
    const url = '/updateConsultationFee';
    const response = yield call(postUtil, url, action.payload);
    // console.log("response", response);
    if (response.data.status === true && response.data.statusCode === 200) {
      const user = JSON.parse(localStorage.getItem('user'));
      user.consultationFee = action.payload.initialConsultationFee;
      user.reviewConsultationFee = action.payload.reviewConsultationFee;
      localStorage['user'] = JSON.stringify(user);

      action.toastr.success(response.data.message);
      yield put(updateFeeSuccessAction(user));
    } else {
      action.toastr.error('Something went wrong');
      yield put(updateFeeFailedAction(''));
    }
  } catch (err) {
    action.toastr.error('Something went wrong');
    yield put(updateFeeFailedAction(''));
  }
}

// Individual exports for testing
export default function* feeSaga() {
  // check if user data not exist then redirect to home
  const user = JSON.parse(window.localStorage.getItem('user'));
  if (user === null || user.role.toLowerCase() !== 'doctor') {
    yield put(push('/'));
  }
  yield takeLatest(FETCH_FEE, fetchFeeApi);
  yield takeLatest(UPDATE_FEE, updateFeeApi);
}
