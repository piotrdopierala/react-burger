import * as actions from '../actions';

const initialState = {
    ingredients: {},
    totalPrice: 4
}

const INGREDIENT_PRICES = {
    salad: 0.5,
    bacon: 0.7,
    cheese: 0.4,
    meat: 1.3
}

const rootReducer = (state = initialState, action) => {
    let newState = {
        ingredients: {...state.ingredients},
        totalPrice: state.totalPrice
    };

    switch (action.type) {
        case actions.SET_INGREDIENTS:
            newState['ingredients'] = action.ingredients;
            return newState;
        case actions.ADD_INGREDIENT_AMOUNT:
            if (newState.ingredients[action.ingredient] === undefined) {
                return state;
            }
            newState.ingredients[action.ingredient] = newState.ingredients[action.ingredient] + action.amount;
            newState.totalPrice = state.totalPrice + INGREDIENT_PRICES[action.ingredient];
            return newState;
        case actions.SUB_INGREDIENT_AMOUNT:
            if (newState.ingredients[action.ingredient] === undefined || state.ingredients[action.ingredient] <= 0) {
                return state;
            }
            newState.ingredients[action.ingredient] = newState.ingredients[action.ingredient] - action.amount;
            newState.totalPrice = state.totalPrice - INGREDIENT_PRICES[action.ingredient];
            return newState;
        default:
            return state;
    }
}

export default rootReducer;