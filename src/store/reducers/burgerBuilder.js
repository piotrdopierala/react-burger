import * as actions from '../actions/actionTypes';

const initialState = {
    ingredients: null,
    totalPrice: 4,
    error: false,
    loading: true,
    building: false
}

let ingredientPrices = {
    salad: 0.0,
    bacon: 0.0,
    cheese: 0.0,
    meat: 0.0
}

const rootReducer = (state = initialState, action) => {
    let newState = {
        ingredients: { ...state.ingredients },
        totalPrice: state.totalPrice
    };

    switch (action.type) {
        case actions.SET_INGREDIENTS:            
            newState.ingredients = action.ingredients;
            ingredientPrices = action.priceList;            
            newState.error = false;
            newState.loading = false;
            newState.totalPrice = action.startPrice;
            newState.building = false;
            return newState;
        case actions.ADD_INGREDIENT_AMOUNT:
            if (newState.ingredients[action.ingredient] === undefined) {
                return state;
            }
            newState.ingredients[action.ingredient] = newState.ingredients[action.ingredient] + action.amount;
            newState.totalPrice = state.totalPrice + (ingredientPrices[action.ingredient] * action.amount);
            newState.building = true;
            return newState;
        case actions.SUB_INGREDIENT_AMOUNT:
            if (newState.ingredients[action.ingredient] === undefined || state.ingredients[action.ingredient] <= 0) {
                return state;
            }
            newState.ingredients[action.ingredient] = newState.ingredients[action.ingredient] - action.amount;
            newState.totalPrice = state.totalPrice - (ingredientPrices[action.ingredient] * action.amount);
            newState.building = true;
            return newState;
        case actions.FETCH_INGREDIENTS_FAILED:
            newState.loading=false;
            newState.error=true;
            return newState;
        default:
            return state;
    }
}

export default rootReducer;