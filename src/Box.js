import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Lever from './Lever';

function createLevers() {
  return [1, 2, 3, 4, 5, 6, 7, 8, 9].map(value => ({
    value,
    flipped: false,
    frozen: false
  }));
}

function rollDice() {
  return Math.floor(Math.random() * 6) + 1;
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
      total: 0
    };

    this.current = 0;

    this.onLeverClick = this.onLeverClick.bind(this);
    this.rollDice = this.rollDice.bind(this);
    this.nextRound = this.nextRound.bind(this);
  }

  rollDice() {
    const roll1 = rollDice();
    const roll2 = rollDice();
    const total = roll1 + roll2;

    this.setState(() => {
      return {
        dice: [roll1, roll2],
        diceTotal: total
      };
    });
  }

  onLeverClick(value) {
    const selectedLever = this.state.levers.find(lever => lever.value === value);

    if (selectedLever.frozen) {
      alert('sorry that lever has already been flipped');
      return;
    }

    const index = this.state.levers.indexOf(selectedLever);

    if (lever.flipped) {
      // we are going to be "resetting" this lever
    } else {
      // we are going to be "playing" this lever
    }

    const diceValue = this.state.dice[0] + this.state.dice[1];

    if (selectedLever.value > diceValue + this.current) {
      alert('Whoops too high');
      return;
    }

    this.current = this.current + selectedLever.value;

    const newLevers = this.state.levers.slice(0, index).concat(Object.assign({}, selectedLever, { flipped: !selectedLever.flipped })).concat(this.state.levers.slice(index + 1))
    // const newScore = this.state.currentScore.replace(selectedLever.value, '');

    this.setState(() => {
      return {
        levers: newLevers
      };
    });
  }

  nextRound() {

    const newLevers = this.state.levers.map(lever => {
      if (lever.flipped) {
        return Object.assign({}, lever, { frozen: true });
      }
      return lever;
    });

    this.setState(() => {
      return {
        levers: newLevers
      };
    });
  }

  render() {
    return (
      <div>
        <div style={style}>
          {this.state.levers.map(lever => (
            <Lever
              value={lever.value}
              flip={this.onLeverClick}
              key={lever.value}
              flipped={lever.flipped}
              frozen={lever.frozen}/>)
          )}
        </div>
        <h3>Dice: {this.state.dice[0]} | {this.state.dice[1]}</h3>
        <button onClick={this.rollDice}>Roll Dice!</button>
        <button onClick={this.nextRound}>Continue!</button>
        <br />
        <h3>Current Score: {this.state.currentScore}</h3>
      </div>
    );
  }
}

export default Box;
