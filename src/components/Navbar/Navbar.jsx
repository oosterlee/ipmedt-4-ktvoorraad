import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import {
  MenuList,
  LoggedInUser,
  LoggedInAdmin,
  LoggedInManager,
} from "./MenuList";
import "./Navbar.css";
import "../Darkmode.js";
import { onLoginChange } from "../../utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class Navbar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      clicked: false,
      menuList: [],
      login: JSON.parse(localStorage.getItem("login")),
      old_login: false,
      role: localStorage.getItem("role"),
      userId: localStorage.getItem("userId"),
    };
  }

  componentDidMount() {
    onLoginChange(() => {
      console.log("onLoginChange");
      this.setState(
        {
          login: JSON.parse(localStorage.getItem("login")),
          role: localStorage.getItem("role"),
          userId: localStorage.getItem("userId"),
        },
        () => this.getMenu()
      );
    });

    this.getMenu();
  }

  getMenu() {
    let ml;
    let userRole = this.state.role;
    let loggedIn = this.state.login;
    console.log(userRole, loggedIn, this.state.userId);

    switch ((userRole, loggedIn)) {
      case userRole === "Medewerker" && loggedIn === true:
        ml = this.mapMenuList(LoggedInUser);
        break;

      case userRole === "Manager" && loggedIn === true:
        ml = this.mapMenuList(LoggedInManager);
        break;

      case userRole === "Admin" && loggedIn === true:
        ml = this.mapMenuList(LoggedInAdmin);
        break;

      default:
        ml = this.mapMenuList(MenuList);
    }

    this.setState({ menuList: ml });
  }

  mapMenuList(arr) {
    return arr.map(({ url, title, icon }, index) => {
      return (
        <li className="navbar__menu__item" key={index}>
          <NavLink className="navbar__menu__link"
            exact
            to={url.replace(":id", this.state.userId)}
            activeClassName="active"
          >
            <FontAwesomeIcon className="navbar__menu__link__icons" icon={icon}/>
            <div className="navbar__menu__link__icons-text">{title}</div>
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
          <div
            className="navbar__menu-icon"
            onClick={this.handleClick.bind(this)}
          >
            <i className={clicked ? "fas fa-times" : "fas fa-bars"}></i>
          </div>
          <div>
            <Darkmode/>
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
