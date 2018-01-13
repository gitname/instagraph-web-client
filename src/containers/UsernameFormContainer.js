import { reduxForm } from 'redux-form';
import UsernameForm from '../components/UsernameForm';

// Generate a higher-order component (HOC) that passes (to the inner component)
// `props` describing the state of the form; and in which interaction with
// form elements triggers the dispatch of Redux actions.
//
const UsernameFormContainer = reduxForm({
  // Provide a unique name for this form.
  form: 'usernameForm'
})(UsernameForm);

export default UsernameFormContainer;