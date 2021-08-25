import React, { Component }  from 'react';
import '../css/components/basicbutton.css';
import '../css/products.css';
import '../pages/Profile';


function GridButton() {
    
    function clickHandler(){

        
    }

  return (
    <div className="Wrapper">
        <button  className="products__button__grid" onClick={clickHandler}> Grid</button>
    </div>
  );
  
}

export default GridButton;
