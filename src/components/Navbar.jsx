import React, { Component } from 'react'
import { MenuItems } from '../components/NavbarMenuItems';
import '../css/Navbar.css';
import NavbarButton from '../components/NavbarButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class Navbar extends Component {

    state = { clicked: false }
    
    handleClick = () => {
        this.setState({clicked: !this.state.clicked})
    }
    render() {
        return(
            <nav className="NavbarItems">
                <h1 className="navbar-logo"><img className="homeButton" src="../images/heftruk" alt="missing icon" /></h1>

                <div className="menu-icon" onClick={this.handleClick}>
                    <i className={this.state.clicked ? 'fas fa-times' : 'fas fa-bars'}></i>
                </div>

                <ul className={this.state.clicked ? 'nav-menu active' : 'nav-menu'}>
                    {MenuItems.map((item, index) => {
                        return (
                            
                            <li key={index}>
                                <a className={item.cName} href={item.url} >
                                    {item.title}
                                </a>
                            </li>
                        )
                    })}
                </ul>
                <NavbarButton>Sign up</NavbarButton>
            </nav>
        )
    }
}

export default Navbar;