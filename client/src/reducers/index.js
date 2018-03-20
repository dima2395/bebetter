import { combineReducers } from "redux-immutable";
import { reducer as formReducer } from "redux-form/immutable";
import modalsReducer from "./modals";
import notes from "./notes";
import routines from "./routines";

export default combineReducers({
  notes,
  routines,
  form: formReducer,
  modals: modalsReducer
});
