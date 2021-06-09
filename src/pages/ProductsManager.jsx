import React, { Component } from 'react';
import '../css/productsmanagement.css';

import { Link } from 'react-router-dom';

import BasicButton from '../components/BasicButton';
import ProductsTableRow from '../components/ProductsTableRow';


class Products extends Component {
	constructor(props) {
		super(props);
		
		this.state = {
			products: [
				{ image: "image", productname: "Product1" },
				{ image: undefined, productname: "Product2" },
				{ image: undefined, productname: "Product3" },
				{ image: undefined, productname: "Product4" },
				{ image: undefined, productname: "Product5" },
				{ image: undefined, productname: "Product6" },
				{ image: undefined, productname: "Product7" },
			],
			productKeys: [
				{item: "image", name: "Plaatje", type: "image"},
				{item: "productname", name: "Productnaam", type: "text"},
				{item: "category", name: "Categorie", type: "dropdown", dropdownItems: ["1", "2", "3"]},
				{item: "brand", name: "Merk", type: "text"},
				{item: "model", name: "Model", type: "text"},
				{item: "approval", name: "Goedkeuring", type: "dropdown", dropdownItems: ["Rege"]},
			],
			editProduct: false,
		};
	}

// category
// productname
// brand
// model
// price
// maximum
// condition
// approval

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
		console.log(this.state.products);
		return (
			<section className="productsmanagement">
				<table className="productsmanagement__table">
					<thead>
						<tr>
							{
								this.state.productKeys.map((item) => (
									<th key={item.item}>{item.name}</th>
								))
							}
						</tr>
					</thead>

					<tbody>
						{
							this.state.products.map((item, i) => (
								<ProductsTableRow
									key={"ptr_" + i}
									product={item}
									onProductInfoChange={this.onProductInfoChange}
									productKeys={this.state.productKeys}
								/>
							))
						}
					</tbody>
					
				</table>
			</section>
		);
	}
}



// {
// 							this.state.products.map((item, i) => (
// 								<tr key={i}>
// 									{
// 										this.state.productsKeys.map((key, j) => (
// 											<td className="productsmanagement__col" key={key+j}>
// 												{
// 													i === this.state.editProduct ?
// 													<input
// 														defaultValue={item[key] || "-"}
// 														data-key={key}
// 														onChange={e => this.onProductInfoChange.bind(this, item, e)()}
// 														onKeyDown={e => {if (e.code == "Enter") this.editProduct.bind(this, item)();}} />
// 													:
// 													item[key] || "-"
// 												}
// 											</td>
// 										))
// 									}
// 									<td className="productsmanagement__col productsmanagement__col--fit-content"><BasicButton title={i === this.state.editProduct ? "Done" : "Edit"} onClick={this.editProduct.bind(this, item)} /></td>
// 									<td className="productsmanagement__col productsmanagement__col--fit-content"><BasicButton title="Remove" onClick={this.removeProduct.bind(this, item)} /></td>
// 								</tr>
// 							))
// 						}


export default Products;