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
		console.log("ProductsTableRow", this.props);
		// this.context.onCartChange(() => {console.log("CART CHANGE", this.context.cart)});
	}

	typeToHTML(type, data) {
		console.log("tth", type, data);

		if (this.state.editProduct) {
			switch(type) {
				case "text":
					return (<input defaultValue={data} />);
			}
		}

		switch(type) {
			case "text":
				return(<>{data || "-"}</>);
			case "":
				return(<></>);
		}

		return (<>default</>);
	}

	render() {
		return (
			<tr>
				{
					this.props.productKeys.map((item, i) => (
						<td key={"td_" + i}>{this.typeToHTML(item.type, this.props.product[item.item])}</td>
					))
				}
				<td className="productsmanagement__col productsmanagement__col--fit-content"><BasicButton title={this.state.editProduct ? "Done" : "Edit"} onClick={this.editProduct.bind(this, item)} /></td>
//				<td className="productsmanagement__col productsmanagement__col--fit-content"><BasicButton title="Remove" onClick={this.removeProduct.bind(this, item)} /></td>
			</tr>
		);
	}
}

// ProductsTableRow.contextType = DataContext;

export default ProductsTableRow;