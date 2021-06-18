import React, { Component } from 'react';
import '../css/profile.css';
import {Redirect } from 'react-router-dom';
import apiClient from '../services/api';

class Profile extends Component {
  constructor(props) {
    super(props);

		this.state = {
			new_password: "",
            name: "",
            email: "",
            get_user_done: false,
            logged_out: false,
		}
	}

    getUser() {
        if(this.state.get_user_done === false){
            apiClient.get('/api/user').then(response => {
                this.setState({name: response.data.name, email: response.data.email, get_user_done: true});
            });
        }
    }

    logout(){
        window.localStorage.setItem('token', null);
        apiClient.defaults.headers.Authorization = null;
        this.setState({logged_out: true});
    }

	render() {
        //TODO
        //check of gebruiker ingelogd is
        this.getUser();

        if(this.state.logged_out === true){
			return (<Redirect to="/login"/>)
        }

		return (
            <article>
                <p>Naam: {this.state.name}</p>
                <p>Email: {this.state.email}</p>
                <form action="">
                    <p>Password</p>
                    <div>
                        <label>Huidige wachtwoord</label>
                        <input type="password" placeholder="Huidig wachtwoord" />
                    </div>

                    <div>
                        <label>Nieuw wachtwoord</label>
                        <input type="password" placeholder="Nieuw wachtwoord" />
                    </div>
                </form>
                <button onClick={this.logout.bind(this)}>Uitloggen</button>
            </article>
		);
	}
}

export default Profile;