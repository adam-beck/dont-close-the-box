import React, { Component } from 'react';
import PropTypes from 'prop-types';

import dieImg from '../assets/dice-six-faces-three.svg';

const convertNumberToString = value => {
  switch (value) {
    case 1:
      return 'one';
    case 2:
      return 'two';
    case 3:
      return 'three';
    case 4:
      return 'four';
    case 5:
      return 'five';
    case 6:
      return 'six'
  }
}

class Die extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (!this.props.value) {
      return null;
    }

    const dieImageLocation = require(`../assets/dice-six-faces-${convertNumberToString(this.props.value)}.svg`)
    return (
      <div className="die">
        <img src={dieImageLocation} />
      </div>
    );
  }
}

Die.propTypes = {
  value: PropTypes.number
}

export default Die;
