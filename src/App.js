import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Box from './Box';

import Confetti from 'react-confetti';

import './styles.css';

class App extends Component {
  constructor(props) {
    super(props);
  
    this.state ={
      winner: false
    };

    this.winHandler = this.winHandler.bind(this);
  }

  winHandler() {
    this.setState(() => {
      return { winner: true };
    });
  }

  render() {
    return (
      <div>
        {this.state.winner && <Confetti />}
        <h1 className="game-title">Shut the Box</h1>
        <Box onWin={this.winHandler}/>
      </div>
    );
  }
}

export default App;
