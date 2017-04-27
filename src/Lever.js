import React, { Component } from 'react';
import PropTypes from 'prop-types';

var style = {
  flexBasis: '50px',
  textAlign: 'center'
}

const h1Style = {
  userSelect: 'none',
  cursor: 'pointer'
};

function getColor(flipped, frozen) {
  if (flipped && frozen) {
    return 'blue';
  }

  if (flipped && !frozen) {
    return 'red';
  }

  return 'black'
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
    style = Object.assign({}, style, { color: getColor(this.props.flipped, this.props.frozen) });

    return (
      <div onClick={this.flip} style={style}>
        <h1 style={h1Style}>{this.props.value}</h1>
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
