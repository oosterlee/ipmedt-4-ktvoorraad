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
					<img
						src={(process.env.REACT_APP_BASE_URL || 'http://127.0.0.1:8000') + this.props.image || "https://www.dia.org/sites/default/files/No_Img_Avail.jpg" }
						alt={ this.props.title || "Plaatje niet beschikbaar" }
						className="products__item__image"
					/>
				</figure>
				<div className="products__list__info-wrapper" {...(this.props.pack ? {style: {marginBottom: 0}} : {})}>
					<h2 className="products__item__title products__item__text--m1" { ...(this.state.showInfo ? { "data-info": "show" } : {}) } title={ this.props.condition || "Geen bestelregel" }>
						{ this.props.brand + " " +  this.props.model }
					</h2>
					
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