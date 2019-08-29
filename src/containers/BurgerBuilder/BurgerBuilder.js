import React, { Component } from 'react'
import Aux from '../../hoc/Auxiliary/Auxiliary'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { connect } from 'react-redux';
import * as storeActions from '../../store/actions/index';

class BurgerBuilder extends Component {
    state = {
        purchasing: false,
    };

    componentDidMount(){
       this.props.onInitIngredients();
    }


    updatePurchaseState(ingerients) {
        if (Object.keys(ingerients).length > 0) {
            const igCount = Object.keys(ingerients)
                .map(igkey => ingerients[igkey])
                .reduce((sum, elCount) => sum + elCount);
            return igCount > 0
        }
    };


    purchaseHandler = () => {
        this.setState({ purchasing: true });
    }

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false });
    }

    purchaseContinueHandler = () => {
        this.props.history.push('/checkout');
    }

    render() {
        const disabledInfo = {
            ...this.props.ingredients
        };
        for (let key in disabledInfo) {
            disabledInfo[key] = (disabledInfo[key] <= 0); //true jesli ilosc skladnika <= 0
        }
        let burger = this.props.error ? <p>Ingredient's can't be loaded! Reload Page.</p> : <Spinner />;
        let orderSummary = null;
        if (this.props.loading) {
            orderSummary = <Spinner />;
        }
        if (this.props.ingredients) {
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ingredients} />
                    <BuildControls
                        ingredientAdded={(type) => this.props.onAddIngredient(type, 1)}
                        ingredientRemoved={(type) => this.props.onRemoveIngredient(type, 1)}
                        disabled={disabledInfo}
                        puchasable={this.updatePurchaseState(this.props.ingredients)}
                        price={this.props.totalPrice}
                        ordered={this.purchaseHandler}
                    />
                </Aux>
            );
            orderSummary = <OrderSummary
                ingredients={this.props.ingredients}
                purchaseCancelled={this.purchaseCancelHandler}
                purchaseContinued={this.purchaseContinueHandler}
                price={this.props.totalPrice}
            />;
        }
        return (
            <Aux>
                <Modal
                    show={this.state.purchasing}
                    modalClosed={this.purchaseCancelHandler}
                >
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        totalPrice: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        loaded: state.order.loading
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        onInitIngredients: () => dispatch(storeActions.initIngredients()),
        onAddIngredient: (ingr, amnt) => dispatch(storeActions.addIngredient(ingr,amnt)),
        onRemoveIngredient: (ingr, amnt) => dispatch(storeActions.subIngredient(ingr,amnt))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));