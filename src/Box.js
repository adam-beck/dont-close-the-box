import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Lever from './Lever';
import Die from './Die';
import { rollDice, findPermutations } from './utils';

function createLevers() {
  return [1, 2, 3, 4, 5, 6, 7, 8, 9].map(value => ({
    value,
    flipped: false,
    frozen: false
  }));
}

const startingNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const getNewGameState = () => {
  return {
    currentScore: startingNumbers.slice(),
    levers: createLevers(),
    dice: []
  };
}

class Box extends Component {
  constructor(props) {
    super(props);

    this.state = getNewGameState();

    this.current = 0;

    this.onLeverClick = this.onLeverClick.bind(this);
    this.nextRound = this.nextRound.bind(this);
    this.playLever = this.playLever.bind(this);
    this.resetLever = this.resetLever.bind(this);
    this.startNewGame = this.startNewGame.bind(this);
  }

  startNewGame() {
    const roll1 = rollDice();
    const roll2 = rollDice();

    this.setState(() => {
      return Object.assign(getNewGameState(), { dice: [roll1, roll2] });
    }, () => {
      this.current = 0;
      this.props.onStateChange('PLAYING');
    });
  }

  playLever(selectedLever, index) {
    const diceValue = this.state.dice[0] + this.state.dice[1];

    if (selectedLever.value + this.current > diceValue) {
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

    if (newScore.length === 0) {
      this.props.onStateChange('WON')
      return;
    }
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
    // woah there! you can't jump to the next round without meeting the current dice total
    if (this.current !== this.state.dice[0] + this.state.dice[1]) {
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

    const possibleCombinations = findPermutations(this.state.currentScore, roll1 + roll2);

    if (possibleCombinations.length === 0) {
      this.props.onStateChange('LOST');
    }

    this.setState(() => {
      return {
        levers: newLevers,
        dice: [roll1, roll2]
      };
    });
  }

  render() {
    return (
      <div className="box-wrapper">
        <Score state={this.props.state} score={this.state.currentScore} />
        <div className="box">
          {this.state.levers.map(lever => (
            <Lever
              value={lever.value}
              flip={this.onLeverClick}
              key={lever.value}
              flipped={lever.flipped}
              frozen={lever.frozen}/>)
          )}
        </div>
        {this.props.state !== 1 && <Dice dice={this.state.dice} onClick={this.nextRound} />}
        <GameInformation state={this.props.state} newGame={this.startNewGame} />
      </div>
    );
  }
}

const Score = ({ state, score }) => {
  const scoreVisible = state !== 1 ? '': 'hidden';
  return (
    <h3 className="score" style={{visibility: scoreVisible}}>Current Score: <span>{score.join('')}</span></h3>
  );
}

const Dice = ({ dice, onClick }) => {
  return (
    <div className="dice" onClick={onClick}>
      <Die value={dice[0]} />
      <Die value={dice[1]} />
    </div>
  );
}

const GameInformation = ({ state, newGame }) => {
  return (
    <div className="game-information">
      {state === 4 && <h1 className="game-over">GAME OVER!</h1>}
      {state !== 2 && <button className="start-button" onClick={newGame}>Start</button>}
    </div>
  );
}

export default Box;
