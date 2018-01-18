import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import usernameReducer from "./usernameReducer";
import datesReducer from "./datesReducer";
import postsReducer from "./postsReducer";
import { postsLoadingStatusReducer, postsLoadingErrorStatusReducer } from "./postsReducer";

const rootReducer = combineReducers({
  username: usernameReducer,
  dates: datesReducer,
  posts: postsReducer,
  isLoading: postsLoadingStatusReducer,
  errorOccurred: postsLoadingErrorStatusReducer,
  //
  // `formReducer` is a reducer provided by `redux-form` that handles
  // form-related Redux actions.
  //
  form: formReducer
});

export default rootReducer;