import React, { Component } from 'react';

// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { Link } from 'react-router-dom';

import BasicButton from '../components/BasicButton';

// import DataContext from '../DataContext';


class ProductsTableRow extends Component {
	constructor(props) {
		super(props);

		this.state = {
			editProduct: false,
		};
	}

	componentDidMount() {
		// this.context.onCartChange(() => {console.log("CART CHANGE", this.context.cart)});
	}

	editProduct(item) {
		// this.props.editProduct(!this.state.editProduct); // TODO: make it so you cannot edit multiple products at once
		this.setState({ editProduct: !this.state.editProduct });
	}

	typeToHTML(item, data, itemName) {
		if (this.state.editProduct) {
			switch(item.type) {
				case "text":
					return (<input className="input--w100" defaultValue={data} onChange={e => this.props.onProductInfoChange(itemName, e.target.value)} size="1" />);
				case "dropdown":
					return (<select defaultValue={data} onChange={e => this.props.onProductInfoChange(itemName, e.target.value)}>
						{
							!item.dropdownItems.includes(data) ?
							<option key={data} value="NULL">Selecteer</option>
							:
							<></>
						}
						{
							item.dropdownItems.map((item, i) => (
								<option key={"opt_" + i} value={item}>{item}</option>
							))
						}
					</select>);
					// {...(data == item ? {selected: "selected"} : "")}
				case "image":
					return (<input type="file" accept="image/*" onChange={e => this.props.onProductInfoChange(itemName, URL.createObjectURL(e.target.files[0]))} />);
				case "number":
					return (<input className="input--w100" defaultValue={data} type="number" min="0" max="999999.99" step="1" onChange={e => this.props.onProductInfoChange(itemName, e.target.value)} size="1" />);
				case "textarea":
					return(<textarea>{data}</textarea>)
			}
		}

		switch(item.type) {
			case "image":
				return(<figure><img src={data} alt={data ? "Afbeelding van product" : "Geen plaatje"} height="100%" width="100%" /></figure>);
		}

		return (<>{data || "-"}</>);
	}

	render() {
		return (
			<tr>
				<td className="productsmanagement__col productsmanagement__col--fit-content"><BasicButton icon="trash" onClick={this.props.removeProduct} /></td>
				<td className="productsmanagement__col productsmanagement__col--fit-content"><BasicButton icon={this.state.editProduct ? "check" : "pen"} onClick={this.editProduct.bind(this)} /></td>
				{
					this.props.productKeys.map((item, i) => (
						<td key={"td_" + i}>{this.typeToHTML(item, this.props.product[item.item], item.item)}</td>
					))
				}
			</tr>
		);
	}
}

// ProductsTableRow.contextType = DataContext;

export default ProductsTableRow;