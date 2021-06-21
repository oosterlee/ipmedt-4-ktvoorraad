import React, { useState, Component } from "react";
import { NavLink } from "react-router-dom";
import { MenuList, LoggedInMenu } from "./MenuList";
import "./Navbar.css";

class Navbar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      clicked: false,
      menuList: [],
      login: localStorage.getItem("login"),
    };

    window.addEventListener("storage", () => {
      console.log("Storage changed", window.localStorage);
    });
  }

  componentDidMount() {
    // onMenuChange((newNavItems) => {
    //   let ml = this.mapMenuList(newNavItems);

    //   this.setState({menuList: ml});
    // });

    let ml;
    if (this.state.login === true) {
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

    return (
      <header classname="navbar">
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
