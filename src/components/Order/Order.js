import React from 'react';
import classes from './Order.module.css';

const order = (props) => {
    const ingredients = Object.keys(props.burger.ingredients).map(key=>{
        return  {name: key , amount: props.burger.ingredients[key]};
    });
   
    const ingredientOutput = ingredients.map(ingr=>{
        return <span 
            style={{
                textTransform: 'capitalize', 
                display: 'inline-block',
                margin: '0 8px',
                border: '1px solid #ccc',
                padding: '5px'
            }}
            key={ingr.name}>{ingr.name} ({ingr.amount})</span>
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