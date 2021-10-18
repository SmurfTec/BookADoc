import { takeLatest, call, put } from 'redux-saga/effects';
import { getUtil, postUtil } from '../../../utils/service';
import { GET_SERVICES, GET_LABS } from './constants';
import {
  getLabServicesSuccessAction,
  getLabServicesFailedAction,
  searchLabsSuccessAction,
  searchLabsFailedAction,
} from './actions';

export function* fetchLabServicesApi(action) {
  try {
    const response = yield call(getUtil, '/admin/service/getByProfession/LAB');
    yield put(getLabServicesSuccessAction(response.data));
  } catch (error) {
    const message = 'Something went wrong. Please try again.';
    action.toastr.error(message);
    yield put(getLabServicesFailedAction(message));
  }
}

export function* searchLabsApi(action) {
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
        searchLabsSuccessAction(response.data.users, action.shouldRefresh),
      );
    } else {
      yield put(searchLabsFailedAction(response.data.message));
    }
  } catch (err) {
    yield put(searchLabsFailedAction('Something went wrong! please try again'));
  }
}

export default function* LabTestPricingSaga() {
  yield takeLatest(GET_SERVICES, fetchLabServicesApi);
  yield takeLatest(GET_LABS, searchLabsApi);
}
