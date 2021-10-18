import { takeLatest, call, put } from 'redux-saga/effects';
import { push } from 'connected-react-router/immutable';
import { postUtil } from '../../utils/service';
import { REGISTER, SEND_EMAIL } from './constants';
import { registerFailedAction, sendEmailFailedAction } from './actions';
import { doctorSignInSuccessAction } from '../DoctorLogin/actions';

export function* registerApi(action) {
  try {
    const url = '/user/SignUp';
    const response = yield call(postUtil, url, action.payload);
    if (response.data.status === true && response.data.statusCode === 200) {
      window.localStorage.setItem('token', response.data.sessionToken);
      window.localStorage.setItem('user', JSON.stringify(response.data.user));
      yield put(doctorSignInSuccessAction(response.data.user));
      action.sendEmailFun();
      // window.location.href = '/';
    } else {
      action.toastr.info('Something went wrong! please try again');
      yield put(registerFailedAction('Something went wrong! please try again'));
    }
  } catch (err) {
    action.toastr.error('Something went wrong! please try again');
    yield put(registerFailedAction('Something went wrong! please try again'));
  }
}

export function* sendEmailApi(action) {
  try {
    const url = 'https://bookadoc.online/healthafriqure_emails.php';
    const response = yield call(postUtil, url, action.payload);
    if (
      response.data.status === 'Success' &&
      response.data.statusCode === 200
    ) {
      // yield put(sendEmailSuccessAction(response.data.user));
      // window.location.href = '/';
      action.toastr.success(
        'Thanks for signing up. We shall notify you once your account is verified.',
      );
      action.resetFormFunc();
    } else {
      action.toastr.info('Something went wrong! please try again');
      yield put(
        sendEmailFailedAction('Something went wrong! please try again'),
      );
    }
  } catch (err) {
    action.toastr.error('Something went wrong! please try again');
    yield put(sendEmailFailedAction('Something went wrong! please try again'));
  }
}
// Individual exports for testing
export default function* registerSaga() {
  if (window.localStorage.getItem('user') !== null) {
    yield put(push('/'));
  }
  yield takeLatest(REGISTER, registerApi);
  yield takeLatest(SEND_EMAIL, sendEmailApi);
}
