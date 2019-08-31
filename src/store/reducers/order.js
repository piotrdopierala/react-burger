import * as actionTypes from '../actions/actionTypes';

const initialState = {
    orders: [],
    loading: false,
    purchased: false
};

const orderReducer = (state = initialState, action) => {
    let newState = { ...state };
    switch (action.type) {
        case actionTypes.PURCHASE_BURGER_START:
            newState.loading = true;
            return newState;
        case actionTypes.PURCHASE_BURGER_SUCCESS:
            const newOrder = {
                ...action.orderData,
                id: action.orderId
            }
            newState.orders = state.orders.concat(newOrder);
            newState.loading = false;
            newState.purchased = true;
            return newState;
        case actionTypes.PURCHASE_BURGER_FAILED:
            newState.loading = false;
            return newState;
        case actionTypes.PURCHASE_INIT:
            newState.purchased = false;
            return newState;
        case actionTypes.FETCH_ORDERS_START:
            newState.loading = true;
            return newState;
        case actionTypes.FETCH_ORDERS_SUCCESS:
            newState.orders = action.orders;
            newState.loading = false;
            return newState;
        case actionTypes.FETCH_ORDERS_FAILED:
            newState.loading = false;            
            return newState;
        default:
            return state;
    }
}

export default orderReducer;