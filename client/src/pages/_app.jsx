import '../styles/globals.scss';

import { applyMiddleware, createStore } from 'redux';

import { Provider } from 'react-redux';
/* eslint-disable react/function-component-definition, react/prop-types */
import React from 'react';
import { createLogger } from 'redux-logger';
import reducer from '../reducers';
import thunk from 'redux-thunk';

const middleware = [thunk];
// production
if (process.env.NODE_ENV !== 'production') {
  middleware.push(createLogger());
}

const store = createStore(
  reducer,
  applyMiddleware(...middleware),
);

export default ({ Component, pageProps }) => (
  <Provider store={store}>
    <Component {...pageProps} />
  </Provider>
);
/* eslint-disable react/function-component-definition, react/prop-types */
