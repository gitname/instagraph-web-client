import React from 'react';
import PropTypes from 'prop-types';
import { Container } from 'semantic-ui-react';
import TitleBar from './TitleBar';
import UsernameFormContainer from '../containers/UsernameFormContainer';

// Define this component's style rules using regular CSS; since this
// component's style rules utilize media queries, which are not
// supported by inline styles.
//
import "./App.css";

const App = (props) => {
  const {setUsername} = props;

  return (
    <div>
      <TitleBar
        title="Instagraph"
        icon={{
          name: "hashtag",
          color: "purple"
        }}
      />

      <Container textAlign="center" className="UsernameFormContainer-Container">
        <UsernameFormContainer
          autoFocus
          onSubmit={(values) => {
            console.log("Form submission handler received values:", values);
            setUsername(values.username);
          }}
        />
      </Container>
    </div>
  );
};

App.propTypes = {
  setUsername: PropTypes.func.isRequired
};

export default App;
