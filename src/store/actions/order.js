import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const purchaseBurgerStart = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_START
    };
}

export const purchaseBurger = (orderData, token) => {
    return (dispatch) => {
        dispatch(purchaseBurgerStart());
        let axiosConfig = {
            headers: {
                'Authorization': token
            }
        }
        axios.post('saveorder', orderData,axiosConfig)
            .then(response => {
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

export const fetchOrderStartAsync = (token) => {
    return (dispatch) => {
        dispatch(fetchOrderStart());
        let axiosConfig = {
            headers: {
                'Authorization': token
            }
        }
        axios.get('/getorders/user', axiosConfig)
            .then(res => {
                console.log(res);
                if (res.data) {
                    dispatch(fetchOrderSuccess(res.data));
                }
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
    console.log(data);
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