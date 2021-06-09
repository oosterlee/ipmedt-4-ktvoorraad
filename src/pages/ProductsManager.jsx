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
				{ image: "image", productname: "Product1", category: "Randapperatuur" },
				{ image: undefined, productname: "Product2" },
				{ image: undefined, productname: "Product3" },
				{ image: undefined, productname: "Product4" },
				{ image: undefined, productname: "Product5" },
				{ image: undefined, productname: "Product6" },
				{ image: undefined, productname: "Product7" },
			],
			renderProducts: [],
			productKeys: [
				{item: "image", name: "Plaatje", type: "image"},
				{item: "productname", name: "Productnaam", type: "text"},
				{item: "category", name: "Categorie", type: "dropdown", dropdownItems: ["Electronica", "Randapperatuur", "Print"]},
				{item: "brand", name: "Merk", type: "text"},
				{item: "model", name: "Model", type: "text"},
				{item: "approval", name: "Goedkeuring", type: "dropdown", dropdownItems: ["Ja", "Nee"]},
				{item: "price", name: "Prijs", type: "number"},
				{item: "maximumorder", name: "Maximaal aantal", type: "number"},
				{item: "condition", name: "Regel", type: "textarea"},
				{item: "description", name: "Omschrijving", type: "textarea"},
			],
			editProduct: false,
			searchValue: "",
		};
	}

	componentDidMount() {
		this.fillProducts();
	}

	removeProduct(item) {
		let products = this.state.products;

		const i = products.indexOf(item);

		if (i < 0) return;

		products.splice(i, 1);

		this.setState({ products });
	}

	fillProducts() {
		this.setState({ renderProducts: this.state.products });
	}

	search(e) {
		let searchValue = e.target.value;

		let products = this.state.products;

		let renderProducts = [];


		products.forEach((item, i) => {
			if (JSON.stringify(item).toLowerCase().includes(searchValue.toLowerCase())) renderProducts.push(item);
		});
		this.setState({ searchValue, renderProducts });
	}

	editProduct(item, editing) {
		// TODO: Prevent editing of multiple rows at once
	}

	onProductInfoChange(item, itemName, value) {
		let products = this.state.products;

		const i = products.indexOf(item);
		if (i < 0) return;

		products[i][itemName] = value;

		this.setState({ products });
	}

	render() {
		return (
			<section className="productsmanagement">
				<input value={this.state.searchValue} onChange={this.search.bind(this)} />
				<table className="productsmanagement__table">
					<thead>
						<tr>
							<th></th>
							<th></th>
							{
								this.state.productKeys.map((item) => (
									<th key={item.item}>{item.name}</th>
								))
							}
						</tr>
					</thead>

					<tbody>
						{
							this.state.renderProducts.map((item, i) => (
								<ProductsTableRow
									key={"ptr_" + i}
									product={item}
									onProductInfoChange={this.onProductInfoChange.bind(this, item)}
									removeProduct={this.removeProduct.bind(this, item)}
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