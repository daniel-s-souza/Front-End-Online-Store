import React, { Component } from 'react';
import PropTypes from 'prop-types';

class CardCheckout extends Component {
  render() {
    const { title, image, price, quantity } = this.props;
    return (
      <section>
        <h3>{title}</h3>
        <img src={ image } alt={ title } />
        <span>
          Quantidade:
          {quantity}
        </span>
        <p>
          R$
          { price * quantity }
        </p>
      </section>
    );
  }
}

CardCheckout.propTypes = {
  title: PropTypes.string,
  image: PropTypes.string,
  price: PropTypes.number,
  quantity: PropTypes.number,
}.isRequired;

export default CardCheckout;
