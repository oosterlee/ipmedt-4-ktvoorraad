import React from 'react';
import '../css/components/searchbar.css';
import { IoSearch } from "react-icons/io5";

class Searchbar extends React.Component{
    
    state = {searchTerm: ""};

    render(){
        console.log(this.state.searchTerm);
        return(
        <section>
            <form className="searchbar" onSubmit={e => e.preventDefault()}>
            <input id="searchbar" name="searchbar" className="searchbar__input" type="text" placeholder="Zoek hier op product..."  value = {this.props.value} onChange= {this.props.onChange}  />
            <i className="searchbar__icon"><IoSearch /> </i>
                
            
                
            </form>
        </section>
        );
    }
}

export default Searchbar;