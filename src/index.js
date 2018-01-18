import React from 'react';
import ReactDOM from 'react-dom';
import { applyMiddleware, compose, createStore } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import AppContainer from './containers/AppContainer';
import registerServiceWorker from './registerServiceWorker';

import 'semantic-ui-css/semantic.min.css';

// Enable the use of the "Redux DevTools Extension" Chrome extension, if it
// is installed in the visitor's web browser.
//
// Reference: https://github.com/zalmoxisus/redux-devtools-extension#12-advanced-store-setup
//
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const appStore = createStore(
  rootReducer,
  composeEnhancers(
    applyMiddleware(thunk)
  )
);

const rootComponent = (
  <Provider store={appStore}>
    <AppContainer />
  </Provider>
);

ReactDOM.render(rootComponent, document.getElementById('root'));

registerServiceWorker();
