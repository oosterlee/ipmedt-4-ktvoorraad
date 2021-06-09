import React, { Component } from 'react';
import '../css/create-user.css';

import { Link } from 'react-router-dom';

import { getUserInfo } from '../utils';

function CreateUser(){
  return(
    <div className="CreateUser">
      <h1>Registration</h1>
      <label>Ussername<label>
      <input type="text"/>
      <label>Password</label>
      <input type="text"/>
      <button>Register</button>
    </div>
    <div className="CreateUserNotes">
    </div>
  )
}
export default CreateUser;
