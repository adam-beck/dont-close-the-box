import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Lever extends Component {
  constructor(props) {
    super(props);

    this.flip = this.flip.bind(this);
  }

  flip() {
    this.props.flip(this.props.value);
  }

  render() {
    return (
      <div onClick={this.flip}>
        I am number {this.props.value}
        {this.props.flipped ? ' And I Am Flipped!': ''}
      </div>
    );
  }
}

Lever.propTypes = {
  value: PropTypes.number.isRequired,
  flip: PropTypes.func.isRequired,
  flipped: PropTypes.bool
};

export default Lever;
