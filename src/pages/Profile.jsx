import React, { Component } from 'react';
import '../css/profile.css';
import {Redirect} from 'react-router-dom';
import apiClient from '../services/api';

class Login extends Component {
  constructor(props) {
    super(props);

		this.state = {
			new_password: "",
            name: "",
            email: "",
		}
	}

    getUser() {
        apiClient.get('/api/user').then(response => {
        });
    }

	render() {
        //TODO
        //check of gebruiker ingelogd is

		return (
            <article>
                <p>Naam</p>
                <p>email</p>
                <form action="">
                    
                </form>
            </article>
		);
	}
}

export default Profile;