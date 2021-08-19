import React, { Component } from 'react';
import '../css/addproducts.css'
import axios from 'axios'; 
import { Redirect } from 'react-router-dom';
import ProductsItem from '../components/ProductsItem';


class AddPack extends Component {
    constructor(props) {
		super(props);
        
        this.state = {
            name: '',
            description:'',
            products: [],
            renderProducts: [],
        }

        this.getProducts();


        
	}

    getProducts(){
        axios.get((process.env.REACT_APP_BASE_URL || 'http://127.0.0.1:8000') + '/api/products').then(json => this.setState({ products: json.data, renderProducts: json.data }));

    }

    render() {
        const { name, description} = this.state
		// if (this.state.redirect !== false) {
        //     return (<Redirect to={this.state.redirect} />)
        // }
        return (
            <section className="add">
                <h1 className="add__title"> Pack toevoegen </h1>
                {
                    this.state.errorMsg ?
                    <h3 className="text--error">{this.state.errorMsg}</h3>
                    :
                    ""
                }
            <form className="create-form" action="/products" method="POST" encType="multipart/form-data" onSubmit={this.submitHandler}>

                <div className="create-form__u-flex">
                    <a className="create-form__btn" href="/index"><button {...(this.state.loading ? {disabled: "disabled"} : {})} className="create-form__btn create-form__btn--margin" type="submit">Cancel</button></a>
                    <a className="create-form__btn"><button {...(this.state.loading ? {disabled: "disabled"} : {})} className="create-form__btn" type="submit">Toevoegen</button></a>
                </div>

                <label htmlFor="name">Titel</label>
                <input className="create-form__input" name="packname" type="text" value={name} onChange={this.changeHandler}/>
                <label htmlFor="description">Beschrijving</label>
                <input className="create-form__input" name="packdescription" type="text" value={description} onChange={this.changeHandler}/>

                <ul className="products__list">
					{
						this.state.renderProducts.map((item, i) => 
							<ProductsItem className="TEST" {...item} key={item.id} pack={true} />
						)
					}
				</ul>

     
                <div className="create-form__u-flex">
                    <a className="create-form__btn" href="/index"><button {...(this.state.loading ? {disabled: "disabled"} : {})} className="create-form__btn create-form__btn--margin" type="submit">Cancel</button></a>
                    <a className="create-form__btn"><button {...(this.state.loading ? {disabled: "disabled"} : {})} className="create-form__btn" type="submit">Toevoegen</button></a>
                </div>





            </form>
            
             </section>

		);
	}
}


export default AddPack;