import React, { Component } from 'react'
import '../css/products.css';

import {
  Route,
  Redirect,
} from "react-router-dom";

import {
	tryLogin,
	isLoggedIn,
	getToken,
	tryLoginWithToken
} from '../utils';

class PrivateRoute extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: !isLoggedIn(),
			loggedIn: isLoggedIn(),
		};

		console.log(this.props);
	}

	componentDidMount() {
		this.checkLogin();
	}

	checkLogin() {
		console.log("Check");
		if (!isLoggedIn()) {
			tryLoginWithToken().then((res) => {
				if (res.loggedIn) this.setState({ loading: false, loggedIn: true });
				else this.setState({ loading: false });
			});
		}
	}

	render() {
		if (this.state.loading) {
			// TODO: Show a loading page
			return (<p>Loading...</p>);
		}
		if (!this.state.loggedIn && !this.state.loading) {
			return (<Redirect to="/login" />);
		}

		return (
			<Route {...this.props}>
				{this.props.children}
			</Route>
		);
	}
}

export default PrivateRoute;