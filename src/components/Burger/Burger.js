import React from 'react';
import classes from './Burger.module.css';
import BurgerIngredient from '../Burger/BurgerIngredient/BurgerIngredient';


const burger = (props) => {
    let transformedIngredients = Object.keys(props.ingredients)
        .map(ingKey => {
            return [...Array(props.ingredients[ingKey])] //array z rozmiarem ilosci danego skladnika
            .map((_,i) => {
                return <BurgerIngredient key={ingKey+i} type={ingKey}/>;
            })
        })
        .reduce((arr,el)=>{ //flat (wyciagniecie wartosci z wewnetrzych arrayow)
            return arr.concat(el);
        }, []);
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