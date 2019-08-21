import React, { Component } from 'react'
import Aux from '../../hoc/Auxiliary/Auxiliary'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { connect } from 'react-redux';
import * as actions from '../../store/actions';

class BurgerBuilder extends Component {
    state = {
        //ingredients: null,
        //totalPrice: 4,
        puchasable: false,
        purchasing: false,
        loading: false,
        error: false
    };

    componentDidMount() {
        axios.get("http://localhost:8080/burger/api/ingredient/getAll").then(
            (response) => {
                let ingredientList = {};
                response.data.forEach(el => {
                    ingredientList[el["name"]] = 0
                })
                //this.setState({ ingredients: ingredientList });
                this.props.onSetIngredients(ingredientList);
            }
        ).catch((error) => {
            this.setState({ error: true });
        })
    }

    updatePurchaseState(ingerients) {
        if (Object.keys(ingerients).length > 0) {
            const igCount = Object.keys(ingerients)
                .map(igkey => ingerients[igkey])
                .reduce((sum, elCount) => sum + elCount);
            if ((igCount > 0) !== this.state.puchasable) {
                this.setState({ puchasable: igCount > 0 })
            }
        }
    };

    addIngredientHandler = (type) => {
        //const oldCount = this.state.ingredients[type];
        //const updatedCount = oldCount + 1;
        //const updatedIngredients = { ...this.state.ingredients };
        //updatedIngredients[type] = updatedCount;

        // const priceAddition = INGREDIENT_PRICES[type];
        // const oldPrice = this.state.totalPrice;
        // const newPrice = oldPrice + priceAddition;

        //this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
        this.props.onAddIngredient(type, 1);
        //this.updatePurchaseState(this.props.ingerients);//nie jestem pewien czy od razu zaktualizuje ilosci ingr
    }

    removeIngredientHandler = (type) => {
        // const oldCount = this.props.ingredients[type];
        // if (oldCount === 0) {
        //     return;
        // }
        // const updatedCount = oldCount - 1;
        // const updatedIngredients = { ...this.state.ingredients };
        // updatedIngredients[type] = updatedCount;

        // const priceSubstraction = INGREDIENT_PRICES[type];
        // const oldPrice = this.state.totalPrice;
        // const newPrice = oldPrice - priceSubstraction;

        //this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
        this.props.onRemoveIngredient(type, 1);
        //this.updatePurchaseState(this.props.ingerients);
    }

    componentDidUpdate() {
        this.updatePurchaseState(this.props.ingredients);
    }


    purchaseHandler = () => {
        this.setState({ purchasing: true });
    }

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false });
    }

    purchaseContinueHandler = () => {
        // const queryParams = [];
        // for (let ing in this.props.ingredients) {
        //     queryParams.push(encodeURIComponent(ing) + '=' + encodeURIComponent(this.state.ingredients[ing]));
        // }
        // queryParams.push('price=' + this.state.totalPrice);
        // const queryString = queryParams.join('&');
        // this.props.history.push({
        //     pathname: '/checkout',
        //     search: '?' + queryString
        // });
        this.props.history.push({
            pathname: '/checkout'
        });
    }

    render() {
        const disabledInfo = {
            ...this.props.ingredients
        };
        for (let key in disabledInfo) {
            disabledInfo[key] = (disabledInfo[key] <= 0); //true jesli ilosc skladnika <= 0
        }
        let burger = this.state.error ? <p>Ingredient's can't be loaded! Reload Page.</p> : <Spinner />;
        let orderSummary = null;
        if (this.state.loading) {
            orderSummary = <Spinner />;
        }
        if (this.props.ingredients) {
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ingredients} />
                    <BuildControls
                        ingredientAdded={this.addIngredientHandler}
                        ingredientRemoved={this.removeIngredientHandler}
                        disabled={disabledInfo}
                        puchasable={this.state.puchasable}
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
        if (this.state.loading) {
            orderSummary = <Spinner />;
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
        ingredients: state.ingredients,
        totalPrice: state.totalPrice
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        onSetIngredients: (ingr) => dispatch({ type: actions.SET_INGREDIENTS, ingredients: ingr }),
        onAddIngredient: (ingr, amnt) => dispatch({ type: actions.ADD_INGREDIENT_AMOUNT, ingredient: ingr, amount: amnt }),
        onRemoveIngredient: (ingr, amnt) => dispatch({ type: actions.SUB_INGREDIENT_AMOUNT, ingredient: ingr, amount: amnt })
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));