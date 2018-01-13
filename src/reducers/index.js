import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import usernameReducer from "./usernameReducer";

const rootReducer = combineReducers({
  username: usernameReducer,
  //
  // `formReducer` is a reducer provided by `redux-form` that handles
  // form-related Redux actions.
  //
  form: formReducer
});

export default rootReducer;