import { take, call, put, select } from 'redux-saga/effects';

// Individual exports for testing
import {push} from "connected-react-router/immutable";

export default function* doctorDashboardSaga() {
  const user = JSON.parse(window.localStorage.getItem('user'));
  if (user === null || user.role.toLowerCase() !== 'doctor') {
    yield put(push('/'));
  }
}
