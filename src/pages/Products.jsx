import React, { Component } from 'react';
import '../css/products.css';
import axios from "axios";
import ListButton from '../components/ListButton';
import GridButton from '../components/GridButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


import { Link } from 'react-router-dom';

import ProductsItem from '../components/ProductsItem';
import Searchbar from "../components/Searchbar";
import BasicButton from '../components/BasicButton';




class Products extends Component {
	constructor(props) {
		super(props);

		this.state = {
			products: [],
			searchValue: "",
			renderProducts: [],
		};
	}

	componentDidMount() {
		this.makeApiCall();
	}

	makeApiCall = searchTerm => {
		const BASE_URL = "http://localhost:8000/api/products";
		axios.get((process.env.REACT_APP_BASE_URL || 'http://127.0.0.1:8000') + '/api/products').then(json => this.setState({ products: json.data, renderProducts: json.data }));
	}

	search(e) {
		let searchValue = e.target.value;
		let products = this.state.products;
		let renderProducts = []
		products.forEach((item, i) => {
			if (JSON.stringify(item).toLowerCase().includes(searchValue.toLowerCase())) renderProducts.push(item);
		});
		console.log(e);
		this.setState({ searchValue, renderProducts });
	}



	render() {
		return (
			<section className="products">
				<Searchbar value={this.state.searchValue} onChange={this.search.bind(this)} />
				<div className="products__button">
					<ListButton></ListButton>
					<GridButton>Grid</GridButton>
				</div>
				
				<ul className="products__list">
					{
						this.state.renderProducts.map((item, i) =>
							<ProductsItem {...item} key={item.id} />
						)
					}
				</ul>
				<Link to="/cart">My Cart</Link>
			</section>
		);
	}
}

export default Products;