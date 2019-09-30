import * as actions from '../actions/actionTypes';

const initialState = {
    ingredientsList: null,
    ingredientsInBurger: [],
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
        ingredientsList: { ...state.ingredientsList },
        ingredientsInBurger: [...state.ingredientsInBurger],
        totalPrice: state.totalPrice
    };

    switch (action.type) {
        case actions.SET_INGREDIENTS:
            newState.ingredientsList = action.ingredients;
            newState.ingredientsInBurger = [];
            ingredientPrices = action.priceList;
            newState.error = false;
            newState.loading = false;
            newState.totalPrice = action.startPrice;
            newState.building = false;
            return newState;
        case actions.ADD_INGREDIENT_POSITION:
            if (newState.ingredientsList[action.ingredient] === undefined) {
                return state;
            }
            if (action.position>= 0 && action.position<=(newState.ingredientsInBurger+1)) {
                newState.ingredientsInBurger.splice(action.position, 0, action.ingredient);
            } else {
                newState.ingredientsInBurger.unshift(action.ingredient)
            };
            newState.ingredientsList[action.ingredient] = newState.ingredientsList[action.ingredient] + 1;
            newState.totalPrice = state.totalPrice + ingredientPrices[action.ingredient];
            newState.building = true;
            return newState;
        case actions.SUB_INGREDIENT_POSITION:
            if (newState.ingredientsList[action.ingredient] === undefined || newState.ingredientsList[action.ingredient] === 0) {
                return state;
            }
            if (action.position>=0 && action.position<newState.ingredientsInBurger.length) {
                newState.ingredientsInBurger.splice(action.position, 1, action.ingredient)
            } else {
                let idxToRemove = state.ingredientsInBurger.findIndex((ing) => ing === action.ingredient);
                if (idxToRemove >= 0) {
                    newState.ingredientsInBurger.splice(idxToRemove, 1);
                }
            }
            newState.ingredientsList[action.ingredient] = newState.ingredientsList[action.ingredient] - 1;
            newState.totalPrice = state.totalPrice - ingredientPrices[action.ingredient];
            newState.building = true;
            return newState;
        case actions.FETCH_INGREDIENTS_FAILED:
            newState.loading = false;
            newState.error = true;
            return newState;
        default:
            return state;
    }
}

export default rootReducer;