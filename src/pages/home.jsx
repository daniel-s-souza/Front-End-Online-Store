import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Categories from './Categories';
import Card from './Card';
import { getProductsFromQuery } from '../services/api';
import cartImg from '../imgs/cart.png';
import * as API from '../services/api';
import NavBar from '../components/cartCounter';

class Home extends Component {
  constructor() {
    super();
    this.state = {
      search: '',
      products: [],
      counterProducts: 0,
    };
  }

  getApiQuery = async (search) => {
    const retornoApi = await getProductsFromQuery(search);
    this.setState({
      products: retornoApi.results,
    });
  };

  fetchProducts = async (query, categoryId = '') => {
    const requestProducts = await API.getProductsFromCategoryAndQuery(categoryId, query);
    this.setState({
      products: [...requestProducts.results],
    });
  };

  handleChange = ({ target }) => {
    this.setState({
      search: target.value,
    });
  };

  handleProducts = () => {
    const cartShop = JSON.parse(localStorage.getItem('product'));
    if (localStorage.length > 0) {
      this.setState({
        counterProducts:
          cartShop.map((price) => price.quantity).reduce((a, b) => a + b, 0),
      });
    }
  };

  render() {
    const { search, products, counterProducts } = this.state;
    return (
      <section>
        <Categories onClick={ this.fetchProducts } />
        <label
          data-testid="home-initial-message"
          htmlFor="input-search"
        >
          Digite algum termo de pesquisa ou escolha uma categoria.
          <input
            data-testid="query-input"
            type="text"
            id="input-search"
            onChange={ this.handleChange }
          />

        </label>
        <button
          type="button"
          data-testid="query-button"
          onClick={ () => this.getApiQuery(search) }
        >
          Pesquisa
        </button>
        <Link data-testid="shopping-cart-button" to="/cartShop">
          <img src={ cartImg } alt="carrinho" />
        </Link>
        <NavBar length={ counterProducts } />
        { products.map((product, index) => (<Card
          key={ index }
          product={ product }
          handleProducts={ this.handleProducts }
          shipping={ product.shipping }
        />)) }
      </section>
    );
  }
}

export default Home;
