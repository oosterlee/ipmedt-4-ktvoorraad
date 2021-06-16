import React, { Component } from 'react';
import '../css/main.css';
import '../css/create-user.css';

import { Link } from 'react-router-dom';

import { getUserInfo } from '../utils';

class CreateUser extends Component{

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
      </main>
    );
  }
}

export default CreateUser;
