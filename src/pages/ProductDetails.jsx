import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getProductsFromProductId } from '../services/api';
import cartImg from '../imgs/cart.png';
import Rating from '../components/Rating';
import NavBar from '../components/cartCounter';

export default class ProductDetails extends Component {
  constructor() {
    super();

    this.state = {
      getDetailApi: [],
      getData: '',
      counterProducts: 0,
      shipping: [],
    };
  }

  componentDidMount() {
    const {
      match: {
        params: { id },
      },
    } = this.props;
    this.getProductDetails(id);
    this.handleProducts();
  }

  getProductDetails = async (id) => {
    const getProduct = await getProductsFromProductId(id);
    this.setState({
      getDetailApi: getProduct.attributes,
      getData: getProduct,
      shipping: getProduct.shipping,
    });
  };

  handleProducts = () => {
    const cartShop = JSON.parse(localStorage.getItem('product')) || [];
    if (localStorage.length > 0) {
      this.setState({
        counterProducts:
          cartShop.map((price) => price.quantity).reduce((a, b) => a + b, 0),
      });
    }
  };

  handleClick = (product) => {
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
  };

  render() {
    const { getDetailApi, getData, counterProducts, shipping } = this.state;
    console.log(shipping);
    return (
      <div>
        <NavBar length={ counterProducts } />
        <Link data-testid="shopping-cart-button" to="/cartShop">
          <img src={ cartImg } alt="carrinho" />
        </Link>
        <h1 data-testid="product-detail-name">{ getData.title }</h1>
        <img src={ getData.thumbnail } alt={ getData.title } />
        <span>{ getData.price }</span>
        { (shipping.free_shipping) && <p data-testid="free-shipping"> Frete Gratis </p> }
        { getDetailApi.map((attr, index) => (
          <ul key={ index }>
            <li>{ attr.value_name }</li>
          </ul>
        )) }
        <button
          data-testid="product-detail-add-to-cart"
          onClick={ () => this.handleClick(getData) }
          type="button"
        >
          Adicionar ao carrinho
        </button>
        <h2>Avalição</h2>
        <Rating />
      </div>
    );
  }
}

ProductDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }).isRequired,
  }).isRequired,
};
