import React from 'react';
import classes from './Burger.module.css';
import BurgerIngredient from '../Burger/BurgerIngredient/BurgerIngredient';


const burger = (props) => {
    let transformedIngredients = props.ingredients
        .map((ingKey,i) => {
                return <BurgerIngredient key={ingKey+i} type={ingKey}/>;
        });
    if(transformedIngredients.length===0){
        transformedIngredients = <p>Start adding ingredients.</p>
    }
    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top" />
                {transformedIngredients}
            <BurgerIngredient type="bread-bottom" />
        </div>
    );    
};

export default burger;