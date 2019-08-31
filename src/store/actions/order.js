import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const purchaseBurgerStart = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_START
    };
}

export const purchaseBurger = (orderData) => {
    return (dispatch) => {
        dispatch(purchaseBurgerStart());
        axios.post('saveorder', orderData)
            .then(response => {
                console.log('Purchase response data:', response.data);
                dispatch(purchaseBurgerSuccess(response.data.OrderId, orderData));
            })
            .catch(error => {
                dispatch(purchaseBurgerFailed(error));
            })
    }
}

const purchaseBurgerSuccess = (id, orderData) => {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId: id,
        orderData: orderData
    }
}

const purchaseBurgerFailed = (error) => {
    return {
        type: actionTypes.PURCHASE_BURGER_FAILED,
        error: error
    }
}

export const purchaseInit = () => {
    return {
        type: actionTypes.PURCHASE_INIT
    };
}

export const fetchOrderStartAsync = () => {
    return (dispatch) => {
        dispatch(fetchOrderStart());
        axios.get('/getorders')
            .then(res => {
                dispatch(fetchOrderSuccess(res.data));
            })
            .catch(error => {
                dispatch(fetchOrderFailed(error));
            })
    }
}

export const fetchOrderStart = () => {
    return {
        type: actionTypes.FETCH_ORDERS_START
    }
}

export const fetchOrderSuccess = (data) => {
    return {
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        orders: data
    }
}

export const fetchOrderFailed = (error) => {
    return {
        type: actionTypes.FETCH_ORDERS_FAILED,
        error: error
    }
}