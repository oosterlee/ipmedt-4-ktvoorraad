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
		dataContextData.cart.push(product);
		dataContextData.__callCartCallbacks();
	},
	removeProductFromCart: (product) => {
		// TODO
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
