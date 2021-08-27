import React, { Component } from 'react';
import '../css/products.css';
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Link } from 'react-router-dom';

import ProductsItem from '../components/ProductsItem';
import Searchbar from "../components/Searchbar";
import Loading from "../components/Loading";
import Category from '../components/Category';


class Products extends Component {
	constructor(props) {
		super(props);

		this.state = {
			products: [],
			searchValue: "",
			renderProducts: [],
			packs: [],
			renderPacks: [],
			loading: true,
			list: false,
		};
	}

	componentDidMount(){
		this.makeApiCall();
	}

	changeLayout() {
        this.setState({ list: !this.state.list })
        console.log("ik werk");
    }

	makeApiCall = searchTerm => {
		const BASE_URL = "http://localhost:8000/api/products";
		axios.get((process.env.REACT_APP_BASE_URL || 'http://127.0.0.1:8000') + '/api/products').then(json => this.setState({ products: json.data, renderProducts: json.data, loading: false }));
		axios.get((process.env.REACT_APP_BASE_URL || 'http://127.0.0.1:8000') + '/api/pack').then(json => this.setState({ packs: json.data, renderPacks: json.data, loading: false }));
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
		let layout__class = this.state.list ? "products__grid" : "products__list";
		if (this.state.loading) return(<Loading />);
		return (
			<section className="products">
				<Searchbar value={this.state.searchValue} onChange={this.search.bind(this)}/>
				<Category/>

				<div className="toggle">
					{/* <button className="toggle__button" onClick={(e) => this.changeLayout(e)}>
						Toggle Layout
					</button> */}
					<i className="fas fa-th listIcons"></i>
					<label className="switch toggle__button">
						<input type="checkbox" onClick={(e) => this.changeLayout(e)}/>
						<span class="slider round"></span>
					</ label>
					<i className="fas fa-list listIcons"></i>

            	</div>

				<ul className={layout__class}>
					{
						this.state.renderPacks.map((item, i) => 
							<ProductsItem {...item} key={item.id} isPack={true} />
						)
					}
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