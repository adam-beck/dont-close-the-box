import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Lever from './Lever';
import { rollDice, findPermutations } from './utils';

function createLevers() {
  return [1, 2, 3, 4, 5, 6, 7, 8, 9].map(value => ({
    value,
    flipped: false,
    frozen: false
  }));
}

const style = {
  display: 'flex'
};

class Box extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentScore: [1, 2, 3, 4, 5, 6, 7, 8, 9],
      levers: createLevers(),
      dice: [],
      total: 0,
      gameOver: false
    };

    this.current = 0;
    this.started = false;

    this.onLeverClick = this.onLeverClick.bind(this);
    this.rollDice = this.rollDice.bind(this);
    this.nextRound = this.nextRound.bind(this);
    this.playLever = this.playLever.bind(this);
    this.resetLever = this.resetLever.bind(this);
  }

  rollDice() {
    this.started = true;
    const roll1 = rollDice();
    const roll2 = rollDice();
    const total = roll1 + roll2;

    this.setState(() => {
      return {
        dice: [roll1, roll2],
        total
      };
    });
  }

  playLever(selectedLever, index) {
    if (this.state.dice.length === 0) {
      alert('You must roll the dice first!');
      return;
    }

    const diceValue = this.state.dice[0] + this.state.dice[1];

    if (selectedLever.value + this.current > diceValue) {
      alert('Whoops too high');
      return;
    }

    this.current = this.current + selectedLever.value;

    const newLevers = this.state.levers.slice(0, index).concat(Object.assign({}, selectedLever, { flipped: !selectedLever.flipped })).concat(this.state.levers.slice(index + 1))
    const scoreIndex = this.state.currentScore.indexOf(selectedLever.value);
    const newScore = this.state.currentScore.slice(0, scoreIndex).concat(this.state.currentScore.slice(scoreIndex + 1));

    this.setState(() => {
      return {
        levers: newLevers,
        currentScore: newScore
      };
    });
  }

  resetLever(selectedLever, index) {
    this.current = this.current - selectedLever.value;
    const newLevers = this.state.levers.slice(0, index).concat(Object.assign({}, selectedLever, { flipped: !selectedLever.flipped })).concat(this.state.levers.slice(index + 1))
    const newScore = this.state.currentScore.concat(selectedLever.value).sort();

    this.setState(() => {
      return {
        levers: newLevers,
        currentScore: newScore
      };
    });
  }

  onLeverClick(value) {
    const selectedLever = this.state.levers.find(lever => lever.value === value);
    const index = this.state.levers.indexOf(selectedLever);

    if (selectedLever.frozen) {
      alert('sorry that lever has already been flipped');
      return;
    }

    if (selectedLever.flipped) {
      // we are going to be "resetting" this lever
      this.resetLever(selectedLever, index);
    } else {
      // we are going to be "playing" this lever
      this.playLever(selectedLever, index);
    }
  }

  nextRound() {

    if (this.current !== this.state.total) {
      alert('Whoops you didn\'t match the value of the rolled dice!');
      return;
    }

    this.current = 0;

    const newLevers = this.state.levers.map(lever => {
      if (lever.flipped) {
        return Object.assign({}, lever, { frozen: true });
      }
      return lever;
    });

    const roll1 = rollDice();
    const roll2 = rollDice();
    const total = roll1 + roll2;

    const possibleCombinations = findPermutations(this.state.currentScore, total);

    this.setState(() => {
      return {
        levers: newLevers,
        dice: [roll1, roll2],
        total,
        gameOver: possibleCombinations.length === 0
      };
    });
  }

  render() {
    return (
      <div>
        <div style={style} className="box">
          {this.state.levers.map(lever => (
            <Lever
              value={lever.value}
              flip={this.onLeverClick}
              key={lever.value}
              flipped={lever.flipped}
              frozen={lever.frozen}/>)
          )}
        </div>
        <h3>Dice: {this.state.dice[0]} | {this.state.dice[1]} = {this.state.dice[0] + this.state.dice[1]}</h3>
        {!this.started && <button onClick={this.rollDice}>Start Game!</button>}
        {!this.state.gameOver && this.started && <button onClick={this.nextRound}>Roll Dice!</button> }
        <br />
        {this.started && <h3>Current Score: {this.state.currentScore.join('')}</h3>}
        {this.state.gameOver && <h1 style={{color: 'red'}}>GAME OVER</h1>}
      </div>
    );
  }
}

export default Box;
