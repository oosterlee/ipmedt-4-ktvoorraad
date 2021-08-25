import React, { Component } from 'react';
import '../css/loading.css';

class Loading extends Component {
    constructor(props) {
		super(props);
	}
    render() {
        return(
            <section className="loading">
                <div className="navbar__logo loading__logo"><a href="/" className="navbar__redirect loading__text">Jung<font>heinrich</font></a></div>
            </section>
        );
	}
}


export default Loading;