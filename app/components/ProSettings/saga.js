import { takeLatest, call, put } from 'redux-saga/effects';
import { push } from 'connected-react-router/immutable';
import { getUtil, postUtil, postUtilMultipart } from '../../utils/service';
import {
  FETCH_PROFILE_DETAIL,
  UPDATE_PROFILE_DETAIL,
  GET_LANGUAGES,
  GET_SPECIALTIES_BY_PROFESSION,
} from './constants';
import {
  fetchProfileDetailsSuccessAction,
  fetchProfileDetailsFailedAction,
  updateProfileDetailsFailedAction,
  updateProfileDetailsSuccessAction,
  getLanguagesSuccessAction,
  getLanguagesFailedAction,
  getSpecialtiesSuccessAction,
  getSpecialtiesFailedAction,
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
    action.toastr.error('Something went wrong! please try again');
    yield put(
      fetchProfileDetailsFailedAction('Something went wrong! please try again'),
    );
  }
}

export function* updateProfileDetailApi(action) {
  try {
    // making multipart form data
    const getToken = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));

    const formData = new FormData();

    let passed = true;

    // if (action.payload.image) {
    //   const url = `/user/uploadImage?userId=${user.userId}&uploadType=PROFILE`;
    //   const payload = new FormData();
    //   payload.append('sessionToken', getToken);
    //   payload.append('email', user.email);
    //   payload.append('file', action.payload.image);
    //   const response = yield call(postUtilMultipart, url, payload);
    //   if (response.data.status === true && response.data.statusCode === 200) {
    //     formData.append('imageUrl', response.data.imagePath);
    //   } else {
    //     passed = false;
    //     yield put(updateProfileDetailsFailedAction(response.data.message));
    //     action.toastr.error(response.data.message);
    //   }
    // }

    if (passed) {
      const url = '/user/updateUser';
      if (action.payload.image) {
        formData.append('file', action.payload.image);
      }

      formData.append('sessionToken', getToken);
      formData.append('email', action.payload.email);
      formData.append('fullName', action.payload.fullName);
      formData.append('mobile', action.payload.mobile);
      formData.append('specialties', JSON.stringify(action.payload.specialties.map(s => ({specialty: s.name}))));
      formData.append('gender', action.payload.gender);
      formData.append('languages', JSON.stringify(action.payload.languages));
      formData.append('locationName', action.payload.locationName);
      formData.append('moreLocationDetails', action.payload.locationName);
      formData.append('latitude', action.payload.latitude);
      formData.append('longitude', action.payload.longitude);

      const response = yield call(postUtil, url, formData);
      if (response.data.status === true && response.data.statusCode === 200) {
        action.toastr.success(response.data.message);

        const data = { ...action.payload };
        if (response.data.path) {
          data.imageUrl = response.data.path;
        }
        Object.assign(user, data);
        localStorage['user'] = JSON.stringify(user);

        yield put(updateProfileDetailsSuccessAction(user));
      } else {
        yield put(updateProfileDetailsFailedAction(response.data.message));
        action.toastr.error(response.data.message);
      }
    }
  } catch (err) {
    yield put(
      updateProfileDetailsFailedAction(
        'Something went wrong! please try again',
      ),
    );
    action.toastr.error('Something went wrong! please try again');
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

export function* getSpecialtiesApi() {
  try {
    const user = JSON.parse(localStorage.getItem('user'));
    const sessionToken = localStorage.getItem('token');
    const url = `/admin/category/getByProfession/${user.role}`;
    const requestParams = { email: user.email, sessionToken, role: user.role };
    const response = yield call(getUtil, url, requestParams);
    if (response.status === 200) {
      yield put(getSpecialtiesSuccessAction(response.data));
    } else {
      yield put(getSpecialtiesFailedAction(response.data.message));
    }
  } catch (err) {
    yield put(
      getSpecialtiesFailedAction('Something went wrong! please try again'),
    );
  }
}

// Individual exports for testing
export default function* settingsSaga() {
  // check if user data not exist then redirect to home
  if (window.localStorage.getItem('user') === null) {
    yield put(push('/'));
  }
  yield takeLatest(FETCH_PROFILE_DETAIL, fetchProfileDetailApi);
  yield takeLatest(UPDATE_PROFILE_DETAIL, updateProfileDetailApi);
  yield takeLatest(GET_LANGUAGES, getLanguagesApi);
  yield takeLatest(GET_SPECIALTIES_BY_PROFESSION, getSpecialtiesApi);
}
