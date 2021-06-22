import React, { useState, Component } from "react";
import { NavLink } from "react-router-dom";
import { MenuList, LoggedInMenu } from "./MenuList";
import "./Navbar.css";
import {onLoginChange} from '../../utils';
import { textChangeRangeIsUnchanged } from "typescript";

class Navbar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      clicked: false,
      menuList: [],
      login: JSON.parse(localStorage.getItem("login")),
      old_login: false,
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
    let ml;
    if (this.state.login == true) {
      ml = this.mapMenuList(LoggedInMenu);
    } else {
      ml = this.mapMenuList(MenuList);
    }

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
    this.state.login = JSON.parse(localStorage.getItem("login"));
    if(this.state.login === this.state.old_login){
      this.getMenu();
    }
    this.state.old_login = !this.state.login;

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
