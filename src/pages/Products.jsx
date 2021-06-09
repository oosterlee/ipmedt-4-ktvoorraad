import React, { Component } from 'react';
import '../css/products.css';

import { Link } from 'react-router-dom';

import ProductsItem from '../components/ProductsItem';

import { getUserInfo } from '../utils';

class Products extends Component {
	constructor(props) {
		super(props);
		
		this.state = {
			products: [
				{ image: undefined, title: "Product1", verifyRequired: true },
				{ image: undefined, title: "Product2", verifyRequired: true },
				{ image: undefined, title: "Product3", verifyRequired: false, rule: "Maximaal 1 per jaar" },
				{ image: undefined, title: "Product4", verifyRequired: true },
				{ image: undefined, title: "Product5", verifyRequired: true },
				{ image: undefined, title: "Product6", verifyRequired: false, rule: "Maximaal 10 per jaar" },
				{ image: undefined, title: "Product7", verifyRequired: false, rule: "Maximaal 1 per jaar zonder goedkeuring" },
			],
		};
	}

	render() {
		return (
			<section className="products">
				<ul className="products__list">
					{
						this.state.products.map((item, i) => 
							<ProductsItem {...item} key={item.title} />
						)
					}
				</ul>
				<Link to="/cart">My Cart</Link>
			</section>
		);
	}
}

export default Products;