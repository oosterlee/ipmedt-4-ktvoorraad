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

        this.submitHandler = e =>
        {
            e.preventDefault()
            console.log(this.state)
            const header = {
                headers: {"Accept": "application/json"}
              };
            axios
			    .post('http://localhost:8000/api/products/store', this.state, header)
			    .then(response => {
				console.log(response)
			    })
			    .catch(error => {
				console.log(error)
                
			})
        };
        
	}
                //   axios({
            //     method: 'post',
            //     url: '/http://localhost:8000/api/products/store',
            //     data: {
            //       firstName: 'Fred',
            //       lastName: 'Flintstone'
            //     }
            //   });

    render() {
        const { image, productname, description, category, brand, model, price, maxorders, condition, approval} = this.state
		return (
            <section class="add">
                <h1 class="add__title"> Product toevoegen </h1>
            <form class="create-form" action="/products" method="POST" onSubmit={this.submitHandler}>
                <label for="image">Kies een afbeelding </label>
                <input class="create-form__input" type="text" name="image" value={image} onChange={this.changeHandler} /> 
                

                <label for="name">Titel</label>
                <input class="create-form__input" name="productname" type="text" value={productname} onChange={this.changeHandler}/>
                <label for="kind">Categorie</label>
                <input class="create-form__input" name="category" id="category" type="text" value={category} onChange={this.changeHandler}/>
                <label for="kind">Merk</label>
                <input class="create-form__input" name="brand" id="brand" type="text" value={brand} onChange={this.changeHandler}/>
                <label for="kind">Model</label>
                <input class="create-form__input" name="model" id="model" type="text" value={model} onChange={this.changeHandler}/>

                    

                <label for="description">Beschrijving</label>
                <textarea class="create-form__input create-form__input--height" name="description" id="description" value={description} onChange={this.changeHandler}> </textarea>

                <label for="prijs">Prijs</label>
                <input class="create-form__input" name="price" type="number" value={price} onChange={this.changeHandler}/>

                <label for="maximum">Maximaal aantal</label>
                <input class="create-form__input" name="maxorders" id="maxorders" type="number" value={maxorders} onChange={this.changeHandler}/>

                <label for="condition">Conditie</label>
                <input class="create-form__input" name="condition"  type="text" value={condition} onChange={this.changeHandler}/>

                <label for="Goedkeuring">Goedkeuring nodig?</label>
                <select id="approval" name="approval" value={approval} onChange={this.changeHandler}>
                    <option value="1">Wel nodig</option>
                    <option value="0">Niet nodig</option>
                </select>
                
                <div class="create-form__u-flex">
                    <a class="create-form__btn" href="/index"><button class="create-form__btn create-form__btn--margin" type="submit">Cancel</button></a>
                    <a class="create-form__btn"><button class="create-form__btn" type="submit">Toevoegen</button></a>
                </div>



            </form>
            
             </section>

		);
	}
}


export default AddProducts;