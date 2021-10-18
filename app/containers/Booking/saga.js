import { takeLatest, call, put, select } from 'redux-saga/effects';
import { push } from 'connected-react-router/immutable';
import { postUtil, getUtil } from '../../utils/service';
import { BOOK_APPOINTMENT } from './constants';
import {
  bookAppointmentFailedAction,
  bookAppointmentSuccessAction,
} from './actions';

export function* bookAppointmentApi(action) {
  try {
    // const url = '/schedule/getSchedule';
    const url = `http://localhost/bookApi/getDocSchedule.php?userId=${
      action.payload
    }`;
    /*const getToken = localStorage.getItem('token');
    action.payload.sessionToken = getToken;*/
    const response = yield call(getUtil, url);
    cosole.log("response", response);
    if (response.status === true && response.statusCode === 200) {
      yield put(bookAppointmentSuccessAction(response.data));
    } else {
      yield put(
        bookAppointmentFailedAction('Something went wrong! please try again'),
      );
    }
  } catch (err) {
    action.toastr.success('Something went wrong! please try again');
    yield put(
      bookAppointmentFailedAction('Something went wrong! please try again'),
    );
  }
}

// Individual exports for testing
export default function* bookingSaga() {
  yield takeLatest(BOOK_APPOINTMENT, bookAppointmentApi);
}
