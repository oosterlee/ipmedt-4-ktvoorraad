import React, { Component } from 'react';
import '../css/profile.css';
import {Redirect } from 'react-router-dom';
import apiClient from '../services/api';
import {callOnLoginCallbacks} from '../utils';

class Profile extends Component {
  constructor(props) {
    super(props);

		this.state = {
			new_password: "",
            name: "",
            email: "",
            address: "",
            housenumber: "",
            postalcode: "",
            get_user_done: false,
            logged_out: false,
		}
	}

    getUser() {
        if(this.state.get_user_done == false){
            apiClient.get('/api/user').then(response => {
                this.setState({name: response.data.name,
                                email: response.data.email,
                                address: response.data.address,
                                housenumber: response.data.housenumber,
                                postalcode: response.data.postalcode,
                                get_user_done: true});
            }).catch(function (error){
                // this.setState({logged_out: true});
            });
        }
    }

    logout(){
        localStorage.setItem('token', null);
        localStorage.setItem('login', false);
        apiClient.defaults.headers.Authorization = null;
        this.setState({logged_out: true});
        localStorage.clear();
    }

	render() {
        this.getUser();

        if(this.state.logged_out === true){
            callOnLoginCallbacks();
            return (<Redirect to="/login"/>)
        }

		return (
            <article className="profile">
                <div className="profile__wrapper">
                    <p className="profile__info">Naam: {this.state.name}</p>
                    <p className="profile__info">Email: {this.state.email}</p>
                    <p className="profile__info">Adres: {this.state.address}</p>
                    <p className="profile__info">Huis nummer: {this.state.housenumber}</p>
                    <p className="profile__info">Postcode: {this.state.postalcode}</p>
                    <button className="profile__logout" onClick={this.logout.bind(this)}>Uitloggen</button>
                </div>
            </article>
		);
	}
}

export default Profile;