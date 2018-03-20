import Immutable from "immutable";
import { generateActionTypes } from "helpers";

const namespace = "ROUTINES";

export const actionTypes = generateActionTypes(namespace);

//add aditional progress actionTypes
actionTypes.progress = {
  update: {
    request: `${namespace}_PROGRESS_UPDATE_REQUEST`,
    success: `${namespace}_PROGRESS_UPDATE_SUCCESS`,
    fail: `${namespace}_PROGRESS_UPDATE_FAIL`
  }
};

const INITIAL_STATE = Immutable.fromJS({
  routines: [],
  loading: false
});

export default function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    // LIST
    case actionTypes.get.request:
      return state.update("loading", loading => true);
    case actionTypes.get.success:
      return state
        .update("routines", routines => action.routines)
        .update("loading", loading => false);

    case actionTypes.create.success:
      return state.update("routines", routines =>
        routines.unshift(action.routine)
      );

    case actionTypes.update.success:
      return state.update("routines", routines => {
        const indexToReplace = routines.findIndex(
          routine => routine.get("id") === action.routine.get("id")
        );
        if (indexToReplace !== -1) {
          return routines.set(indexToReplace, action.routine);
        } else {
          return routines;
        }
      });

    case actionTypes.progress.update.success:
      return state.update("routines", routines => {
        const routineIndex = routines.findIndex(routine => {
          return (
            routine.get("id") ===
            parseInt(action.daily_progress.get("routine_id"), 10)
          );
        });
        return routines.update(routineIndex, routine => {
          return routine.update("progress", progress => {
            const indexToReplace = progress.findIndex(
              daily_progress =>
                daily_progress.get("day") === action.daily_progress.get("day")
            );
            if (indexToReplace === -1) {
              return progress.unshift(action.daily_progress);
            } else {
              return progress.set(indexToReplace, action.daily_progress);
            }
          });
        });
      });

    case actionTypes.delete.success:
      return state.update("routines", routines =>
        routines.filter(routine => routine.get("id") !== action.id)
      );

    default:
      return state;
  }
}

export const getRoutines = () => ({ type: actionTypes.get.request });

export const createRoutine = routine => ({
  type: actionTypes.create.request,
  routine
});

export const updateRoutine = (id, routine) => ({
  type: actionTypes.update.request,
  id,
  routine
});

export const deleteRoutine = id => ({ type: actionTypes.delete.request, id });

export const updateRoutineProgress = (routine_id, daily_progress) => ({
  type: actionTypes.progress.update.request,
  routine_id,
  daily_progress
});
