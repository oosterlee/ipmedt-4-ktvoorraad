import React from 'react';

class Searchbar extends React.Component{
    
    state = {searchTerm: ""};

    onSearch = event =>{
        this.setState({searchTerm: event.target.value});
    }
    onCheck = event =>{
        event.preventDefault();
        this.props.onSubmit(this.state.searchTerm);
    }
    render(){
        console.log(this.state.searchTerm);
        return(
        <section>
            <form onSubmit={this.onCheck}>
                <input 
                className="searchbar" 
                type="text"
                placeholder="Zoek hier op product"
                onChange= {this.onSearch}
                />
            </form>
        </section>
        );
    }
}

export default Searchbar;