import React, { Component } from 'react';
import TitleBar from './TitleBar';

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
      </div>
    );
  }
}

export default App;
