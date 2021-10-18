import { takeLatest, call, put, select } from 'redux-saga/effects';
import { FETCH_PAST_CONSULT } from './constants';
import {
  fetchPastConsultSuccessAction,
  fetchPastConsultFailedAction,
} from './actions';
import { postUtil } from '../../utils/service';
import { makeSelectPastConsult } from './selectors';

export function* fetchOldConsultApi(action) {
  try {
    const pastConsultSelect = yield select(makeSelectPastConsult());
    // console.log('fetch consult api');
    const user = JSON.parse(window.localStorage.getItem('user'));
    const data = {
      email: user.email,
      sessionToken: window.localStorage.getItem('token'),
      listIndex: pastConsultSelect.listIndex,
    };
    const url = '/pastconsult/getAllPastConsults';
    const response = yield call(postUtil, url, data);
    if (
      response.status === true &&
      response.statusCode === 200 &&
      response.message === 'success'
    ) {
      yield put(fetchPastConsultSuccessAction(response.data));
    } else {
      yield put(fetchPastConsultFailedAction());
    }
  } catch (err) {
    action.toastr.error('Something went wrong');
    yield put(fetchPastConsultFailedAction());
  }
}
// Individual exports for testing
export default function* pastConsultSaga() {
  yield takeLatest(FETCH_PAST_CONSULT, fetchOldConsultApi);
}
