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

class Box extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
      currentScore: '123456789',
      levers: createLevers(),
      dice: []
    };

    this.onLeverClick = this.onLeverClick.bind(this);
  }

  onLeverClick(value) {
    const selectedLever = this.state.levers.find(lever => lever.value === value);
    const index = this.state.levers.indexOf(selectedLever);

    const newLevers = this.state.levers.slice(0, index).concat(Object.assign({}, selectedLever, { flipped: true })).concat(this.state.levers.slice(index + 1))
    const newScore = this.state.currentScore.replace(selectedLever.value, '');

    this.setState(() => {
      return {
        levers: newLevers,
        currentScore: newScore
      };
    });
  }

  render() {
    return (
      <div>
        {this.state.levers.map(lever => <Lever value={lever.value} flip={this.onLeverClick} key={lever.value} flipped={lever.flipped} />)}
        <h3>Current Score: {this.state.currentScore}</h3>
      </div>
    );
  }
}

export default Box;
