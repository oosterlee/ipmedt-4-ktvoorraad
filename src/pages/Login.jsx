import React, { Component } from 'react';
import '../css/login.css';
import {Redirect} from 'react-router-dom';
import apiClient from '../services/api';

class Login extends Component {
	constructor(props) {
		super(props);

		this.state = {
			email: "",
			password: "",
			loggedIn: false,
			token: "",
		}
	}
	
	login_webtoken(event){
		event.preventDefault(); //voorkomt dat de pagina refreshed
			apiClient.post("/api/login", 
			{//stuurt een post request naar de API
					email: this.state.email, //De eerste email moet overeen komen met de naam in de db. De tweede email is van de states dus de daat werkelijke waarde
					password: this.state.password} //password het zelfde verhaal als email
				).then(response =>{ //Op het moment is er een CSRF token mismatch error dit is een safety iets van laravel maar dit betekent wel dat de req bij de API binnekomt 
					this.setState({loggedIn: true, token: response.data});
				
		});
	}

	render() {
		const {username, password, isChecked} = this.state;
		if (this.state.loggedIn === true) {
			window.localStorage.setItem('token', this.state.token.token);
			apiClient.defaults.headers.Authorization = "Bearer " + this.state.token.token;
			return (<Redirect to="/products" />)
		}


		return (
			<article className="login">
				<section className="login__header">
					<figure className="login__header__figure">
						<img className="login__header__img" src="https://img.via-mobilis.com/1/jungheintich_logo_401.jpg" alt="Logo van Jungheinrich" /> {/* temp logo */}
					</figure>
					<h2 className="login__header__sub-title">Inloggen</h2>
				</section>
				<form className="login__form" onSubmit={event => this.login_webtoken(event)}>
					<div className="login__form__group">
						<label className="login__form__label">E-mailadres</label>
						<input className="login__form__input" name="name" type="email" placeholder="E-mail" required value={username} onChange={e => this.setState({ email: e.target.value })}/>
					</div>
					<div className="login__form__group">
						<label className="login__form__label">Wachtwoord</label>
						<input className="login__form__input" name="password" type="password" placeholder="Wachtwoord" required value={password} onChange={e => this.setState({ password: e.target.value })}/>
					</div>
					<input className="login__form__submit" type="submit" value="Login"/>
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