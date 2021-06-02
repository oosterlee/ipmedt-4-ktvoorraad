import React, { Component } from 'react';
import '../css/login.css';

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
			<article className="login">
				<section className="login__header">
					<figure className="login__header__figure">
						<img className="login__header__img" src="https://img.via-mobilis.com/1/jungheintich_logo_401.jpg" alt="Logo van Jungheinrich" /> {/* temp logo */}
					</figure>
					<h2 className="login__header__sub-title">Inloggen</h2>
				</section>
				<form className="login__form" onSubmit={this.login.bind(this)}>
					<div className="login__form__group">
						<label className="login__form__label">E-mailadres</label>
						<input className="login__form__input" type="email" placeholder="E-mail" required value={this.state.username} onChange={(e) => this.setState({ username: e.target.value })}/>
					</div>
					<div className="login__form__group">
						<label className="login__form__label">Wachtwoord</label>
						<input className="login__form__input" type="password" placeholder="Wachtwoord" required value={this.state.password} onChange={(e) => this.setState({ password: e.target.value })}/>
					</div>

					{
						this.state.loading ?
						<input className="login__form__submit" type="submit" value="Logging in..." onClick={this.login.bind(this)} disabled="disabled" />
						:
						<input className="login__form__submit" type="submit" value="Login" onClick={this.login.bind(this)} />

					}
				</form>

				<section className="login__forgot">
					<p className="login__forgot__p"><a className="login__forgot__a" href="https://www.google.com/">Wachtwoord</a> vergeten?</p>
					<p className="login__forgot__p"><a className="login__forgot__a" href="https://www.google.com/theapot">E-mailadres</a> vergeten?</p>
				</section>
			</article>
		);
	}
}

export default Login;