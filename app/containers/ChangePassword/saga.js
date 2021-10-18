import { takeLatest, call, put } from 'redux-saga/effects';
import { CHANGE_PASSWORD } from './constants';
import { postUtil } from '../../utils/service';
import {push} from "connected-react-router/immutable";

export function* changePasswordApi(action) {
  try {
      const url = '/password/changePassword';
    const getUserData = JSON.parse(localStorage.getItem('user'));
      if(getUserData !== null)
      {
        action.payload.email = getUserData.email;
      }
      const response  = yield call(postUtil, url, action.payload);
      if(response.data.status === true && response.data.statusCode === 200)
      {
          action.toastr.success(response.data.message);
          setTimeout(function () {
            localStorage.removeItem('user');
            localStorage.removeItem('token');
            window.location.href = '/';
          }, 3000)
      }else{
          action.toastr.info("Something went wrong");
      }
  } catch (err) {
      action.toastr.error("Something went wrong");
  }
}
// Individual exports for testing
export default function* changePasswordSaga() {
  if (window.localStorage.getItem('user') === null) {
    yield put(push('/'));
  }
  yield takeLatest(CHANGE_PASSWORD, changePasswordApi);
}
