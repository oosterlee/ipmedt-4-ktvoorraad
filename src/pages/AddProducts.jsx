import React, { Component } from 'react';
import '../css/addproducts.css'
import axios from 'axios'; 


class AddProducts extends Component {
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
        }

        

        this.changeHandler = e =>
        {
            this.setState({[e.target.name]: e.target.value})
        }

        this.fileHandler = e =>
        {
            this.setState({[e.target.name]: e.target.files[0]})
        }


        this.submitHandler = e =>
        {
            e.preventDefault()
            let Formdata = new FormData();
            Formdata.append('image',this.state.image
            );

            let keys = Object.keys(this.state);
            for(let i = 0 ; i<keys.length; i++)
            {
                Formdata.append(keys[i], this.state[keys[i]]);
            }

            console.log(this.state)
            const header = {
                headers: {"Accept": "application/json",
                'content-type': 'multipart/form-data'}
                
              };
            axios
			    .post((process.env.REACT_APP_BASE_URL || 'http://127.0.0.1:8000') + '/api/products/store', Formdata, header)
			    .then(response => {
				console.log(response)
			    })
			    .catch(error => {
				console.log(error)
                
			})
        };
        
	}

    render() {
        const { image, productname, description, category, brand, model, price, maxorders, condition, approval} = this.state
		return (
            <section className="add">
                <h1 className="add__title"> Product toevoegen </h1>
            <form className="create-form" action="/products" method="POST" encType="multipart/form-data" onSubmit={this.submitHandler}>
                <label htmlFor="image">Kies een afbeelding </label>
                <input className="create-form__input form-control-file" type="file" name="image"  onChange={this.fileHandler} /> 
                

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
                
                <div className="create-form__u-flex">
                    <a className="create-form__btn" href="/index"><button className="create-form__btn create-form__btn--margin" type="submit">Cancel</button></a>
                    <a className="create-form__btn"><button className="create-form__btn" type="submit">Toevoegen</button></a>
                </div>



            </form>
            
             </section>

		);
	}
}


export default AddProducts;