import React, { Component } from 'react';
import '../css/productsmanagement.css';

import { Link } from 'react-router-dom';

import BasicButton from '../components/BasicButton';


class Products extends Component {
	constructor(props) {
		super(props);
		
		this.state = {
			products: [
				{ image: "image", title: "Product1" },
				{ image: undefined, title: "Product2" },
				{ image: undefined, title: "Product3" },
				{ image: undefined, title: "Product4" },
				{ image: undefined, title: "Product5" },
				{ image: undefined, title: "Product6" },
				{ image: undefined, title: "Product7" },
			],
			productsKeys: [
				"image",
				"title",
			],
			editProduct: false,
		};
	}

	removeProduct(item) {
		let products = this.state.products;

		const i = products.indexOf(item);

		if (i < 0) return;

		products.splice(i, 1);

		this.setState({ products });
	}

	editProduct(item) {
		let products = this.state.products;

		const i = products.indexOf(item);

		if (i === this.state.editProduct) {
			console.log("Done editing");
			return this.setState({ editProduct: false });
		}

		if (i < 0) return;

		this.setState({ editProduct: i });
	}

	onProductInfoChange(item, event) {
		let products = this.state.products;

		const i = products.indexOf(item);
		if (i < 0) return;

		products[i][event.target.getAttribute('data-key')] = event.target.value;

		this.setState({ products });
	}

	render() {
		return (
			<section className="productsmanagement">
				<table className="productsmanagement__table">
					<thead>
						<tr>
							{
								this.state.productsKeys.map((item) => (
									<th key={item}>{item}</th>
								))
							}
						</tr>
					</thead>

					<tbody>
						{
							this.state.products.map((item, i) => (
								<tr key={i}>
									{
										this.state.productsKeys.map((key, j) => (
											<td className="productsmanagement__col" key={key+j}>
												{
													i === this.state.editProduct ?
													<input
														defaultValue={item[key] || "-"}
														data-key={key}
														onChange={e => this.onProductInfoChange.bind(this, item, e)()}
														onKeyDown={e => {if (e.code == "Enter") this.editProduct.bind(this, item)();}} />
													:
													item[key] || "-"
												}
											</td>
										))
									}
									<td className="productsmanagement__col productsmanagement__col--fit-content"><BasicButton title={i === this.state.editProduct ? "Done" : "Edit"} onClick={this.editProduct.bind(this, item)} /></td>
									<td className="productsmanagement__col productsmanagement__col--fit-content"><BasicButton title="Remove" onClick={this.removeProduct.bind(this, item)} /></td>
								</tr>
							))
						}
					</tbody>
					
				</table>
			</section>
		);
	}
}

export default Products;