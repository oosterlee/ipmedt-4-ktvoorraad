import React, { Component } from 'react';
import '../css/orderrequests.css';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, useParams } from 'react-router-dom';
import Loading from '../components/Loading';

// import ProductsItem from '../components/ProductsItem';
// import DataContext from '../DataContext';

class OrderHistory extends Component {
	constructor(props) {
		super(props);
		
		this.state = {
			products: [],
			renderProducts: [],
			loading: true,
			sortBy: "time",
		};

	}

	componentDidMount() {
		this.setState({ loading: true });
		axios.get((process.env.REACT_APP_BASE_URL || 'http://127.0.0.1:8000') + '/api/orderhistory/' + (this.props.match.params.id || 1)).then(json => this.setState({ products: json.data, renderProducts: json.data.sort(this.sortProducts.bind(this)), loading: false }));
	}

	sortProducts(el1, el2) {
		if (this.state.sortBy == "time") {
			let el1Time = new Date(el1.created_at).getTime();
			let el2Time = new Date(el2.created_at).getTime()
			return (el1Time < el2Time) ? 1 : ((el1Time > el2Time) ? -1 : 0);
		}
	}

	render() {
		console.log(this.state);
		if (this.state.loading !== false) {
            return (<Loading />);
        }

		if (this.state.products.length == 0) {
			return(<section><p className="text--center text--sm">Deze gebruiker heeft nog geen producten besteld.</p></section>);
		}

		return (
			<section>
				<table className="orderrequests">
					<thead>
						<tr>
							<th colSpan="2">Product informatie</th>
							<th colSpan="2">Verzendinformatie</th>

							<th colSpan="1">Status</th>
						</tr>
					</thead>
					<tbody>
						{
							this.state.renderProducts.map((item, i) => (
								<tr key={"tr_" + i}>
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

									<td colSpan="1" data-label="Acties" className={item.approved == 0 ? "or-wait" : (item.approved == 1) ? "or-approved" : "or-rejected"}>
										<p>{item.approved == 0 ? "In afwachting" : (item.approved == 1) ? "Goedgekeurd" : "Afgekeurd"}</p>
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

export default OrderHistory;