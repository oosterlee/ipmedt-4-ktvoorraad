import React, { Component } from 'react';
import '../css/products.css';

import {
	Redirect
} from 'react-router-dom';

import { tryLogin, isLoggedIn } from '../utils';

class Login extends Component {
	constructor(props) {
		super(props);

		this.state = {
			username: "",
			password: "",
			loading: false,
			loggedIn: isLoggedIn(),
		}
	}

	login(e) {
		e.preventDefault();
		const form = e.target.closest("form");
		if (!form) return;

		this.setState({ loading: true });

		tryLogin(this.state.username, this.state.password).then((res) => {
			console.log(res);
			this.setState({ loading: false, loggedIn: res.loggedIn });
		});
	}

	render() {
		if (this.state.loggedIn) {
			return (<Redirect to="/" />)
		}

		return (
			<form className="login" onSubmit={this.login.bind(this)}>
				<div className="login__group">
					<label>Username</label>
					<input type="text" placeholder="Username" value={this.state.username} onChange={(e) => this.setState({ username: e.target.value })} />
				</div>
				<div className="login__group">
					<label>Password</label>
					<input type="password" placeholder="Password" value={this.state.password} onChange={(e) => this.setState({ password: e.target.value })} />
				</div>

				{
					this.state.loading ?
					<input type="submit" value="Logging in..." onClick={this.login.bind(this)} disabled="disabled" />
					:
					<input type="submit" value="Login" onClick={this.login.bind(this)} />

				}
			</form>
		);
	}
}

export default Login;