import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import { Route, Redirect } from 'react-router-dom';
import ContactData from './ContactData/ContactData';
import { connect } from 'react-redux';

class Checkout extends Component {
    cancelHandler = () => {
        this.props.history.goBack();
    }

    continueHandler = () => {
        this.props.history.replace('/checkout/contactdata');
    }

    render() {
        let summary = <Redirect to="/" />
        if (this.props.ingredients) {
            summary = (
                <div>
                    <CheckoutSummary
                        ingredients={this.props.ingredients}
                        continueClicked={this.continueHandler}
                        cancelClicked={this.cancelHandler} />
                    <Route
                        path={this.props.match.url + '/contactdata'}
                        component={ContactData} />
                </div>
            );
        };
        return summary;
    }
}

const mapStateToProps = (state) => {
    return {
        ingredients: state.burgerBuilder.ingredients
    }
}

export default connect(mapStateToProps)(Checkout);