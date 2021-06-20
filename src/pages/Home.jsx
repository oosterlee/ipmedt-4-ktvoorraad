import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";

import PrivateRoute from '../components/PrivateRoute';

import '../css/main.css'

import Products from './Products';
import Login from './Login';
import ShoppingCart from './ShoppingCart';
import ProductsManager from './ProductsManager';
import AddProducts from './AddProducts';
import CreateUser from './CreateUser';
<<<<<<< HEAD
import Profile from './Profile';

=======
import OrderRequests from './OrderRequests';
import OrderHistory from './OrderHistory';
import Navbar from "../components/Navbar/Navbar";
>>>>>>> dev

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
    };
  }

	render() {
		return (
				<Router>
				<Navbar />
					<Switch>
						<PrivateRoute exact path="/products">
							<Products />
						</PrivateRoute>

            <Route exact path="/cart">
              <ShoppingCart />
            </Route>
            <Route exact path="/toevoegen">
              <AddProducts />
            </Route>

            			<Route exact path="/createuser">
							<CreateUser />
						</Route>

            <Route exact path="/login">
              <Login />
            </Route>

            <Route exact path="/">
              {/* TODO: Redirect to dashboard?? */}
              <Redirect to="/products" />
            </Route>

            <PrivateRoute exact path="/management/products">
              <ProductsManager />
            </PrivateRoute>

            <PrivateRoute exact path="/management/orderrequests">
              <OrderRequests />
            </PrivateRoute>

            <PrivateRoute exact path="/orderhistory/:id" component={OrderHistory} />

            <PrivateRoute exact path="/profile">
              <Profile />
            </PrivateRoute>
            
            <Link to="/management/products">Management</Link>
          </Switch>
        </Router>
    );
  }
}

export default Home;