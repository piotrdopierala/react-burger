import * as actionTypes from './actionTypes';

const addIngredient = (ing, amt) => {
    return {
        type: actionTypes.ADD_INGREDIENT_AMOUNT,
        ingredient: ing,
        amount: amt
    }
};

const subIngredient = (ing, amt) => {
    return{
        type: actionTypes.SUB_INGREDIENT_AMOUNT,
        ingredient: ing,
        amount: amt
    }
};

const setIngredients = (ings) => {
    return{
        type: actionTypes.SET_INGREDIENTS,
        ingredients: ings
    }
}

export {addIngredient, subIngredient, setIngredients};