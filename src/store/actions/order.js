import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const purchaseBurgerStart = () => {
    return{
        type: actionTypes.PURCHASE_BURGER_START
    };
}

export const purchaseBurger =  (orderData) => {
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

const purchaseBurgerSuccess = (id, orderData) =>{
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId: id,
        orderData: orderData
    }
}

const purchaseBurgerFailed = (error) =>{
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