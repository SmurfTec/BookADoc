import { takeLatest, call, put } from 'redux-saga/effects';
import { CHANGE_PASSWORD } from './constants';
import { postUtil } from '../../utils/service';
import {push} from "connected-react-router/immutable";
import {
  changePasswordSuccessAction,
  changePasswordFailedAction
} from './actions';

export function* changePasswordApi(action) {
  try {
    const url = '/password/changePassword';
    const user = JSON.parse(localStorage.getItem('user'));
    const sessionToken = localStorage.getItem('token');
    const payload = {
      ...action.payload,
      sessionToken,
      email: user.email,
    };

    const response = yield call(postUtil, url, payload);
    if(response.data.status === true && response.data.statusCode === 200) {
      action.resetFormFunc();
      action.toastr.success(response.data.message);
      yield put(changePasswordSuccessAction(response.data));

      // setTimeout(function () {
      //   localStorage.removeItem('user');
      //   localStorage.removeItem('token');
      //   window.location.href = '/';
      // }, 3000)
    } else {
      action.toastr.info('Something went wrong');
      yield put(changePasswordFailedAction(response.data.message));
    }
  } catch (err) {
    action.toastr.info('Something went wrong');
    yield put(changePasswordFailedAction(response.data.message));
  }
}
// Individual exports for testing
export default function* changePasswordSaga() {
  if (window.localStorage.getItem('user') === null) {
    yield put(push('/'));
  }
  yield takeLatest(CHANGE_PASSWORD, changePasswordApi);
}
