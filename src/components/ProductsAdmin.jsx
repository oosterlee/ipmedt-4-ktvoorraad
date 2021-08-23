import React, { Component } from 'react';

import { Link } from 'react-router-dom';
import '../css/adminproducts.css';



import DataContext from '../DataContext';


class adminProductsAdmin extends Component {
	constructor(props) {
		super(props);

		this.state = {
			showInfo: false,
			redirectTo: false,
		};
	}
	

	render() {
		return (
			<li className="adminProducts__list__item">
				
					<figure className="adminProducts__list__figure">
					<img
						src={(process.env.REACT_APP_BASE_URL || 'http://127.0.0.1:8000') + this.props.image || "https://www.dia.org/sites/default/files/No_Img_Avail.jpg" }
						alt={ this.props.title || "Plaatje niet beschikbaar" }
						className="adminProducts__item__image"
					/>
				</figure>
				<div className="adminProducts__list__info-wrapper">
					<h2 className="adminProducts__item__title adminProducts__item__text--m1" { ...(this.state.showInfo ? { "data-info": "show" } : {}) }>
						{ this.props.brand + " " +  this.props.model }
					</h2>		
					</div>
					
					<button className="adminProducts__item__button">
					<Link to={"/product/" + this.props.id}>
						Product aanpassen
						</Link>
					</button>
			</li>
		);
	}
}

adminProductsAdmin.contextType = DataContext;

export default adminProductsAdmin;