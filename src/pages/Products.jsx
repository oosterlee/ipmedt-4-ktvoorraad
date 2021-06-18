import React, { Component } from 'react';
import '../css/products.css';
import axios from "axios";

import { Link } from 'react-router-dom';

import ProductsItem from '../components/ProductsItem';
import Searchbar from "../components/Searchbar";

import { getUserInfo } from '../utils';
import apiClient from '../services/api';


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
    const BASE_URL = "http://localhost:8001/api/products";
    axios.get(BASE_URL).then(json => this.setState({ products: json.data, renderProducts: json.data }));
    
    };

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
      <section className="products">
        <Searchbar value={this.state.searchValue} onChange={this.search.bind(this)}/>
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