import { call, put, takeLatest } from "redux-saga/effects";
import api from "api";
import { actionTypes, resetNoteFormMessage } from "reducers/notes";
import { closeModal } from "reducers/modals";
import { startSubmit, stopSubmit, reset } from "redux-form/immutable";

const FORM_NAME = "note";

export function* fetchNotes() {
  try {
    const res = yield call(api.notes.get);
    yield put({ type: actionTypes.get.success, notes: res.data });
  } catch (e) {
    yield put({ type: actionTypes.get.fail, errors: e });
  }
}

export function* createNote(action) {
  yield put(resetNoteFormMessage());
  try {
    yield put(startSubmit(FORM_NAME));
    const res = yield call(api.notes.create, action.note);

    yield put({
      type: actionTypes.create.success,
      note: res.data.get("note"),
      success: res.data.get("success")
    });

    yield put(stopSubmit(FORM_NAME));
    yield put(reset(FORM_NAME));
  } catch (e) {
    const errors = e.response.data.get("errors").toJS();
    yield put({ type: actionTypes.create.fail });
    yield put(stopSubmit(FORM_NAME, errors));
  }
}

export function* updateNote(action) {
  yield put(resetNoteFormMessage());
  try {
    yield put(startSubmit(FORM_NAME));
    const res = yield call(api.notes.update, action.id, action.note);

    yield put({
      type: actionTypes.update.success,
      note: res.data.get("note"),
      success: res.data.get("success")
    });

    yield put(stopSubmit(FORM_NAME));
  } catch (e) {
    const errors = e.response.data.get("errors").toJS();
    yield put({ type: actionTypes.create.fail });
    yield put(stopSubmit(FORM_NAME, errors));
  }
}

export function* deleteNote(action) {
  try {
    console.log("before res", action.id);
    const res = yield call(api.notes.delete, action.id);
    console.log("after res");
    yield put({ type: actionTypes.delete.success, id: res.data.get("id") });
    yield put(closeModal("note_delete"));
  } catch (e) {
    yield put({ type: actionTypes.delete.fail });
  }
}

const noteSagas = [
  takeLatest(actionTypes.get.request, fetchNotes),
  takeLatest(actionTypes.create.request, createNote),
  takeLatest(actionTypes.update.request, updateNote),
  takeLatest(actionTypes.delete.request, deleteNote)
];

export default noteSagas;
