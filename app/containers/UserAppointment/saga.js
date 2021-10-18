import { takeLatest, call, put } from 'redux-saga/effects';
import Swal from 'sweetalert2';

import { postUtil } from '../../utils/service';
import { BOOK_APPOINTMENT } from './constants';
import { push } from 'connected-react-router/immutable';

import {
  bookAppointmentFailedAction,
  bookAppointmentSuccessAction,
} from './actions';

const errorMsg = 'Please log in first';

export function* bookAppointmentApi(action) {
  const userData = JSON.parse(localStorage.getItem('user'));
  const sessionToken = localStorage.getItem('token');
  try {
    const url = '/appointment/hireDoctor/storeAppointment';

    if (!sessionToken || !userData.email) {
      yield put(push('/patient/login'));
    }
    const payload = {
      ...action.payload,
      email: userData.email,
      sessionToken,
      bookingMode: 'walk-in',
      isLuxury: userData.isLuxury,
      // appointmentLattitude: userData.latitude,
      // appointmentLongitude: userData.longitude,
      // placeName: userData.locationName,
      patientName: userData.fullName,
    };

    const response = yield call(postUtil, url, payload);
    if (response.data.status === true && response.data.statusCode === 200) {
      //sending appointment email
      const email_api_url = 'https://bookadoc.online/healtafrique_appointment_email.php';
      yield call(postUtil, email_api_url, payload);

      yield put(bookAppointmentSuccessAction(response.data));

      yield showConfirmationDialog();
    } else if (
      response.data.status === false &&
      response.data.statusCode === 200
    ) {
      action.toastr.error(response.data.message);
      yield put(bookAppointmentFailedAction(errorMsg));
    }
  } catch (err) {
    if (
      sessionToken === undefined ||
      sessionToken == null ||
      userData.email === undefined
    ) {
      yield put(push('/patient/login'));
    }
    action.toastr.error(errorMsg);
    yield put(bookAppointmentFailedAction(errorMsg));
  }
}

export default function* bookAppointmentsSaga() {
  yield takeLatest(BOOK_APPOINTMENT, bookAppointmentApi);
}

function* showConfirmationDialog() {
  yield Swal.fire({
    title: 'Appointment',
    text: 'Appointment booked successfully',
    icon: 'success',
    confirmButtonText: 'OK',
  });

  // yield put(push('/dashboard'));
  window.location.href = '/dashboard';
}
