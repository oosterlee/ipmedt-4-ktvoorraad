import React, { Component } from 'react';
import '../css/profile.css';
import {Redirect } from 'react-router-dom';
import apiClient from '../services/api';
import {callOnLoginCallbacks} from '../utils';

class Profile extends Component {
  constructor(props) {
    super(props);

		this.state = {
            id: "",
            name: "",
            email: "",
            address: "",
            housenumber: "",
            postalcode: "",
            get_user_done: false,
            logged_out: false,
            profile__wrapper: "block",
            profile__form: "none",
            password_form: "none",
            password_new: "",
            password_old: "",
		}
	}

    getUser() {
        if(this.state.get_user_done == false){
            apiClient.get('/api/user').then(response => {
                this.setState({id: response.data.id,
                                name: response.data.name,
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

    show_profile_edit(e){
        e.preventDefault();
        this.setState({profile__wrapper: "none", profile__form: "flex"});
    }

    show_password_reset(e){
        e.preventDefault();
        this.setState({profile__wrapper: "none", password_form: "flex"});
    }

    profile_edit(event){
        event.preventDefault(); //voorkomt dat de pagina refreshed
        apiClient.put("/api/user/update",
        {
            id: this.state.id,
            name: this.state.name,
            email: this.state.email,
            address: this.state.address,
            housenumber: this.state.housenumber,
            postalcode: this.state.postalcode,   
        }).then(response => {
            this.setState({profile__wrapper: "block", profile__form: "none"});
        });
    }

    reset_password(event){
        event.preventDefault();
        console.log(this.state.password_old);

        apiClient.put("/api/user/password", {
            id: this.state.id,
            password_old: this.state.password_old,
            password_new: this.state.password_new,
        }).then( response => {this.logout(); });
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
                <div style={{display: this.state.profile__wrapper, gridColumnStart: 2}}>
                    <p className="profile__info">Naam: {this.state.name}</p>
                    <p className="profile__info">Email: {this.state.email}</p>
                    <p className="profile__info">Adres: {this.state.address}</p>
                    <p className="profile__info">Huis nummer: {this.state.housenumber}</p>
                    <p className="profile__info">Postcode: {this.state.postalcode}</p>
                    <button className="profile__logout" onClick={this.logout.bind(this)}>Uitloggen</button>
                    <a className="profile_bewerken" href="#" onClick={e => this.show_profile_edit(e)}>Profiel bewerken</a>
                    <br></br>
                    <a className="profile_bewerken" href="#" onClick={e => this.show_password_reset(e)}>Wachtwoord aanpassen</a>
                </div>
                <form  className="profile__form" style={{display: this.state.profile__form, gridColumnStart: 2, padding: "2rem", alignItems: "center", flexDirection: "column"}} onSubmit={event => this.profile_edit(event)}>
                    <div className="profile__form__group">
						<label className="profile__form__label">Naam</label>
						<input className="profile__form__input" name="name" type="text" placeholder="Naam" required value={this.state.name} onChange={e => this.setState({ name: e.target.value })}/>
					</div>

                    <div className="profile__form__group">
						<label className="profile__form__label">Email</label>
						<input className="profile__form__input" name="email" type="email" placeholder="Email" required value={this.state.email} onChange={e => this.setState({ email: e.target.value })}/>
					</div>

                    <div className="profile__form__group">
						<label className="profile__form__label">Adres</label>
						<input className="profile__form__input" name="address" type="text" placeholder="Adres" required value={this.state.address} onChange={e => this.setState({ address: e.target.value })}/>
					</div>

                    <div className="profile__form__group">
						<label className="profile__form__label">Huis nummer</label>
						<input className="profile__form__input" name="housenumber" type="text" placeholder="Huis nummer" required value={this.state.housenumber} onChange={e => this.setState({ housenumber: e.target.value })}/>
					</div>

                    <div className="profile__form__group">
						<label className="profile__form__label">Postcode</label>
						<input className="profile__form__input" name="postalcode" type="text" placeholder="Postcode" required value={this.state.postalcode} onChange={e => this.setState({ postalcode: e.target.value })}/>
					</div>

                    <button className="profile__form__button" type="submit">Profiel Aanpassen</button>
                </form>

                <form  className="profile__form" style={{display: this.state.password_form, gridColumnStart: 2, padding: "2rem", alignItems: "center", flexDirection: "column"}} onSubmit={event => this.reset_password(event)}>
                    <div className="profile__form__group">
						<label className="profile__form__label">Oud wachtwoord</label>
						<input className="profile__form__input" name="password_old" type="password" placeholder="Oud wachtwoord" required onChange={e => this.setState({ password_old: e.target.value })}/>
					</div>

                    <div className="profile__form__group">
						<label className="profile__form__label">Niew wachtwoord</label>
						<input className="profile__form__input" name="password_new" type="password" placeholder="Nieuw wachtwoord" required onChange={e => this.setState({ password_new: e.target.value })}/>
					</div>

                    <button className="profile__form__button" type="submit">Wachtwoord Aanpassen</button>
                </form>
            </article>
		);
	}
}

export default Profile;