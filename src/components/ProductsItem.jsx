import React, { Component } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

import BasicButton from '../components/BasicButton';

import DataContext from '../DataContext';


class ProductsItem extends Component {
	constructor(props) {
		super(props);

		this.state = {
			showInfo: false,
			redirectTo: false,
			lastAmount: this.props.amount,
			putInCart: false,
			putInCartTimer: setTimeout(()=>{}, 0),
		};
	}

	componentDidMount() {
		this.context.onCartChange(() => {console.log("CART CHANGE", this.context.cart)});
	}

	addToCart() {
		clearTimeout(this.state.putInCartTimer);
		this.setState({ putInCart: true, putInCartTimer: setTimeout(() => this.setState({ putInCart: false }), 1000) });

		this.context.addProductToCart(this.props);
	}

	showInfo() {
		this.setState({ showInfo: true });
	}

	hideInfo() {
		this.setState({ showInfo: false });
	}
	removeFromCart(){
		this.context.removeProductFromCart(this.props.id);

	}

	cartProductAmountChange(e) {
		let index = this.context.findProductById(this.props.id);
		if (e.target.value <= 1) {
			this.context.cart[index].amount = 1;
		} else {
			this.context.cart[index].amount = Number(e.target.value);
		}
		if (this.state.lastAmount == 1 && e.target.value >= 1) {
			this.context.cart[index].amount = Number(e.target.value.substr(1, 1));
		}
		this.setState({ lastAmount: this.context.cart[index].amount });
		this.context.__callCartCallbacks();
	}

	cartMinus() {
		let index = this.context.findProductById(this.props.id);
		if (this.context.cart[index].amount <= 1) {
			this.context.cart[index].amount = 1;
		} else {
			this.context.cart[index].amount--;
		}

		this.setState({ lastAmount: this.context.cart[index].amount });
		this.context.__callCartCallbacks();
	}

	cartPlus() {
		let index = this.context.findProductById(this.props.id);
		this.context.cart[index].amount++;

		this.setState({ lastAmount: this.context.cart[index].amount });
		this.context.__callCartCallbacks();
	}
	

	render() {
		return (
			<li className={"products__list__item " + this.props.className} onClick={this.props.onClick ? this.props.onClick : () => {}} >
				<figure className="products__list__figure">
					{
						this.props.isPack ?
						<img
							src={"data:image/png;base64,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"}
							alt={ this.props.title || "Plaatje niet beschikbaar" }
							className="products__item__image"
						/>
						:
						<img
							src={(process.env.REACT_APP_BASE_URL || 'http://127.0.0.1:8000') + this.props.image || "https://www.dia.org/sites/default/files/No_Img_Avail.jpg" }
							alt={ this.props.title || "Plaatje niet beschikbaar" }
							className="products__item__image"
						/>
						
					}
				</figure>
				<div className="products__list__info-wrapper" {...(this.props.pack ? {style: {marginBottom: 0}} : {})}>
					
					{
						this.props.isPack ?
						<h2 className="products__item__title products__item__text--m1" { ...(this.state.showInfo ? { "data-info": "show" } : {}) } title={ this.props.condition || "Geen bestelregel" }>
							{ "[Pakket] " +  this.props.name }
						</h2>
						:
						<h2 className="products__item__title products__item__text--m1" { ...(this.state.showInfo ? { "data-info": "show" } : {}) } title={ this.props.condition || "Geen bestelregel" }>
							{ this.props.brand + " " +  this.props.model }
						</h2>

					}
					
					<FontAwesomeIcon icon="info-circle" className="products__item__info-icon" onMouseEnter={this.showInfo.bind(this)} onMouseLeave={this.hideInfo.bind(this)} />
					
					{
						this.props.pack ?
						""
						: 
						<p className="products__item__description">{ this.props.description.substr(0, 350) }</p>
					}		
					</div>
					{
						this.props.cart ?
						<section class="products__item__input">
						<span class="products__item__input__minus" onClick={this.cartMinus.bind(this)}>–</span><input class="products__item__input__number" type="text" value={this.props.amount} min="0" max="10" onChange={this.cartProductAmountChange.bind(this)} /><span class="products__item__input__plus"  onClick={this.cartPlus.bind(this)}>+</span>
						</section>
						:
						""
					}

					{
						this.props.pack ?
						""
						:
						this.props.cart  ?
						<BasicButton icon="trash" className={"products__item__button" + (this.props.verifyRequired ? " pib--verify" : "")} onClick={this.removeFromCart.bind(this)} />
						: 
						<BasicButton {...(!this.state.putInCart ? {icon: "cart-plus"} : {title: "Toegevoegd aan winkelwagen"})} className={"products__item__button" + (this.props.verifyRequired ? " pib--verify" : "") + (this.state.putInCart ? " pic--animation" : "")} onClick={this.addToCart.bind(this)} />



					}
					

			</li>
		);
	}
}

// {
// 						this.props.verifyRequired ?
// 						<p className="products__item__verify-required">Goedkeuring vereist</p>
// 						:
// 						<></>
// 					}

ProductsItem.contextType = DataContext;

export default ProductsItem;