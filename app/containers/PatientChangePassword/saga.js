import { takeLatest, call, put } from 'redux-saga/effects';
import { CHANGE_PASSWORD } from './constants';
import { postUtil } from '../../utils/service';

export function* changePasswordApi(action) {
  try {
      const url = '/password/changePassword';
      const response  = yield call(postUtil, url, action.payload);
      // console.log("response", response);
      if(response.status === true && response.statusCode === 200)
      {
          action.toastr.success(response.message);
      }else{
          action.toastr.info("Something went wrong");
      }
  } catch (err) {
      action.toastr.error("Something went wrong");
  }
}
// Individual exports for testing
export default function* changePasswordSaga() {
  yield takeLatest(CHANGE_PASSWORD, changePasswordApi);
}
