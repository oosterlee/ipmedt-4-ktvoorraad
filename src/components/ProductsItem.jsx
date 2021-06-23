import React, { Component } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

import BasicButton from '../components/BasicButton';

import DataContext from '../DataContext';


class ProductsItem extends Component {
	constructor(props) {
		super(props);

		this.state = {
			showInfo: false,
			redirectTo: false,
		};
	}

	componentDidMount() {
		this.context.onCartChange(() => {console.log("CART CHANGE", this.context.cart)});
	}

	addToCart() {
		this.context.addProductToCart(this.props);
	}

	showInfo() {
		this.setState({ showInfo: true });
	}

	hideInfo() {
		this.setState({ showInfo: false });
	}

	render() {
		return (
			<li className="products__list__item">
				<Link to={"/product/" + this.props.id} className="link--no-style"><figure className="products__list__figure">
					<img
						src={ this.props.image || "https://www.dia.org/sites/default/files/No_Img_Avail.jpg" }
						alt={ this.props.title || "Plaatje niet beschikbaar" }
						className="products__item__image"
					/>
				</figure></Link>
				<div className="products__list__info-wrapper">
					<h2 className="products__item__title products__item__text--m1" { ...(this.state.showInfo ? { "data-info": "show" } : {}) } title={ this.props.rule || "Geen bestelregel" }>
						<Link to={"/product/" + this.props.id} className="link--no-style">{ this.props.title || "Product" }</Link>
					</h2>
					<FontAwesomeIcon icon="info-circle" className="products__item__info-icon" onMouseEnter={this.showInfo.bind(this)} onMouseLeave={this.hideInfo.bind(this)} />
					<p className="products__item__description">{ this.props.description || "Dit is een test beschrijving om te testen of alles wel een beetje past op de pagina. Ja mooie beschrijving, ik weet het." }</p>
					{/*<button className="products__item__button">In winkelwagen</button>*/}
					{
						this.props.verifyRequired ?
						<p className="products__item__verify-required">Goedkeuring vereist</p>
						:
						""
					}
					<BasicButton icon="cart-plus" className="products__item__button" onClick={this.addToCart.bind(this)} />
					{/*<p className="products__item__price products__item__text--m2">€{ this.props.price || "--" }</p>*/}
				</div>
			</li>
		);
	}
}

ProductsItem.contextType = DataContext;

export default ProductsItem;