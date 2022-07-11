import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class CartShop extends Component {
  constructor() {
    super();
    this.state = {
      product: '', // criado state para receber o retorno do localStorage
    };
  }

  componentDidMount() {
    const retorno = JSON.parse(localStorage.getItem('product'));
    this.setState({ product: retorno }); // gravando o retorno do localStorage
  }

  inclement = (info) => {
    const { product } = this.state; // destruturando o state
    this.setState({
      // aplicado a mesma logica do add carrinho
      // gravando no product, o retorno do map
      product: product.map((element) => {
        // se existir um id igual, add a quantidade + 1
        if (element.id === info.id && element.quantity < info.available_quantity) {
          element.quantity += 1; // aumenta a quantidade do elemento clicado
        } return element;
      }),
    });
    localStorage.setItem('product', JSON.stringify(product));
  };

  declement = (info) => {
    const { product } = this.state; // destruturando o state
    this.setState({
      // aplicado a mesma logica do add carrinho
      // gravando no product, o retorno do map
      product: product.map((element) => {
        // se existir um id igual, add a quantidade + 1
        if (element.id === info.id) {
          element.quantity -= 1; // diminuir a quantidade do elemento clicado
        } return element;
      }),
    });
    localStorage.setItem('product', JSON.stringify(product));
  };

  removeProduct = (info) => {
    const { product } = this.state; // destruturando o state
    this.setState({
      // gravando no product, o retorno do filter, que são todos os produtos
      // que são diferentes do id clicado.
      product: product.filter((element) => element.id !== info.id),
    });
    localStorage.setItem('product', JSON.stringify(product));
  };

  render() {
    const { product } = this.state;
    return (
      <div>
        <h1 data-testid="shopping-cart-empty-message">
          Seu carrinho está vazio
        </h1>
        <Link to="/"> Voltar </Link>
        { product
          ? product.map((info, index) => (
            <div key={ index }>
              <h1 data-testid="shopping-cart-product-name">{ info.title }</h1>
              <img src={ info.thumbnail } alt={ info.title } />
              <span>
                R$
                { info.price }
              </span>
              <button
                data-testid="product-increase-quantity"
                type="button"
                onClick={ () => this.inclement(info) }
              >
                +
              </button>
              <p data-testid="shopping-cart-product-quantity">
                {/* Responsável por apresentar apenas a qtd de produtos */ }
                { info.quantity }
              </p>
              <button
                data-testid="product-decrease-quantity"
                type="button"
                onClick={ () => this.declement(info) }
              >
                -
              </button>
              <button
                type="button"
                onClick={ () => this.removeProduct(info) }
              >
                x
              </button>
            </div>
          ))
          : null }
        <Link data-testid="checkout-products" to="/Checkout">Finalizar Compra</Link>
      </div>
    );
  }
}

export default CartShop;
