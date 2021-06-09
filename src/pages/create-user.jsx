import React, { Component } from 'react';
import '../css/create-user.css';

import { Link } from 'react-router-dom';

import { getUserInfo } from '../utils';

function CreateUser(){

  const [UsernameReg, setUsernameReg] = useState("")
  const [PasswordReg, setPasswordReg] = useState("")

  return(
    <div className="CreateUser">
      <h1>Registration</h1>
      <label>Ussername<label>
      <input type="text"
      placeholder="Work Email"
      onChange={(e) => {
        setUsernameReg(e.target.value)
        }}
      />
      <label>Password</label>
      <input type="text" placeholder="Password.."
      onChange={(e) => {
        setPasswordReg(e.target.value)
        }}
      />
      <label>Confirm Password</label>
      <input type="text" placeholder="Confirm Password.."/>
      <button>Register</button>
    </div>
    <div className="CreateUserNotes">
    </div>
  )
}
export default CreateUser;
