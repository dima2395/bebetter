import Immutable from "immutable";
import { createAction, handleActions, Action } from "redux-actions";

const INITIAL_STATE = Immutable.fromJS({});

const OPEN_MODAL = "@@redux-modal/OPEN";
const CLOSE_MODAL = "@@redux-modal/CLOSE";

// type Modal = {
//   name: string,
//   modalProps: object
// }

export default handleActions({
  [OPEN_MODAL]: (state, { payload }) => {
    return state
      .setIn([payload.name, "open"], true)
      .setIn([payload.name, "modalProps"], payload.modalProps);
  },
  [CLOSE_MODAL]: (state, { payload }) => {
    return state
      .setIn([payload.name, "open"], false)
      .setIn([payload.name, "modalProps"], null);
  }
}, INITIAL_STATE)


export const openModal = createAction(OPEN_MODAL, (name, modalProps) => ({
  name,
  modalProps
}))

export const closeModal = createAction(CLOSE_MODAL, (name) => ({
  name
}))

