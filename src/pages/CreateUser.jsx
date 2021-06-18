import React, { Component } from 'react';
import '../css/main.css';
import '../css/create_user.css';
import apiClient from '../services/api';

import { Link } from 'react-router-dom';

import { getUserInfo } from '../utils';

class CreateUser extends Component{
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      conf_password: "",
      adress: "",
      house_number: "",
      zip_code: "",
      error_mesage: "",
    }
  }

  register_webtoken(event){
		event.preventDefault(); //voorkomt dat de pagina refreshed
    const emailJH = this.state.email.split("@"); // check of email van JH is
    const special_char = new RegExp(/[~`!#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?]/); //special chars

    if(emailJH[1] !== "jungheinrich.nl"){
      this.setState({error_mesage: "Gebruik een Jungheinrich email"});
      return;
    }

    else if(this.state.password !== this.state.conf_password){ //check of wachtwoorden overeen komen
      this.setState({error_mesage: "Wachtwoorden komen niet overeen"});
      return;
    }

    else if (this.state.password.length < 6 || special_char.test(this.state.password)){
      this.setState({error_mesage: "Een wachtwoord moet minimaal 6 letters lang zijn en een special teken hebben"});
    }

    else {
      this.setState({error_mesage: null});
    }
		// 	apiClient.post("/api/register",
		// 	{//stuurt een post request naar de API
		// 			email: this.state.email, //De eerste email moet overeen komen met de naam in de db. De tweede email is van de states dus de daat werkelijke waarde
		// 			password: this.state.password} //password het zelfde verhaal als email
		// 		).then(response =>{ //Op het moment is er een CSRF token mismatch error dit is een safety iets van laravel maar dit betekent wel dat de req bij de API binnekomt
		// 			this.setState({loggedIn: true, token: response.data});
    //
		// });
	}

  render (){
    return(
      <main className="create_user">
        <h1>Registration</h1>
        <form className="create_user__form"  onSubmit={event => this.register_webtoken(event)}>
          <div className="create_user__form__group">
            <label>Email:</label>
            <input type="email"
            placeholder="Work Email"
            required
            value={this.state.email}
            onChange={(e) => this.setState({ email: e.target.value })}/>
          </div>
          <div className="create_user__form__group">
            <label>Wachtwoord:</label>
            <input type="password"
            placeholder="Password.."
            required
            value={this.state.password}
            onChange={(e) => this.setState({ password: e.target.value })}/>
          </div>
          <div className="create_user__form__group">
            <label>Herhaal wachtwoord:</label>
            <input type="password"
            placeholder="Confirm Password.."
            required
            value={this.state.conf_password}
            onChange={(e) => this.setState({ conf_password: e.target.value })}/>
          </div>
          <div className="create_user__form__group">
            <label>Adres:</label>
            <input type="Adress"
            placeholder="Voorbeeldstraat"
            required
            value={this.state.adress}
            onChange={(e) => this.setState({ adress: e.target.value })}/>
          </div>
          <div className="create_user__form__group">
          <label>Huisnummer:</label>
            <input type="text"
            placeholder="1a"
            required
            value={this.state.house_number}
            onChange={(e) => this.setState({ house_number: e.target.value })}/>
          </div>
          <div className="create_user__form__group">
            <label>Postcode:</label>
            <input type="zip_code"
            placeholder="1234AB"
            required
            value={this.state.zip_code}
            onChange={(e) => this.setState({ zip_code: e.target.value })}/>
          </div>
          <div>
            <label>Kies rol:</label>
            <input list="user_role"/>
            <datalist id="user_role">
              <option value="Manager"/>
              <option value="Medewerker"/>
            </datalist>
          </div>
          <input type="submit"/>
        </form>
        <p id="create_user__form__notes">{this.state.error_mesage}</p>
      </main>
    );
  }
}

export default CreateUser;
