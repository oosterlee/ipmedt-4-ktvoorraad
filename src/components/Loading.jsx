import React, { Component } from 'react';
import '../css/loading.css';

class Loading extends Component {
    constructor(props) {
		super(props);
	}
    render() {
        return(
            <section class="loading">
                <div class="navbar__logo loading__logo"><a href="/" class="navbar__redirect loading__text">Jung<font>heinrich</font></a></div>
            </section>
        );
	}
}


export default Loading;