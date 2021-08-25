import React, { Component } from 'react';
import '../css/addproducts.css'
import axios from 'axios'; 
import { Redirect } from 'react-router-dom';
import ProductsItem from '../components/ProductsItem';
import apiClient from '../services/api';

import Loading from '../components/Loading';

class AddPack extends Component {
    constructor(props) {
		super(props);
        
        this.state = {
            packname: '',
            packdescription:'',
            products: [],
            renderProducts: [],
            addedProducts: [],
            redirect: false,
            loading: true,
        }

        this.getProducts();

        if (this.props.match && this.props.match.params.id) {
            this.getPack(this.props.match.params.id);
        }
        
	}

    getProducts(){
        this.setState({ loading: true });
        axios.get((process.env.REACT_APP_BASE_URL || 'http://127.0.0.1:8000') + '/api/products').then(json => this.setState({ products: json.data, renderProducts: json.data, loading: false }));
    }

    getPack(id) {
        this.setState({ loading: true });
        axios.get((process.env.REACT_APP_BASE_URL || 'http://127.0.0.1:8000') + '/api/pack/' + id).then(json => {

            let addedProducts = [];

            console.log("GETPACK", json);

            for (let i = 0; i < json.data.products.length; i++) {
                addedProducts.push(json.data.products[i].product_id);
            }

            console.log(addedProducts);

            this.setState({ packname: json.data.name, packdescription: json.data.description, addedProducts, loading: false });
        });
    }

    store() { // TOEVOEGEN
        this.setState({ loading: true });
        const { packname, packdescription, addedProducts } = this.state;
        console.log(packname, packdescription, addedProducts);

        let formData = new FormData();

        formData.append("name", packname);
        formData.append("description", packdescription);
        
        for (let i = 0; i < addedProducts.length; i++) {
            formData.append("products[]", addedProducts[i]);
        }

        apiClient
            .post((process.env.REACT_APP_BASE_URL || 'http://127.0.0.1:8000') + '/api/pack/store', formData, { headers: {"Accept": "application/json",'content-type': 'multipart/form-data'} })
            .then(response => {
                this.setState({ redirect: "/products", loading: false });
            console.log(response)
            })
            .catch(error => {
                this.setState({ loading: false, errorMsg: "Er is iets mis gegaan het een product toevoegen. Probeer het later opnieuw." });
            console.log(error)
            
        })
    }

    update() { // SPREEKT VOOR ZICHZELF
        this.setState({ loading: true });
        const { packname, packdescription, addedProducts } = this.state;
        console.log(packname, packdescription, addedProducts);

        let updateData = {};

        updateData.name = packname;
        updateData.description = packdescription;
        updateData.products = addedProducts;

        axios
            .put((process.env.REACT_APP_BASE_URL || 'http://127.0.0.1:8000') + '/api/pack/' + this.props.match.params.id + '/update' , updateData)
            .then(response => {
                this.setState({ redirect: "/products", loading: false });
            console.log(response)
            })
            .catch(error => {
                this.setState({ errorMsg: "Er is iets misgegaan met het updaten van het product. Probeer het later opnieuw.", loading: false })
            console.log(error)
            
        })

    }

    cancel(e) {
        e.preventDefault();
        this.setState({ redirect: '/management/products' });
    }

    delete(e) {
        e.preventDefault();
        axios
            .delete((process.env.REACT_APP_BASE_URL || 'http://127.0.0.1:8000') + '/api/pack/' + this.props.match.params.id)
            .then(response => {
                this.setState({ redirect: "/products", loading: false });
            console.log(response)
            })
            .catch(error => {
                this.setState({ errorMsg: "Er is iets misgegaan met het updaten van het product. Probeer het later opnieuw.", loading: false })
            console.log(error)
            
        })
    }

    submitHandler(e) {
        e.preventDefault();

        if (this.props.match && this.props.match.params.id) this.update();
        else this.store();

        console.log("SUBMIT");
    }

    changeHandler(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    toggleProduct(pid) {
        let addedProducts = this.state.addedProducts;
        console.log(addedProducts);
        
        if (addedProducts.includes(pid)) {
            addedProducts.splice(addedProducts.indexOf(pid), 1);
        } else {
            addedProducts.push(pid);
        }

        this.setState({ addedProducts });

    }

    render() {
        const { packname, packdescription} = this.state
		if (this.state.redirect !== false) {
            return (<Redirect to={this.state.redirect} />)
        }

        if (this.state.loading !== false) {
            return (<Loading />);
        }

        return (
            <section className="add">
                <h1 className="add__title"> Pakket toevoegen </h1>
                {
                    this.state.errorMsg ?
                    <h3 className="text--error">{this.state.errorMsg}</h3>
                    :
                    ""
                }
            <form className="create-form" action="/products" method="POST" encType="multipart/form-data" onSubmit={this.submitHandler.bind(this)}>

                <div className="create-form__u-flex">
                    <a className="create-form__btn" href="/index"><button {...(this.state.loading ? {disabled: "disabled"} : {})} className="create-form__btn create-form__btn--margin" onClick={this.cancel.bind(this)}>Annuleren</button></a>
                    <a className="create-form__btn"><button {...(this.state.loading ? {disabled: "disabled"} : {})} className="create-form__btn" type="submit">{ (this.props.match && this.props.match.params.id) ? "Bewerken" : "Toevoegen" }</button></a>
                    {
                        (this.props.match && this.props.match.params.id) ?
                        <a className="create-form__btn"><button {...(this.state.loading ? {disabled: "disabled"} : {})} className="create-form__btn"  onClick={this.delete.bind(this)}>Verwijderen</button></a>
                        :
                        ""
                    }
                </div>

                <label htmlFor="name">Titel</label>
                <input className="create-form__input" name="packname" type="text" value={packname} onChange={this.changeHandler.bind(this)}/>
                <label htmlFor="description">Beschrijving</label>
                <input className="create-form__input" name="packdescription" type="text" value={packdescription} onChange={this.changeHandler.bind(this)}/>

                <ul className="products__list">
					{
						this.state.renderProducts.map((item, i) => 
							<ProductsItem {...(this.state.addedProducts.includes(item.id) ? {"className": "pack pactive"} : {"className": "pack"})} {...item} key={item.id} pack={true} onClick={this.toggleProduct.bind(this, item.id)} />
						)
					}
				</ul>

     
                <div className="create-form__u-flex">
                    <a className="create-form__btn" href="/index"><button {...(this.state.loading ? {disabled: "disabled"} : {})} className="create-form__btn create-form__btn--margin" onClick={this.cancel.bind(this)}>Annuleren</button></a>
                    <a className="create-form__btn"><button {...(this.state.loading ? {disabled: "disabled"} : {})} className="create-form__btn" type="submit">{ (this.props.match && this.props.match.params.id) ? "Bewerken" : "Toevoegen" }</button></a>
                    {
                        (this.props.match && this.props.match.params.id) ?
                        <a className="create-form__btn"><button {...(this.state.loading ? {disabled: "disabled"} : {})} className="create-form__btn"  onClick={this.delete.bind(this)}>Verwijderen</button></a>
                        :
                        ""
                    }
                </div>





            </form>
            
             </section>

		);
	}
}


export default AddPack;