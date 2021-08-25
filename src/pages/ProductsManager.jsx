import React, { Component } from 'react';
import '../css/productsmanagement.css';

import { Link } from 'react-router-dom';
import axios from 'axios';
import ProductsAdmin from '../components/ProductsAdmin';


class Products extends Component {
	constructor(props) {
		super(props);

		this.state = {
			products: [],
			searchValue: "",
			renderProducts: [],
		};
	}

	componentDidMount(){
		this.makeApiCall();
	}

	makeApiCall = searchTerm => {
		axios.get((process.env.REACT_APP_BASE_URL || 'http://127.0.0.1:8000') + '/api/products').then(json => this.setState({ products: json.data, renderProducts: json.data }));
	}

	search(e){
		let searchValue = e.target.value;
		let products = this.state.products;
		let renderProducts = []
		products.forEach((item, i) => {
            if (JSON.stringify(item).toLowerCase().includes(searchValue.toLowerCase())) renderProducts.push(item);
        });
		console.log(e);
		this.setState({searchValue, renderProducts});
	}



	render() {
		return (
			<section className="adminProducts">
				
				<ul className="adminProducts__list">
					{
						this.state.renderProducts.map((item, i) => 
							<ProductsAdmin {...item} key={item.id} />
						)
					}
				</ul>
			</section>
		);
	}
}

export default Products;