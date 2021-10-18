import { takeLatest, call, put } from 'redux-saga/effects';
import { FORGOT_PASSWORD_RESET } from './constants';
import { push } from 'connected-react-router/immutable';
import { postUtil } from '../../utils/service';

export function* forgotPasswordApi(action) {
  try {
    const url = '/password/forgetPassword';
    const response = yield call(postUtil, url, action.payload);
    if (
      response.data.status === true &&
      response.data.statusCode === 200
    ) {
      yield put(push('password-reset-success'));
      // action.toastr.success('Password reset link is sent to your email');
    } else {
      action.toastr.info(response.data.message);
      // yield put(forgotPasswordFailedAction('Something went wrong! please try again'));
    }
  } catch (err) {
    action.toastr.error('Something went wrong.please try again');
  }
}
// Individual exports for testing
export default function* forgotPasswordSaga() {
  yield takeLatest(FORGOT_PASSWORD_RESET, forgotPasswordApi);
}
