import React, { Component } from 'react';

import BasicButton from '../components/BasicButton';

import DataContext from '../DataContext';


class ProductsItem extends Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		console.log(this.context);
		this.context.onCartChange(() => {console.log("CART CHANGE", this.context.cart)});
	}

	addToCart() {
		this.context.addProductToCart(this.props);
	}

	render() {
		return (
			<li className="products__list__item">
				<figure className="products__list__figure">
					<img
						src={ this.props.image || "https://www.dia.org/sites/default/files/No_Img_Avail.jpg" }
						alt={ this.props.title || "Plaatje niet beschikbaar" }
						className="products__item__image"
					/>
				</figure>
				<h2 className="products__item__title products__item__text--m1">{ this.props.title || "Product" }</h2>
				{/*<button className="products__item__button">In winkelwagen</button>*/}
				<BasicButton icon="cart-plus" className="products__item__button" onClick={this.addToCart.bind(this)} />
				{/*<p className="products__item__price products__item__text--m2">€{ this.props.price || "--" }</p>*/}
			</li>
		);
	}
}

ProductsItem.contextType = DataContext;

export default ProductsItem;