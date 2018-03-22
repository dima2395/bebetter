import { call, put } from "redux-saga/effects";
import { startSubmit, stopSubmit, reset } from "redux-form/immutable";
import { resetNoteFormMessage } from "reducers/notes";

//not ready to use
export function* formSaga(
  formName,
  resetAfterSubmit,
  actionSuccess,
  actionFail,
  apiCall,
  ...apiArgs
) {
  yield put(resetNoteFormMessage());
  try {
    yield put(startSubmit(formName));
    const res = yield call(apiCall, ...apiArgs);
    yield put(actionSuccess);
    yield put(stopSubmit(formName));
    if (resetAfterSubmit) {
      yield put(reset(formName));
    }
  } catch (e) {
    const errors = e.response.data.get("errors").toJS();
    yield put(actionFail);
    yield put(stopSubmit(formName, errors));
  }
}
