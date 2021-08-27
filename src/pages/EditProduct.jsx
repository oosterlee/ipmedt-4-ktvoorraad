import React, { Component } from 'react';
import '../css/productsmanagement.css';
import { useParams } from 'react-router';
import { Redirect } from 'react-router-dom';
import axios from 'axios';


class EditProduct extends Component {
    constructor(props) {
		super(props);
        this.state = {
            image: '',
            productname: '',
            description: '',
            category: '',
            brand: '',
            model: '',
            price: '',
            maxorders: '',
            condition: '',
            approval: '1',
            id: '',
            redirect: false,
            errorMsg: false,
            loading: false,
        }

       

    


    

    this.changeHandler = e =>
    {
        this.setState({[e.target.name]: e.target.value})
    }

    this.fileHandler = e =>
    {
        this.setState({[e.target.name]: e.target.files[0]})
    }

    const header = {
        headers: {"Accept": "application/json",
        'content-type': 'multipart/form-data'}
        
      };

    console.log(this.props)
    axios
        .get((process.env.REACT_APP_BASE_URL || 'http://127.0.0.1:8000') + '/api/products/' + this.props.match.params.id, header)
        .then(response => {
        this.setState(response.data)
        console.log(response)
        })
        .catch(error => {
        console.log(error)
        
    })
    
    this.delete = e =>
    {
        this.setState({ loading: true });
        e.preventDefault();
        axios
        .delete((process.env.REACT_APP_BASE_URL || 'http://127.0.0.1:8000') + '/api/management/products/'+ this.state.id, header)
        .then(response => {
            console.log(response);
            this.setState({ redirect: "/management/products", errorMsg: false, loading: false });
        })
        .catch(error => {
            this.setState({ errorMsg: "Er is iets misgegaan met het verwijderen van het product. Probeer het later opnieuw.", loading: false })
        console.log(error)
    })
    }



this.submitHandler = e =>
{
    this.setState({ loading: true });
    e.preventDefault()
    let Formdata = new FormData();
    Formdata.append('image',this.state.image
    );
    

    let keys = Object.keys(this.state);
    for(let i = 0 ; i<keys.length; i++)
    {
        Formdata.append(keys[i], this.state[keys[i]]);
    }

    
    



    console.log(Formdata)
    const header = {
        headers: {"Accept": "application/json",
        'content-type': 'multipart/form-data'}
        
      };
    axios
        .put((process.env.REACT_APP_BASE_URL || 'http://127.0.0.1:8000') + '/api/management/products' , this.state)
        .then(response => {
            this.setState({ redirect: "/products", loading: false });
        console.log(response)
        })
        .catch(error => {
            this.setState({ errorMsg: "Er is iets misgegaan met het updaten van het product. Probeer het later opnieuw.", loading: false })
        console.log(error)
        
    })
};
    
}

	

render() {
    if (this.state.redirect !== false) {
        return (<Redirect to={this.state.redirect} />)
    }
    const { image, productname, description, category, brand, model, price, maxorders, condition, approval, id} = this.state
    return (
        <section className="add">
            <h1 className="add__title"> Product wijzigen </h1>
            {
                this.state.errorMsg ?
                <h3 className="text--error">{this.state.errorMsg}</h3>
                :
                ""
            }
        <form className="create-form" action="/management/products" method="PUT" enctype="multipart/form-data" onSubmit={this.submitHandler}>
            

            <label htmlFor="name">Titel</label>
            <input className="create-form__input" name="productname" type="text" value={productname} onChange={this.changeHandler}/>
            <label htmlFor="kind">Categorie</label>
            <input className="create-form__input" name="category" id="category" type="text" value={category} onChange={this.changeHandler}/>
            <label htmlFor="kind">Merk</label>
            <input className="create-form__input" name="brand" id="brand" type="text" value={brand} onChange={this.changeHandler}/>
            <label htmlFor="kind">Model</label>
            <input className="create-form__input" name="model" id="model" type="text" value={model} onChange={this.changeHandler}/>

                

            <label htmlFor="description">Beschrijving</label>
            <textarea className="create-form__input create-form__input--height" name="description" id="description" value={description} onChange={this.changeHandler}> </textarea>

            <label htmlFor="prijs">Prijs</label>
            <input className="create-form__input" name="price" type="number" value={price} onChange={this.changeHandler}/>

            <label htmlFor="maximum">Maximaal aantal</label>
            <input className="create-form__input" name="maxorders" id="maxorders" type="number" value={maxorders} onChange={this.changeHandler}/>

            <label htmlFor="condition">Conditie</label>
            <input className="create-form__input" name="condition"  type="text" value={condition} onChange={this.changeHandler}/>

            <label htmlFor="Goedkeuring">Goedkeuring nodig?</label>
            <select id="approval" name="approval" value={approval} onChange={this.changeHandler}>
                <option value="1">Wel nodig</option>
                <option value="0">Niet nodig</option>
            </select>
            
            <div className="edit-form__u-flex">
                <a className="edit-form__btn" href="/index"><button {...(this.state.loading ? {disabled: "disabled"} : {})} className="admindelete-form__btn create-form__btn--margin" type="submit" onClick={this.delete}>Verwijderen</button></a>
                <a className="edit-form__btn"><button className="create-form__btn" {...(this.state.loading ? {disabled: "disabled"} : {})} className="adminedit-form__btn" type="submit">Updaten</button></a>
            </div>
            



        </form>
        
         </section>

    );
}
}

export default EditProduct;