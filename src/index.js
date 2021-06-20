import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Home from './pages/Home';
import reportWebVitals from './reportWebVitals';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';

import DataContext from './DataContext';

library.add(fas);

const dataContextData = {
	__cartCallbacks: [],
	cart: [],
	addProductToCart: (product) => {
		let index = dataContextData.findProductById(product.id);

		if (index < 0) {
			index = dataContextData.cart.push({...product});
			index--;	
			dataContextData.cart[index]["amount"] = 0;
		}

		dataContextData.cart[index].amount += 1;

		dataContextData.__callCartCallbacks();
	},
	findProductById: (id) => {
		let index = -1;
		for (let i = 0; i < dataContextData.cart.length; i++){
			if (dataContextData.cart[i].id ==id){
				index = i;
				break;
			}
		}
		return index;
	},
	removeProductFromCart: (id) => {
		let index = dataContextData.findProductById(id);
		console.log("index", index);
		if (index < 0) return;
		dataContextData.cart.splice(index, 1);
		dataContextData.__callCartCallbacks();
	},
	onCartChange: (func) => {
		if (typeof func == "function") dataContextData.__cartCallbacks.push(func);
	},
	__callCartCallbacks: () => {
		dataContextData.__cartCallbacks.forEach(func => func());
	}
}

ReactDOM.render(
	<React.StrictMode>
		<DataContext.Provider value={ dataContextData }>
			<Home />
		</DataContext.Provider>
	</React.StrictMode>,
	document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
