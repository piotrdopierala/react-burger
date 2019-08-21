import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import { Route } from 'react-router-dom';
import ContactData from './ContactData/ContactData';
import { connect } from 'react-redux';

class Checkout extends Component {

    // state = {
    //     ingredients: {
    //         salad: 1,
    //         meat: 1,
    //         cheese: 1,
    //         bacon: 1
    //     },
    //     price: 0
    // }

    componentWillMount() {
        // const query = new URLSearchParams(this.props.location.search);
        // const ingredientsObj = {};
        // let price = 0;
        // for (let param of query.entries()) {
        //     if(param[0]==='price'){
        //         price=param[1];
        //     }else{
        //         ingredientsObj[param[0]] = +param[1];
        //     }
        // }
        // this.setState({ ingredients: ingredientsObj, totalPrice: price });
    }

    cancelHandler = () => {
        this.props.history.goBack();
    }

    continueHandler = () => {
        this.props.history.replace('/checkout/contactdata');
    }

    render() {
        return (
            <div>
                <CheckoutSummary
                    ingredients={this.props.ingredients}
                    continueClicked={this.continueHandler}
                    cancelClicked={this.cancelHandler} />
                <Route 
                    path={this.props.match.url + '/contactdata'} 
                    render={(props)=> (<ContactData {...props} />)} />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        ingredients: state.ingredients,
        totalPrice: state.totalPrice
    }
}

const mapDispatchToProps = (action) => {
    return {

    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Checkout);