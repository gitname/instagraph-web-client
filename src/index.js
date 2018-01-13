import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './reducers';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';

import 'semantic-ui-css/semantic.min.css';

const appStore = createStore(
  rootReducer,
  //
  // Enable the use of the "Redux DevTools Extension" Chrome extension, if it
  // is installed in the visitor's web browser.
  //
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

const rootComponent = (
  <Provider store={appStore}>
    <App />
  </Provider>
);

ReactDOM.render(rootComponent, document.getElementById('root'));

registerServiceWorker();
