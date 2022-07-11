import React, { Component } from 'react';
import CardCheckout from '../components/cardCheckout';

class Checkout extends Component {
  constructor() {
    super();
    this.state = {
      itensCart: [],
      totalPrice: 0,
    };
  }

  componentDidMount() {
    const cartShop = JSON.parse(localStorage.getItem('product'));

    this.setState({
      itensCart: cartShop,
      totalPrice:
        cartShop.map((price) => price.price * price.quantity).reduce((a, b) => a + b, 0),
    });
  }

  render() {
    const { itensCart, totalPrice } = this.state;
    console.log(totalPrice);
    return (
      <div>
        { itensCart.map((itens) => (
          <CardCheckout
            key={ itens.id }
            title={ itens.title }
            price={ itens.price }
            image={ itens.thumbnail }
            quantity={ itens.quantity }
          />
        )) }
        <h3>
          Total:
          { totalPrice }
        </h3>
        <div>
          <form>
            <label htmlFor="name">
              <input
                id="name"
                data-testid="checkout-fullname"
                type="text"
                placeholder="Nome Completo"
              />
            </label>
            <label htmlFor="email">
              <input
                id="email"
                data-testid="checkout-email"
                type="text"
                placeholder="Email"
              />
            </label>
            <label htmlFor="cpf">
              <input
                id="cpf"
                data-testid="checkout-cpf"
                type="text"
                placeholder="CPF"
              />
            </label>
            <label htmlFor="telefone">
              <input
                id="telefone"
                data-testid="checkout-phone"
                type="text"
                placeholder="Telefone"
              />
            </label>
            <label htmlFor="cep">
              <input
                id="cep"
                data-testid="checkout-cep"
                type="text"
                placeholder="CEP"
              />
            </label>
            <label htmlFor="endereco">
              <input
                id="endereco"
                data-testid="checkout-address"
                type="text"
                placeholder="Endereço"
              />
            </label>
          </form>

        </div>
      </div>
    );
  }
}

export default Checkout;
