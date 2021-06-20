import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { MenuList } from "./MenuList";
import "./Navbar.css";

const Navbar = () => {
  const [clicked, setClicked] = useState(false);
  const menuList = MenuList.map(({ url, title }, index) => {
    return (
      <li key={index}>
        <NavLink exact to={url} activeClassName="active">
          {title}
        </NavLink>
      </li>
    );
  });

  const handleClick = () => {
    setClicked(!clicked);
  };

  return (
      <header classname="navbar">
          <nav>
            <div className="navbar__logo">
              <a href="/" className="navbar__redirect">Jung<font>heinrich</font></a>
            </div>
            <div className="navbar__menu-icon" onClick={handleClick}>
              <i className={clicked ? "fas fa-times" : "fas fa-bars"}></i>
            </div>
            <ul className={clicked ? "navbar__menu-list" : "navbar__menu-list close"}>{menuList}</ul>
          </nav>
      </header>
  );
};

export default Navbar;
