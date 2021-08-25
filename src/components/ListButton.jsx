import React, { Component }  from 'react';
import '../css/components/basicbutton.css';
import '../css/products.css';
import '../pages/Profile';


function ListButton() {
    
    function clickHandler(){

        
    }

  return (
    <div className="Wrapper">
        <button className="products__button__list" onClick={clickHandler}>List</button>
    </div>
  );
  
}

export default ListButton;
