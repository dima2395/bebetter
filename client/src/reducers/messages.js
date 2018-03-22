import Immutable from "immutable";
import { store } from "store";

const INITIAL_STATE = Immutable.fromJS({
  messages: []
});

const ADD_MESSAGE = "@@redux-messages/ADD_MESSAGE";
const DELETE_MESSAGE = "@@redux-messages/DELETE_MESSAGE";

export default function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case ADD_MESSAGE:
      return state.update("messages", messages =>
        messages.unshift(action.message)
      );
    case DELETE_MESSAGE:
      return state.update("messages", messages =>
        messages.filter(message => message.get("id") !== action.id)
      );
    default:
      return state;
  }
}

export function addMessage(message, autoDismiss = true, dismissAfter = 5000) {
  const id = Date.now();
  if (autoDismiss) {
    setTimeout(() => store.dispatch(deleteMessage(id)), dismissAfter);
  }

  return {
    type: ADD_MESSAGE,
    message: message.set("id", id)
  };
}

export function deleteMessage(id) {
  return {
    type: DELETE_MESSAGE,
    id
  };
}
