import React from 'react';
import '../css/components/Category.css';

class Category extends React.Component {

    makeCategories() {

        let list_of_products = document.getElementsByClassName('products__list__item');
        let checkbox_communicatie = document.getElementById("Communicatie");
        let checkbox_ergonomie = document.getElementById("Ergonomie");
        let checkbox_kabels = document.getElementById("Kabels");
        let checkbox_printA = document.getElementById("Print apparatuur");
        let checkbox_randA = document.getElementById("Rand apparatuur");
        console.log("sadsadkjklsajdkjsa");

        //GEREEDSCHAP

        checkbox_communicatie.addEventListener("change", function () {
            if (checkbox_communicatie.checked) {
                console.log(list_of_products[1]);
                for (let i = 0; i < list_of_products.length; i++) {
                    if (list_of_products[i].dataset.kindOfProduct !== "Communicatie") {
                        list_of_products[i].style.display = 'none';
                    }
                }
            }

            if (!checkbox_communicatie.checked) {
                for (let i = 0; i < list_of_products.length; i++) {
                    list_of_products[i].style.display = '';
                }
            }

        });

        //ELEKTRONICA

        checkbox_ergonomie.addEventListener("change", function () {
            if (checkbox_ergonomie.checked) {
                for (let i = 0; i < list_of_products.length; i++) {
                    if (list_of_products[i].dataset.kindOfProduct !== "Ergonomie") {
                        list_of_products[i].style.display = 'none';
                    }
                }
            }

            if (!checkbox_ergonomie.checked) {
                for (let i = 0; i < list_of_products.length; i++) {
                    list_of_products[i].style.display = '';
                }
            }

        });

        //MEUBILAIR

        checkbox_kabels.addEventListener("change", function () {
            if (checkbox_kabels.checked) {
                for (let i = 0; i < list_of_products.length; i++) {
                    if (list_of_products[i].dataset.kindOfProduct !== "Kabels") {
                        list_of_products[i].style.display = 'none';
                    }
                }
            }

            if (!checkbox_kabels.checked) {
                for (let i = 0; i < list_of_products.length; i++) {
                    list_of_products[i].style.display = '';
                }
            }

        });

        //SCHOONMAAKSPULLEN

        checkbox_printA.addEventListener("change", function () {
            if (checkbox_printA.checked) {
                for (let i = 0; i < list_of_products.length; i++) {
                    if (list_of_products[i].dataset.kindOfProduct !== "Print apparatuur") {
                        list_of_products[i].style.display = 'none';
                    }
                }
            }

            if (!checkbox_printA.checked) {
                for (let i = 0; i < list_of_products.length; i++) {
                    list_of_products[i].style.display = '';
                }
            }

        });

        //HARDWARE

        checkbox_randA.addEventListener("change", function () {
            if (checkbox_randA.checked) {
                for (let i = 0; i < list_of_products.length; i++) {
                    if (list_of_products[i].dataset.kindOfProduct !== "Rand apparatuur") {
                        list_of_products[i].style.display = 'none';
                    }
                }
            }

            if (!checkbox_randA.checked) {
                for (let i = 0; i < list_of_products.length; i++) {
                    list_of_products[i].style.display = '';
                }
            }

        });

    }

    componentDidMount() {
        this.makeCategories();
    }

    render() {

        return (
            <div class="products__categories">
                <input type="checkbox" id="Communicatie"/>
                <label for="Communicatie">
                    Communicatie</label>

                <input type="checkbox" id="Ergonomie"/>
                <label for="Ergonomie">
                    Ergonomie</label>

                <input type="checkbox" id="Kabels"/>
                <label for="Kabels">
                    Kabels</label>

                <input type="checkbox" id="Print apparatuur"/>
                <label for="Print apparatuur">
                    Print apparatuur</label>

                <input type="checkbox" id="Rand apparatuur"/>
                <label for="Rand apparatuur">
                    Rand apparatuur</label>

            </div>
        );
    }

}

export default Category;