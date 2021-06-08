import React, { Component } from 'react';
import '../css/shoppingcart.css';

import ProductsItem from '../components/ProductsItem';
import DataContext from '../DataContext';

class ShoppingCart extends Component {
	constructor(props) {
		super(props);

		this.state = {
			cart: [],
		}
	}

	componentDidMount() {
		this.setState({ cart: this.context.cart });
		this.context.onCartChange(() => {
			this.setState({ cart: this.context.cart });
		});
	}

	render() {
		if (this.state.cart.length <= 0) {
			return (
				<section class="shoppingcart">
					<p class="shoppingcart_noitems">Je hebt niks in de winkelwagen zitten.</p>
				</section>
			);
		}
		return (
			<section className="products">
				<ul className="products__list">
					{
						this.state.cart.map((item, i) => 
							<ProductsItem {...item} key={item.title + i} />
						)
					}
				</ul>
			</section>
		);
	}
}

ShoppingCart.contextType = DataContext;

export default ShoppingCart;