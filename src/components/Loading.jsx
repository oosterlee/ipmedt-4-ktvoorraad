import React, { Component } from 'react';
import '../css/loading.css';

class Loading extends Component {
    constructor(props) {
		super(props);
	}
    render() {
        return(
            <section class="loading">
                <div class="navbar__logo"><a href="/" class="navbar__redirect">Jung<font>heinrich</font></a></div>
            </section>
        );
	}
}


export default Loading;