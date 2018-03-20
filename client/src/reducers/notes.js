import Immutable from "immutable";
import { generateActionTypes } from "helpers";

const namespace = "NOTES";
export const actionTypes = generateActionTypes(namespace);

const RESET_FORM_MESSAGE = `${namespace}_RESET_FORM_MESSAGE`;

const INITIAL_STATE = Immutable.fromJS({
  notes: [],
  loading: false,
  deleteModal: {
    loading: false,
    open: false
  },
  form: {
    loading: false,
    success: null,
    errors: null
  }
});

export default function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    // LIST
    case actionTypes.get.request:
      return state.set("loading", true);

    case actionTypes.get.success:
      return state.update("notes", notes => action.notes).set("loading", false);

    case actionTypes.get.fail:
      return state.set("loading", false);

    case actionTypes.create.request:
      return state.setIn(["form", "loading"], true);

    case actionTypes.create.success:
      return state
        .update("notes", notes => notes.unshift(action.note))
        .setIn(["form", "loading"], false)
        .setIn(["form", "success"], action.success);

    case actionTypes.update.request:
      return state.setIn(["form", "loading"], true);

    case actionTypes.update.success:
      return state
        .setIn(["form", "loading"], false)
        .setIn(["form", "success"], action.success)
        .update("notes", notes => {
          const indexToReplace = notes.findIndex(
            note => note.get("id") === action.note.get("id")
          );
          if (indexToReplace !== -1) {
            return notes.set(indexToReplace, action.note);
          } else {
            return notes;
          }
        });

    case actionTypes.delete.request:
      return state.setIn(["deleteModal", "loading"], true);

    case actionTypes.delete.success:
      return state
        .setIn(["deleteModal", "loading"], false)
        .update("notes", notes =>
          notes.filter(note => note.get("id") !== action.id)
        );

    case actionTypes.delete.fail:
      return state.setIn(["deleteModal", "loading"], false);

    case RESET_FORM_MESSAGE:
      return state.setIn(["form", "success"], null);

    default:
      return state;
  }
}

export const resetNoteFormMessage = () => {
  return { type: RESET_FORM_MESSAGE };
};

export const getNotes = () => ({ type: actionTypes.get.request });

export const createNote = note => ({
  type: actionTypes.create.request,
  note
});

export const updateNote = (id, note) => ({
  type: actionTypes.update.request,
  id,
  note
});

export const deleteNote = id => ({
  type: actionTypes.delete.request,
  id
});
