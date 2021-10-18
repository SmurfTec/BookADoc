import { takeLatest, call, put, select } from 'redux-saga/effects';
import { push } from 'connected-react-router/immutable';
import { postUtil, getUtil } from '../../utils/service';
import {
  FETCH_PROFILE_DETAIL,
  UPDATE_PROFILE_DETAIL,
  GET_LANGUAGES,
} from './constants';
import {
  fetchProfileDetailsSuccessAction,
  fetchProfileDetailsFailedAction,
  updateProfileDetailsFailedAction,
  updateProfileDetailsSuccessAction,
  getLanguagesSuccessAction,
  getLanguagesFailedAction,
} from './actions';

export function* fetchProfileDetailApi(action) {
  try {
    // const url = '/profile';
    // const response = yield call(postUtil, url, action.payload);
    // if (response.status === true && response.statusCode === 200) {
    const getUserFromLocal = JSON.parse(localStorage.getItem('user'));
    yield put(fetchProfileDetailsSuccessAction(getUserFromLocal));
    // } else {
    //   yield put(
    //     fetchProfileDetailsFailedAction(
    //       'Something went wrong! please try again',
    //     ),
    //   );
    // }
  } catch (err) {
    action.toastr.success('Something went wrong! please try again');
    yield put(
      fetchProfileDetailsFailedAction('Something went wrong! please try again'),
    );
  }
}

export function* updateProfileDetailApi(action) {
  try {
    const url = '/user/updateUser';
    // making multipart form data
    const formData = new FormData();
    const sessionToken = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));
    //const payload = Object.assign({}, user, { sessionToken });

    formData.append('sessionToken', sessionToken);
    if (action.payload.image) {
      formData.append('file', action.payload.image);
    }
    // formData.append('firstName', action.payload.firstName);
    // formData.append('lastName', action.payload.lastName);
    formData.append('fullName', action.payload.fullName);
    formData.append('gender', action.payload.gender);
    formData.append('email', action.payload.email);

    // if (action.payload.language || user.languages)
    // formData.append(
    //   'languages',
    //   JSON.stringify(action.payload.language ? [{ language: action.payload.language }] : user.languages),
    // );

    const response = yield call(postUtil, url, formData);
    if (response.data.status === true && response.data.statusCode === 200) {
      action.toastr.success(response.data.message);
      localStorage['user'] = JSON.stringify(action.payload);
      yield put(updateProfileDetailsSuccessAction(action.payload));
    } else {
      yield put(updateProfileDetailsFailedAction(response.data.message));
    }
  } catch (err) {
    yield put(
      updateProfileDetailsFailedAction(
        'Something went wrong! please try again',
      ),
    );
  }
}

export function* getLanguagesApi() {
  try {
    const url = '/language/getAll';
    const getUserData = JSON.parse(localStorage.getItem('user'));
    const getToken = localStorage.getItem('token');
    const requestParams = { email: getUserData.email, sessionToken: getToken };
    const response = yield call(postUtil, url, requestParams);
    if (response.data.status === true && response.data.statusCode === 200) {
      yield put(getLanguagesSuccessAction(response.data.languages));
    } else {
      yield put(getLanguagesFailedAction(''));
    }
  } catch (err) {
    yield put(
      getLanguagesFailedAction('Something went wrong! please try again'),
    );
  }
}
// Individual exports for testing
export default function* settingsSaga() {
  // check if user data not exist then redirect to home
  /* if (window.localStorage.getItem('user') === null) {
    yield put(push('/'));
  } */
  yield takeLatest(FETCH_PROFILE_DETAIL, fetchProfileDetailApi);
  yield takeLatest(UPDATE_PROFILE_DETAIL, updateProfileDetailApi);
  yield takeLatest(GET_LANGUAGES, getLanguagesApi);
}
