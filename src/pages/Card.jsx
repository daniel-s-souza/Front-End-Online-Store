import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default class Card extends Component {
  handleClick = (product) => {
    const { handleProducts } = this.props;
    // recuperando o dado do localStorage, se null, cria um array vazio
    let data = JSON.parse(localStorage.getItem('product')) || [];
    // procurando se encontra o produto pelo Id, se existir a hof retorna o primeiro elemento
    const cartProduct = data.find((prod) => prod.id === product.id);
    // caso seja true
    if (cartProduct) {
      // gravo dentro da variavel data, um array que esta sendo realizado no .map
      data = data.map((element) => {
        // se existir um id igual, add a quantidade + 1
        if (element.id === product.id) {
          element.quantity += 1;
        } return element; // retorn o elemento
      });
    } else {
      // caso o retorno seja false, add o atributo quantity no objeto
      product.quantity = 1;
      // como data eh um array, estou add com o push o produto com a nova propriedade
      data.push(product);
    }
    // gravo no localStorage todo o seu retorno, ao consultar, é possível visualizar a qtd
    // criada no obj e a quantidade sendo atribuida a cada click
    localStorage.setItem('product', JSON.stringify(data));
    // funcao para chamar o contador do req 13.
    handleProducts();
  };

  render() {
    const { product, shipping } = this.props;
    return (
      <div>
        <Link to={ `/productDetails/${product.id}` } data-testid="product-detail-link">
          <section data-testid="product">
            <h1>{ product.title }</h1>
            <img src={ product.thumbnail } alt={ product.title } />
            <span>{ product.price }</span>
            { (shipping.free_shipping)
              && <p data-testid="free-shipping"> Frete Gratis </p> }
          </section>
        </Link>
        <button
          data-testid="product-add-to-cart"
          onClick={ () => this.handleClick(product) }
          type="button"
        >
          Adicionar ao carrinho
        </button>
      </div>
    );
  }
}

Card.propTypes = {
  handleProducts: PropTypes.func.isRequired,
  shipping: PropTypes.shape({
    free_shipping: PropTypes.bool,
  }).isRequired,
  product: PropTypes.shape({
    title: PropTypes.string,
    thumbnail: PropTypes.string,
    price: PropTypes.number,
    id: PropTypes.string,
  }).isRequired,
};
