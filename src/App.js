import React, { Component } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';
import LogIn from './containers/Auth/LogIn/LogIn';
import SignIn from './containers/Auth/SignIn/SignIn';
import Logout from './containers/Auth/Logout/Logout';
import * as actions from './store/actions/index';

class App extends Component {
  componentDidMount() {
    this.props.onTryAutoSingup();
  }
  render() {
    let routes = (
      <Switch>
        <Route path='/login' component={LogIn} />
        <Route path='/signin' component={SignIn} />
        <Route path='/' component={BurgerBuilder} />
        <Redirect to='/'/>
      </Switch>
    );

    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path='/signin' component={SignIn} />
          <Route path='/checkout' component={Checkout} />
          <Route path='/orders' component={Orders} />
          <Route path='/logout' component={Logout} />
          <Route path='/' component={BurgerBuilder} />
        </Switch>
      );
    }

    return (
      <Layout>
        {routes}
      </Layout>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onTryAutoSingup: () => dispatch(actions.authCheckState())
  };
};


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
