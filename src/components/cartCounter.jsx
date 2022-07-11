import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class NavBar extends Component {
  render() {
    const { length } = this.props;
    return (
      <span data-testid="shopping-cart-size">{ length }</span>
    );
  }
}

NavBar.propTypes = {
  length: PropTypes.number.isRequired,
};
