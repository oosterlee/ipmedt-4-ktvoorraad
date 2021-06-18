import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import '../css/components/basicbutton.css';


class BasicButton extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		if (this.props.icon) {
			return (
				<button {...this.props} className={ this.props.className + " component__basicbutton" }>
					{ this.props.title }<FontAwesomeIcon icon={ this.props.icon } />
				</button>
			)
		}
		return (
			<button {...this.props} className={ this.props.className + " component__basicbutton" }>{ this.props.title }</button>
		);
	}
}

export default BasicButton;