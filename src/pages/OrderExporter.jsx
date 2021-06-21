import React, { Component } from 'react';
import '../css/orderrequests.css';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

import BasicButton from '../components/BasicButton';

// import ProductsItem from '../components/ProductsItem';
// import DataContext from '../DataContext';

class OrderExporter extends Component {
	constructor(props) {
		super(props);
		
		this.state = {
			days: [],
			loading: true,
		};

		axios.get("http://localhost:8000/api/export/days").then(json => this.setState({ days: json.data.reverse(), loading: false }));
	}

	componentDidMount() {
		console.log(this.state);
	}

	render() {
		console.log(this.state);
		if (this.state.loading) {
			return(<section><p>Loading... Please wait</p></section>);
		}

		if (this.state.days.length == 0) {
			return(<section><p className="text--center text--sm">Er zijn nog geen downloads beschikbaar.</p></section>);
		}

		return (
			<section className="exports">
				{
					this.state.days.map((item, i) => (
						<a href={"http://localhost:8000/api/export/" + item.date} className="button exports__button" key={"export_" + i}>{item.date + " (" + item.count + ")"}</a>
					))
				}
			</section>
		);
	}
}

// OrderHistory.contextType = DataContext;

export default OrderExporter;