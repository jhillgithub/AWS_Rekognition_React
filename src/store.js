import { applyMiddleware, createStore } from "redux";
import logger from "redux-logger";
import thunk from "redux-thunk";
import promise from "redux-promise-middleware";
import throttle from 'lodash/throttle';

import { loadState, saveState } from './localStorage';
import reducer from "./reducers";

const middleware = applyMiddleware(promise(), thunk, logger());

const persistedState = loadState();

const store = createStore(reducer, persistedState, middleware);

store.subscribe(throttle(() => {
  saveState({
    hue: store.getState().hue
  });
}, 1000));

export default store;
