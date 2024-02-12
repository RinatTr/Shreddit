import './index.css';
import App from './App.js';
import * as serviceWorker from './serviceWorker';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './reducers/rootReducer.js'
import logger from "redux-logger";
import thunk from "redux-thunk";

const createMiddleware = () => {
  if (process.env.NODE_ENV !== 'production') {
    return [thunk, logger];
  } else {
    return [thunk];
  }
};

const getMiddleware = () => applyMiddleware(...createMiddleware());

const store = createStore(rootReducer, {}, getMiddleware());

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
 document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
