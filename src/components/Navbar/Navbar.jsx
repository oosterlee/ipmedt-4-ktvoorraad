import React, { useState, Component } from "react";
import { NavLink } from "react-router-dom";
import { MenuList, LoggedInMenu, LoggedInManager, LoggedInAdmin } from "./MenuList";
import "./Navbar.css";
import {onLoginChange} from '../../utils';
import { textChangeRangeIsUnchanged } from "typescript";
import apiClient from '../../services/api';

class Navbar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      clicked: false,
      menuList: [],
      login: JSON.parse(localStorage.getItem("login")),
    };
    
  }

  
  componentDidMount() {
    
    onLoginChange(() => {
      this.setState({
        login: JSON.parse(localStorage.getItem("login")),

      }, () => this.getMenu());

    });
    
    this.getMenu();
  }

  getMenu(){
     // if(response.data.role == "Admin"){
        
      // }
    
      // else if(response.data.role == "Manager"){
      //   ml = this.mapMenuList(LoggedInManager);
      //   console.log(ml)
      // }
    let ml; 
    apiClient.get("/api/user").then(response => {

      
      console.log(response);

      if (this.state.login == true && response.data.role == "Admin") {
        ml = this.mapMenuList(LoggedInAdmin);
      }
  
      else if(this.state.login == true && response.data.role == "Manager") {
        ml = this.mapMenuList(LoggedInManager);
      }
      
      else {
        ml = this.mapMenuList(MenuList);
      }

    }).catch(function (error){
      // this.setState({logged_out: true});
    });

    this.setState({ menuList: ml });
  }

  mapMenuList(arr) {
    return arr.map(({ url, title }, index) => {
      return (
        <li key={index}>
          <NavLink exact to={url} activeClassName="active">
            {title}
          </NavLink>
        </li>
      );
    });
  }

  handleClick(e) {
    this.setState({ clicked: !this.state.clicked });
  }

  render() {
    const clicked = this.state.clicked;
    const menuList = this.state.menuList;

    return (
      <header className="navbar">
        <nav>
          <div className="navbar__logo">
            <a href="/" className="navbar__redirect">
              Jung<font>heinrich</font>
            </a>
          </div>
          <div className="navbar__menu-icon" onClick={this.handleClick.bind(this)}>
            <i className={clicked ? "fas fa-times" : "fas fa-bars"}></i>
          </div>
          <ul
            
            className={
              clicked ? "navbar__menu-list" : "navbar__menu-list close"
            }
          >
            {menuList}
          </ul>
        </nav>
      </header>
    );
  }
}

export default Navbar;
