import React, { Component } from 'react';
import '../css/shoppingcart.css';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import ProductsItem from '../components/ProductsItem';
import DataContext from '../DataContext';

import apiClient from '../services/api';

class ShoppingCart extends Component {
	constructor(props) {
		super(props);

		this.state = {
			cart: [],
			ordering: false,
			orderingMsg: 'Bezig met verwerken...',
			ordered: false,
		};
	}

	componentDidMount() {
		this.setState({ cart: this.context.cart });
		this.context.onCartChange(() => {
			this.setState({ cart: this.context.cart });
			console.log(this.context.cart);
		});
	}

	order() {
		this.setState({ ordering: true });
		console.log("ORDERING", this.context.cart);
		let productsToOrder = this.context.cart.map((item) => {
			return { product_id: item.id, amount: item.amount };
		});

		console.log(productsToOrder);

		apiClient.post("api/orderproducts/store", productsToOrder).then(response => {
			this.setState({ ordering: false, cart: [], ordered: true });
			this.context.cart = [];
			this.context.__callCartCallbacks();
		}).catch(error => {
			this.setState({ ordering: false, ordered: false, errorMsg: "Sorry, het is niet gelukt. Probeer het opnieuw." });
		});
	}
	

	render() {
		if (this.state.ordered) {
			return(
				<section className="shoppingcart">
					<p className="shoppingcart_noitems shoppingcart_noitems--ordered"><FontAwesomeIcon icon="check-circle" /> De producten zijn bij de IT afdeling gelegd om goedgekeurd te worden.</p>
				</section>
			);
		}
		if (this.state.cart.length <= 0) {
			return (
				<section className="shoppingcart">
					<p className="shoppingcart_noitems">De winkelwagen is leeg.</p>
				</section>
			);
		}
		return (
			<section className="products">
				{
					this.state.errorMsg ?
					<h2>Error. { this.state.errorMsg }</h2>
					:
					""
				}
				<ul className="products__list">
					{
						this.state.cart.map((item, i) => 
							<ProductsItem {...item} key={item.title + i} cart={true} />

						)
					}
				</ul>
				<a className="create-form__btn"><button className="products__order__button" type="submit" onClick={this.order.bind(this)} {...(this.state.ordering ? {disabled: 'disabled'} : {})}>{ this.state.ordering ? this.state.orderingMsg : "Bestellen" }</button></a>
			</section>
		);
	}
}

ShoppingCart.contextType = DataContext;

export default ShoppingCart;