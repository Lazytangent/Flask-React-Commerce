import { createStore, applyMiddleware, combineReducers, Store } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import session from './session';
import transactions from './transactions';

const rootReducer = combineReducers({
  session,
  transactions,
});

let enhancer: any;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require('redux-logger').default;
  enhancer = composeWithDevTools(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState?: {}): Store => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export const store = configureStore();

export * from './types.d';
export * from './hooks';
