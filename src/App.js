import React, { Component } from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import CartShop from './pages/cartShop';
import Checkout from './pages/Checkout';
import Home from './pages/home';
import ListByCategory from './pages/ListByCategory';
import ProductDetails from './pages/ProductDetails';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/Checkout" component={ Checkout } />
          <Route exact path="/" component={ Home } />
          <Route exact path="/cartShop" component={ CartShop } />
          <Route
            exact
            path="/:category"
            render={ (props) => <ListByCategory { ...props } /> }
          />
          <Route
            exact
            path="/productDetails/:id"
            render={ (props) => <ProductDetails { ...props } /> }
          />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
