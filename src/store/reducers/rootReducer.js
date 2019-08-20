import * as actions from '../actions';

const initialState = {
    ingredients: [],
    totalPrice: 0
}

const rootReducer = (state = initialState, action) => {
    let newState = {
        ingredients: [...state.ingredients],
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
            return newState;
        case actions.SUB_INGREDIENT_AMOUNT:
            if (newState.ingredients[action.ingredient] === undefined) {
                return state;
            }
            newState.ingredients[action.ingredient] = newState.ingredients[action.ingredient] - action.amount;
            return newState;
        default:
            return state;
    }
}

export default rootReducer;