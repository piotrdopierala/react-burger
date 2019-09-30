import React from 'react';
import classes from './Order.module.css';

const order = (props) => {
    const ingredients = props.burger.ingredients.map((ingr,i)=>{
        return  ingr.name;
    });
   
    const ingredientOutput = ingredients.reverse().map((ingr,i)=>{
        return <span 
            style={{
                textTransform: 'capitalize', 
                display: 'inline-block',
                margin: '0 8px',
                border: '1px solid #ccc',
                padding: '5px'
            }}
            key={i}>{ingr}</span>
    })
    
    return (
        <div className={classes.Order}>        
            {/*<p>Ingredients: Salad({props.burger.ingredients.salad}) Cheese({props.burger.ingredients.cheese}) Bacon({props.burger.ingredients.bacon}) Meat({props.burger.ingredients.meat})</p>*/}
            <p>Ingredients: {ingredientOutput}</p>
            <p>Price: <strong>{Number.parseFloat(props.price).toFixed(2)} PLN</strong></p>
        </div>
    );
}

export default order;