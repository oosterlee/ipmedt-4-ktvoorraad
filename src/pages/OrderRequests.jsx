import React, { Component } from 'react';
import '../css/orderrequests.css';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

// import ProductsItem from '../components/ProductsItem';
// import DataContext from '../DataContext';

class OrderRequests extends Component {
	constructor(props) {
		super(props);
		
		this.state = {
			products: [],
			renderProducts: [],
			loading: true,
			loadingItem: [],
			animateItem: [],
		};

	}

	componentDidMount() {
		axios.get((process.env.REACT_APP_BASE_URL || 'http://127.0.0.1:8000') + '/api/orderrequests').then(json => this.setState({ products: json.data, renderProducts: json.data, loading: false }));
	}

	approve(id) {
		this.updateApproval(id, 1);
	}

	reject(id) {
		this.updateApproval(id, -1);
	}

	updateApproval(id, data) {
		let loadingItem = this.state.loadingItem;
		loadingItem.push(id);
		this.setState({ loadingItem });
		axios.put((process.env.REACT_APP_BASE_URL || 'http://127.0.0.1:8000') + '/api/orderrequests/' + id, { approved: data }).then(result => {
		// axios.put("http://localhost:8000/api/orderrequests/" + id, { approved: data }).then(result => {
			let products = [...this.state.products];

			for (let i = 0; i < products.length; i++) {
				if (products[i].id == id) {
					products.splice(i, 1);
					break;
				}
			}
			let animateItem = this.state.animateItem;
			animateItem.push(id);
			this.setState({ animateItem, products });
			setTimeout(() => {
				loadingItem = this.state.loadingItem;
				animateItem = this.state.animateItem;

				let index = -1;

				index = loadingItem.indexOf(id);
				if (index >= 0) loadingItem.splice(index, 1);

				index = animateItem.indexOf(id);
				if (index >= 0) animateItem.splice(index, 1);

				this.setState({ renderProducts: this.state.products, loadingItem, animateItem });
			}, 990);
		}).catch(e => {
			let index = loadingItem.indexOf(id);
			if (index >= 0) loadingItem.splice(index, 1);
			this.setState({ loadingItem });
		});
	}

	render() {
		if (this.state.loading) {
			return(<section><p>Loading... Please wait</p></section>);
		}

		if (this.state.products.length == 0) {
			return(<section><p className="text--center text--sm">Er zijn geen orderrequests.</p></section>);
		}

		return (
			<section>
				<table className="orderrequests">
					<thead>
						<tr>
							<th colSpan="2">Product informatie</th>
							<th colSpan="2">Persoon details</th>
							<th colSpan="2">Prijsinformatie</th>

							<th colSpan="1">Acties</th>
						</tr>
					</thead>
					<tbody>
						{
							this.state.renderProducts.map((item, i) => (
								<tr key={"tr_" + i} className={this.state.animateItem.includes(item.id) ? "orderrequests--fade" : ""}>
									<td className="key" colSpan="1" data-label="Product informatie">
										<p>Naam</p>
										<p>Merk</p>
										<p>Model</p>
										<p>Besteld op</p>
									</td>
									<td className="value" colSpan="1">
										<p>{item.product.productname}</p>
										<p>{item.product.brand}</p>
										<p>{item.product.model}</p>
										<p>{(new Date(item.created_at)).toLocaleDateString()}</p>
									</td>

									<td className="key" colSpan="1" data-label="Persoon details">
										<p>Naam</p>
										<p>Email</p>
										<p>Adres</p>
										<p>Postcode</p>
										<p>Huisnummer</p>
									</td>
									<td className="value" colSpan="1">
										<p><Link className="link" to={"/orderhistory/" + item.user_id}>{item.user.name}</Link></p>
										<p>{item.user.email}</p>
										<p>{item.user.address}</p>
										<p>{item.user.postalcode}</p>
										<p>{item.user.housenumber}</p>
									</td>

									<td className="key" colSpan="1" data-label="Prijsinformatie">
										<p>Prijs per</p>
										<p>Aantal</p>
										<p>Totaal</p>
									</td>
									<td className="value" colSpan="1">
										<p className="price">{Number(item.product.price).toFixed(2)}</p>
										<p>{item.amount}</p>
										<p className="price">{(Number(item.product.price) * item.amount).toFixed(2)}</p>
									</td>

									<td colSpan="1" data-label="Acties">
										<button {...(this.state.loadingItem.includes(item.id) ? {disabled: "disabled"} : {})} className="orderrequests__button orderrequests__button--approve" onClick={this.approve.bind(this, item.id)}>Goedkeuren</button>
										<button {...(this.state.loadingItem.includes(item.id) ? {disabled: "disabled"} : {})} className="orderrequests__button orderrequests__button--reject" onClick={this.reject.bind(this, item.id)}>Afkeuren</button>
									</td>
								</tr>
							))
						}
					</tbody>
				</table>
			</section>
		);
	}
}

// OrderHistory.contextType = DataContext;

export default OrderRequests;