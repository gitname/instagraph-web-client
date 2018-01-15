import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import usernameReducer from "./usernameReducer";
import datesReducer from "./datesReducer";

const rootReducer = combineReducers({
  username: usernameReducer,
  dates: datesReducer,
  //
  // `formReducer` is a reducer provided by `redux-form` that handles
  // form-related Redux actions.
  //
  form: formReducer
});

export default rootReducer;