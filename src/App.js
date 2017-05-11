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
        <Rules />
      </div>
    );
  }
}

const Rules = () => {
  return (
    <div className="rules">
      <a className="rules header" href="#rules">Rules</a>

      <p>
        The Objective of Shut the Box is to flip all 9 levers. When that happens you get to shut the box!
      </p>

      <p>
        Play begins by rolling the dice. Then the levers are flipped until their sum matches the sum of the dice. This simple routine
        continues until a combination cannot be made or all levers have been flipped. If a combination of levers cannot be made then 
        a score is calculated by combining (not adding) the levers that have not been flipped. The lower the score, the better. If all 
        levers are flipped, it is called "shutting the box" and it means you "win". 
      </p>

      <p>
        Note: this is normally played in bars/pubs amongst a group of people with a wager for who will get the lowest score. By shutting
        the box you automatically win and the game is over even for those who have not taken a turn yet. That is why the word win is in
        quotations in the rules above -- you are only playing against yourself here. Also, there are many variations of this game which
        you can read about on <a href="https://en.wikipedia.org/wiki/Shut_the_Box">Wikipedia</a>
      </p>
    </div>
  )
}

export default App;
