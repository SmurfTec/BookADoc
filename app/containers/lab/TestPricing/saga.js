import { takeLatest, call, put } from 'redux-saga/effects';
import { getUtil, postUtil } from '../../../utils/service';
import {
  GET_SERVICES,
  GET_SERVICE_ITEMS,
  GET_USER_SERVICES,
  SAVE_SERVICES,
} from './constants';
import {
  getLabServicesSuccessAction,
  getLabServicesFailedAction,
  getLabServiceItemsSuccessAction,
  getLabServiceItemsFailedAction,
  saveLabServicesSuccessAction,
  saveLabServicesFailedAction,
  getLabUserServicesSuccessAction,
  getLabUserServicesFailedAction,
} from './actions';

export function* fetchLabServicesApi(action) {
  try {
    const response = yield call(getUtil, '/admin/service/getServiceGroup');
    yield put(getLabServicesSuccessAction(response.data));
  } catch (error) {
    console.error(error);
    const message = 'Something went wrong. Please try again.';
    action.toastr.error(message);
    yield put(getLabServicesFailedAction(message));
  }
}

export function* fetchLabServiceItemsApi(action) {
  try {
    const response = yield call(
      getUtil,
      `/admin/service/getByGroupName/${action.payload}`,
    );
    yield put(getLabServiceItemsSuccessAction(response.data));
  } catch (error) {
    console.error(error);
    const message = 'Something went wrong. Please try again.';
    action.toastr.error(message);
    yield put(getLabServiceItemsFailedAction(message));
  }
}

export function* fetchUserLabServicesApi(action) {
  try {
    const user = JSON.parse(localStorage.getItem('user'));
    const response = yield call(
      getUtil,
      `/user/service/getServiceList/${user.userId}`,
    );
    yield put(getLabUserServicesSuccessAction(response.data));
  } catch (error) {
    console.error(error);
    const message = 'Something went wrong. Please try again.';
    action.toastr.error(message);
    yield put(getLabUserServicesFailedAction(message));
  }
}

export function* saveLabServicesApi(action) {
  try {
    const user = JSON.parse(localStorage.getItem('user'));
    const response = yield call(
      postUtil,
      `/user/service/updateServiceList/${user.userId}`,
      action.payload,
    );

    if (response.data.status) {
      action.toastr.success(response.data.message);
      yield put(saveLabServicesSuccessAction(response.data));
    } else {
      const message = 'Something went wrong. Please try again.';
      action.toastr.error(message);
      yield put(saveLabServicesFailedAction(message));
    }
  } catch (error) {
    console.error(error);
    const message = 'Something went wrong. Please try again.';
    action.toastr.error(message);
    yield put(saveLabServicesFailedAction(message));
  }
}

export default function* LabTestPricingSaga() {
  yield takeLatest(GET_SERVICES, fetchLabServicesApi);
  yield takeLatest(GET_SERVICE_ITEMS, fetchLabServiceItemsApi);
  yield takeLatest(GET_USER_SERVICES, fetchUserLabServicesApi);
  yield takeLatest(SAVE_SERVICES, saveLabServicesApi);
}
