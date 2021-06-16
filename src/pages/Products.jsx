import React, { Component } from 'react';
import '../css/products.css';

import { Link } from 'react-router-dom';

import ProductsItem from '../components/ProductsItem';

import { getUserInfo } from '../utils';
import apiClient from '../services/api';


class Products extends Component {
	constructor(props) {
		super(props);
		
		this.state = {
			products: [
				{ image: undefined, title: "Product1" },
				{ image: undefined, title: "Product2" },
				{ image: undefined, title: "Product3" },
				{ image: undefined, title: "Product4" },
				{ image: undefined, title: "Product5" },
				{ image: undefined, title: "Product6" },
				{ image: undefined, title: "Product7" },
			],
		};
	}

	render() {
		apiClient.get('/api/user').then(response => {
			console.log(response);
		});
		return (
			<section className="products">
				<ul className="products__list">
					{
						this.state.products.map((item, i) => 
							<ProductsItem {...item} key={item.title + i} />
						)
					}
				</ul>
				<Link to="/cart">My Cart</Link>
			</section>
		);
	}
}

export default Products;