import * as actionTypes from '../actions/actionTypes';

const initialState = {
    orders: [],
    loading: false,
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
            return newState;
        case actionTypes.PURCHASE_BURGER_FAILED:
            newOrder.loading = false;
            return newState;
        default:
            return state;
    }
}

export default orderReducer;