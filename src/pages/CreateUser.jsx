import React, { Component } from 'react';
import '../css/main.css';
import '../css/create-user.css';

import { Link } from 'react-router-dom';

import { getUserInfo } from '../utils';

class CreateUser extends Component{
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
    }
  }

  render (){
    return(
      <main className="create-user">
        <div className="create-user--form">
          <h1>Registration</h1>
          <label>Username</label>
          <input type="text"
          placeholder="Work Email"/>
          <label>Password</label>
          <input type="text" placeholder="Password.."/>
          <label>Confirm Password</label>
          <input type="text" placeholder="Confirm Password.."/>
          <button>Register</button>
        </div>
        <div className="create-user__notes">
        </div>
        <h1>Registration</h1>
        <form action="LEEG" className="create-user--form">
          <div className="create-user--form--group">
            <label>Email</label>
            <input type="email"
            placeholder="Work Email"
            required
            value={this.state.email}
            onChange={(e) => this.setState({ email: e.target.value })}/>
          </div>
          <div className="create-user--form--group">
            <label>Password</label>
            <input type="password"
            placeholder="Password.."
            required value={this.state.password}
            onChange={(e) => this.setState({ password: e.target.value })}/>
          </div>
          <div className="login__form__group">
            <label>Confirm Password</label>
            <input type="password" placeholder="Confirm Password.."/>
          </div>
          <div>
            <label for="browser">Kies rol:</label>
            <datalist>
              <option value="Piemol"/>
              <option value="Niet Piemol"/>
            </datalist>
          </div>
            <input type="submit"/>

        </form>
      </main>
    );
  }
}

export default CreateUser;
