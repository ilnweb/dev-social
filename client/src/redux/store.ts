import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { persistStore } from 'redux-persist';
import logger from 'redux-logger';
import rootReducer from './root-reducer';
import rootSaga from './root-saga';
import { createBrowserHistory } from "history";
import { composeWithDevTools } from "redux-devtools-extension";

import { routerMiddleware } from 'react-router-redux'

const history = createBrowserHistory();

const sagaMiddleware = createSagaMiddleware();

const middlewares: any = [routerMiddleware(history), sagaMiddleware];

if (process.env.NODE_ENV === 'development') {
  middlewares.push(logger)
}

export const store = createStore(rootReducer ,composeWithDevTools(applyMiddleware(...middlewares)));

export const persistor = persistStore(store);

sagaMiddleware.run(rootSaga)

export default { store, persistor };