import React, { Component } from 'react';
import '../css/products.css';
import axios from "axios";

import { Link } from 'react-router-dom';

import ProductsItem from '../components/ProductsItem';
import Searchbar from "../components/Searchbar";

import { getUserInfo } from '../utils';

class Products extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      products: [],
    };
  }

  componentDidMount(){
    this.makeApiCall();
    }

  makeApiCall = searchTerm => {
    const BASE_URL = "http://localhost:8001/api/products";
    axios.get(BASE_URL).then(json => this.setState({ products: json.data }));
    
    };



  render() {
    return (
      <section className="products">
        <Searchbar onSubmit={this.makeApiCall}/>
        <ul className="products__list">
          {
            this.state.products.map((item, i) => 
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