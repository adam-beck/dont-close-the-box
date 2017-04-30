import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Box from './Box';
import Confetti from 'react-confetti';

import './styles.css';

const gameStages = {
  FRESH: 1,
  PLAYING: 2,
  WON: 3,
  LOST: 4
};

class App extends Component {
  constructor(props) {
    super(props);
  
    this.state ={
      gameState: gameStages.FRESH
    };

    this.changeStateHandler = this.changeStateHandler.bind(this);
  }

  changeStateHandler(nextState) {
    this.setState(() => {
      return { 
        gameState: gameStages[nextState]
      };
    });
  }

  render() {
    return (
      <div>
        {this.state.gameState === gameStages.WON && <Confetti />}
        <h1 className="game-title">Shut the Box</h1>
        <Box state={this.state.gameState} onStateChange={this.changeStateHandler} />
      </div>
    );
  }
}

export default App;
