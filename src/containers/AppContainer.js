import { connect } from 'react-redux';
import { setUsernameAndGetPosts } from '../action-creators';
import App from '../components/App';

const mapStateToProps = (state) => {
  return {
    username: state.username
  };
};

const mapDispatchToProps = {
  setUsernameAndGetPosts
};

// Generate a higher-order component (HOC) that makes dispatchers of the Redux
// actions returned by the action-creators listed above, available to the
// inner component.
//
const AppContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

export default AppContainer;