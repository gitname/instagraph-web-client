import React, { Component } from 'react';
import { Container } from 'semantic-ui-react';
import TitleBar from './TitleBar';
import UsernameFormContainer from '../containers/UsernameFormContainer';

// Define this component's style rules using regular CSS; since this
// component's style rules utilize media queries, which are not
// supported by inline styles.
//
import "./App.css";

class App extends Component {
  render() {
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
            }}
          />
        </Container>
      </div>
    );
  }
}

export default App;
