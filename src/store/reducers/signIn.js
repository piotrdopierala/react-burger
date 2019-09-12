import * as actionTypes from '../actions/actionTypes';

const initialState = {
    error: null,
    loading: false
};

const logIn = (state = initialState, action) => {
    let newState = {};
    Object.assign(newState,state);
    switch(action.type){
        case actionTypes.SIGNIN_START:
            newState.loading = true;
            newState.error = null;
            return newState;
        case actionTypes.SIGNIN_SUCCESS:
            newState.loading = false;
            newState.error = null;
            return newState;
        case actionTypes.SIGNIN_FAIL:
            newState.loading = false;
            newState.error = action.error.response.data.message;
            return newState;
        default:
            return state;
    }
}

export default logIn;