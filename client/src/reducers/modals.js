import Immutable from "immutable";

const INITIAL_STATE = Immutable.fromJS({});

const OPEN_MODAL = "@@redux-modal/OPEN";
const CLOSE_MODAL = "@@redux-modal/CLOSE";

export default function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case OPEN_MODAL:
      return state
        .setIn([action.name, "open"], true)
        .setIn([action.name, "modalProps"], action.modalProps);
    case CLOSE_MODAL:
      return state
        .setIn([action.name, "open"], false)
        .setIn([action.name, "modalProps"], null);
    default:
      return state;
  }
}

export function openModal(name, modalProps = {}) {
  return {
    type: OPEN_MODAL,
    name,
    modalProps
  };
}

export function closeModal(name) {
  return {
    type: CLOSE_MODAL,
    name
  };
}
