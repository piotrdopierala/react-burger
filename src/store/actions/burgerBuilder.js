import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const addIngredient = (ing, amt) => {
    return {
        type: actionTypes.ADD_INGREDIENT_AMOUNT,
        ingredient: ing,
        amount: amt
    }
};

export const subIngredient = (ing, amt) => {
    return {
        type: actionTypes.SUB_INGREDIENT_AMOUNT,
        ingredient: ing,
        amount: amt
    }
};

const setIngredients = (ings,priceList) => {
    return {
        type: actionTypes.SET_INGREDIENTS,
        ingredients: ings,
        priceList: priceList
    }
}

const fetchIngredientsFailed = () => {
    return {
        type: actionTypes.FETCH_INGREDIENTS_FAILED
    }
}

export const initIngredients = () => {
    return (dispatch) => {
        axios.get("http://localhost:8080/burger/api/ingredient/getAll").then(
            (response) => {
                let ingredientList = {};
                let priceList = {};
                response.data.forEach(el => {
                    ingredientList[el["name"]] = 0;
                    priceList[el["name"]] = el["price"];
                })
                //this.props.onSetIngredients(ingredientList);
                dispatch(setIngredients(ingredientList,priceList));
            }
        ).catch((error) => {
            dispatch(fetchIngredientsFailed());
        })

    }
}
