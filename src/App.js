import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'semantic-ui-react';

class App extends Component {
  render() {
    return (
      <div>
        <Icon name="check circle" color="green"></Icon>
        {this.props.title}
      </div>
    );
  }
}

App.propTypes = {
  title: PropTypes.string.isRequired
};

export default App;
