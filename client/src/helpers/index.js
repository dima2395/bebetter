export function generateActionTypes(
  prefix,
  states = ["REQUEST", "SUCCESS", "FAIL"]
) {
  const actions = {};
  const methods = ["GET", "CREATE", "UPDATE", "DELETE"];
  methods.forEach(method => {
    const methodName = method.toLowerCase();
    actions[methodName] = {};

    states.forEach(state => {
      const actionType = `${prefix}_${method}_${state}`.toUpperCase();
      const stateName = state.toLowerCase();
      actions[methodName][stateName] = actionType;
    });
  });
  return actions;
}

// export function generateActionCreators(actionTypes) {
//   return {
//     get: {
//       request: () => ({
//         type: actionTypes.get.request
//       }),
//       success: notes => ({
//         type: actionTypes.get.success,
//         notes
//       }),
//       fail: errors => ({
//         type: actionTypes.get.fail,
//         errors
//       })
//     },
//     create: {
//       request: entity => ({
//         type: actionTypes.create.request,
//         entity
//       }),
//       success: entity => ({
//         type: actionTypes.create.success,
//         entity
//       }),
//       fail: errors => ({
//         type: actionTypes.create.fail,
//         errors
//       })
//     },
//     update: {
//       request: (id, entity) => ({
//         type: actionTypes.update.request
//       }),
//       success: entity => ({
//         type: actionTypes.update.success,
//         entity
//       }),
//       fail: errors => ({
//         type: actionTypes.update.fail,
//         errors
//       })
//     },
//     delete: {
//       request: id => ({
//         type: actionTypes.delete.request,
//         id
//       }),
//       success: id => ({
//         type: actionTypes.delete.success,
//         id
//       }),
//       fail: errors => ({
//         type: actionTypes.delete.fail,
//         errors
//       })
//     }
//   };
// }
