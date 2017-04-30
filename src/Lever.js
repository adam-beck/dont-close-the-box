import React, { Component } from 'react';
import PropTypes from 'prop-types';

function getClassForCurrentState(flipped, frozen) {
  if (flipped && frozen) {
    return 'frozen';
  }

  if (flipped && !frozen) {
    return 'flipped';
  }

  return ''
}

class Lever extends Component {
  constructor(props) {
    super(props);

    this.flip = this.flip.bind(this);
  }

  flip() {
    this.props.flip(this.props.value);
  }

  render() {
    const className = 'lever ' + getClassForCurrentState(this.props.flipped, this.props.frozen);

    return (
      <div className={className} onClick={this.flip}>
        <h1>{this.props.value}</h1>
      </div>
    );
  }
}

Lever.propTypes = {
  value: PropTypes.number.isRequired,
  flip: PropTypes.func.isRequired,
  flipped: PropTypes.bool,
  frozen: PropTypes.bool
};

export default Lever;
