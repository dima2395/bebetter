import { all } from "redux-saga/effects";
import noteSagas from "./notes";
import routineSagas from "./routines";

export default function* rootSaga() {
  yield all([...noteSagas, ...routineSagas]);
}
