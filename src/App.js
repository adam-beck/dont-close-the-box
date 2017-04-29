import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Box from './Box';

import './styles.css';

class App extends Component {
  render() {
    return (
      <div>
        <h1 className="game-title">Shut the Box</h1>
        <Box />
      </div>
    );
  }
}

export default App;
