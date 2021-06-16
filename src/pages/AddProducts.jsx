import React, { Component } from 'react';
import '../css/addproducts.css' 


class AddProducts extends Component {

    render() {
		return (
            <section class="add">
                <h1 class="add__title"> Product toevoegen </h1>
            <form class="create-form" action="/product" method="POST">
            <label for="image">Kies een afbeelding </label>
                <input class="create-form__input" type="file" id="image" name="image" accept="image/*"/>
                

                <label for="name">Titel</label>
                <input class="create-form__input" name="name" id="name" type="text"/>
                <label for="kind">Categorie</label>
                    

                <label for="description">Beschrijving</label>
                <textarea class="create-form__input create-form__input--height" name="description" id="description"> </textarea>

                <label for="prijs">Prijs</label>
                <input class="create-form__input" name="prijs" id="prijs" type="number"/>

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