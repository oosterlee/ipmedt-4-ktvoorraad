import React, { Component } from 'react';
import '../css/login.css';
import {Redirect} from 'react-router-dom';
import apiClient from '../services/api';
import {callOnLoginCallbacks} from '../utils';
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
				).then(response =>{ 
					this.setState({loggedIn: true, token: response.data});
		}).catch(function (error){
			if(error.response){
				const error_message = document.getElementById("login__error");
				error_message.style.display = "block";
				error_message.innerHTML = error.response.data.message;
				error_message.classList.remove("login__error--remove");
				void error_message.offsetWidth;
				error_message.classList.add("login__error--show");
			}
		});
	}

	display_error(){
		const error_message = document.getElementById("login__error");
		error_message.classList.remove("login__error--show");
		void error_message.offsetWidth;
		error_message.classList.add("login__error--remove");
	}

	render() {
		const {username, password, isChecked} = this.state;
		if (this.state.loggedIn === true) {
			console.log(this.state.token.token);
			window.localStorage.setItem('token', this.state.token.token);
			// Gets update when a user is logged.

			window.localStorage.setItem('login', true);
			apiClient.defaults.headers.Authorization = "Bearer " + this.state.token.token;
			
			apiClient
			.get("/api/user")
			.then((response) => {
			console.log(response.data.role);
			localStorage.setItem("role",response.data.role);
			localStorage.setItem("userId",response.data.id);
			callOnLoginCallbacks(); 

			}).catch(function (error) {
			console.log("er gaat iets fouts", error)

			});
			callOnLoginCallbacks();
			return (<Redirect to="/products" />)
		}


		return (
			<article className="login">
				<section className="login__header">
					<figure className="login__header__figure">
						<img className="login__header__img" src="./JH_Logo.png" alt="Logo van Jungheinrich" /> {/* temp logo */}
					</figure>
					<h2 className="login__header__sub-title">Inloggen</h2>
				</section>

				<form className="login__form" onSubmit={event => this.login_webtoken(event)}>
					<p onClick={this.display_error} id="login__error">ERROR MESSAGE</p>
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