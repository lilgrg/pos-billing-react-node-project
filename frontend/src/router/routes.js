import React from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import Homepage from './pages/Homepage';
import ProductPage from './pages/ProductPage';
import CheckoutPage from './pages/CheckoutPage';
import LoginPage from './pages/LoginPage';
import PrivateRoute from './components/PrivateRoute';

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Homepage} />
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/products" component={ProductPage} />

        {/* Protected route for checkout, only accessible by authenticated users */}
        <PrivateRoute exact path="/checkout" component={CheckoutPage} />
      </Switch>
    </Router>
  );
};

export default Routes;