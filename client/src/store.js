import { createStore, applyMiddleware } from "redux";
import { Map } from "immutable";
import { routerMiddleware } from "react-router-redux";
import createHistory from "history/createBrowserHistory";
import rootReducer from "./reducers";
import { composeWithDevTools } from "redux-devtools-extension/logOnlyInProduction";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./sagas";

const history = createHistory();
const historyMiddleware = routerMiddleware(history);
const sagaMiddleware = createSagaMiddleware();

// eslint-disable-next-line
const store = createStore(
  rootReducer,
  Map(),
  composeWithDevTools(applyMiddleware(historyMiddleware, sagaMiddleware))
  // applyMiddleware(historyMiddleware, sagaMiddleware)
);

sagaMiddleware.run(rootSaga);

export { history, store };
