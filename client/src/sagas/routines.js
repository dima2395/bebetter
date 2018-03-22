import { call, put, takeLatest } from "redux-saga/effects";
import api from "api";
import { actionTypes } from "reducers/routines";
import { startSubmit, stopSubmit, reset } from "redux-form/immutable";

const FORM_NAME = "routine";

export function* fetchRoutines() {
  try {
    const res = yield call(api.routines.get);
    yield put({
      type: actionTypes.get.success,
      routines: res.data
    });
  } catch (e) {
    yield put({
      type: actionTypes.get.fail
    });
  }
}

export function* createRoutine(action) {
  try {
    yield put(startSubmit(FORM_NAME));
    const res = yield call(api.routines.create, action.routine);

    yield put({
      type: actionTypes.create.success,
      routine: res.data.get("routine")
    });

    yield put(stopSubmit(FORM_NAME));
    yield put(reset(FORM_NAME));
  } catch (e) {
    const errors = e.response.data.get("errors").toJS();
    yield put({
      type: actionTypes.create.fail
    });
    yield put(stopSubmit(FORM_NAME, errors));
  }
}

export function* updateRoutine(action) {
  try {
    yield put(startSubmit(FORM_NAME));
    const res = yield call(api.routines.update, action.id, action.routine);

    yield put({
      type: actionTypes.update.success,
      routine: res.data.get("routine")
    });

    yield put(stopSubmit(FORM_NAME));
  } catch (e) {
    const errors = e.response.data.get("errors").toJS();
    yield put({
      type: actionTypes.update.fail
    });
    yield put(stopSubmit(FORM_NAME, errors));
  }
}

export function* deleteRoutine(action) {
  try {
    const res = yield call(api.routines.delete, action.id);
    yield put({
      type: actionTypes.delete.success,
      id: res.data.get("id")
    });
  } catch (e) {
    yield put({
      type: actionTypes.delete.fail
    });
  }
}

export function* updateRoutineProgress(action) {
  try {
    const res = yield call(
      api.routines.progress.update,
      action.routine_id,
      action.daily_progress
    );
    yield put({
      type: actionTypes.progress.update.success,
      daily_progress: res.data.get("daily_progress")
    });
  } catch (e) {
    yield put({
      type: actionTypes.progress.update.fail
    });
  }
}

const routineSagas = [
  takeLatest(actionTypes.get.request, fetchRoutines),
  takeLatest(actionTypes.create.request, createRoutine),
  takeLatest(actionTypes.update.request, updateRoutine),
  takeLatest(actionTypes.delete.request, deleteRoutine),
  takeLatest(actionTypes.progress.update.request, updateRoutineProgress)
];

export default routineSagas;
