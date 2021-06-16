import React from 'react';
import '../css/components/searchbar.css';

class Searchbar extends React.Component{
    
    state = {searchTerm: ""};

    render(){
        console.log(this.state.searchTerm);
        return(
        <section>
            <form onSubmit={e => e.preventDefault()}>
                <input 
                className="searchbar" 
                type="text"
                placeholder="Zoek hier op product"
                value = {this.props.value}
                onChange= {this.props.onChange}
                />
            </form>
        </section>
        );
    }
}

export default Searchbar;