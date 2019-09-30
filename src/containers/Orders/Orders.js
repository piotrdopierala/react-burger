import React, { Component } from 'react';
import Spinner from '../../components/UI/Spinner/Spinner';
import axios from '../../axios-orders';
import Order from '../../components/Order/Order';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';
import { connect } from 'react-redux';

class Orders extends Component {
    componentDidMount() {
        this.props.onFetchOrders(this.props.token);
    }

    render() {
        let orderedBurgersJSX = [];
        if (!this.props.loading) {
            orderedBurgersJSX = this.props.orders.map(order => {
                return order.orderedBurgers.map(burger => {
                    return (
                        <Order
                            key={burger.id}
                            burger={burger}
                            price={order.deliveryData.price}
                        />
                    );
                });
            }
            );
        } else {
            orderedBurgersJSX = <Spinner />
        }

        return (
            <div>
                {orderedBurgersJSX}
            </div >
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onFetchOrders: (token) => { dispatch(actions.fetchOrderStartAsync(token)) }
    }
}

const mapStateToProps = (state) => {
    return {
        orders: state.order.orders,
        loading: state.order.loading,
        token: state.logIn.token
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));