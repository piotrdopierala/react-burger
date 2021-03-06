import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Input from '../../../components/UI/Input/Input';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import classes from './LogIn.module.css';
import * as actions from '../../../store/actions/index';
import checkValidation from '../../../shared/validation';

class LogIn extends Component {
    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Email address'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 1,
                    contains: ['@', '.']
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 1
                },
                valid: false,
                touched: false
            }
        }
    }

    componentDidMount(){
        if(!this.props.building && this.props.authRedirectPath !== '/'){
            this.props.onSetAuthRedirectPath();
        }
    }

    inputChangedHandler = (event, controlName) => {
        const updatedControls = {
            ...this.state.controls,
            [controlName]: {
                ...this.state.controls[controlName],
                value: event.target.value,
                valid: checkValidation(event.target.value, this.state.controls[controlName].validation),
                touched: true
            }
        };
        this.setState({ controls: updatedControls });
    }

    submitHandler = (event) => {
        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignIn);
    }

    switchToSignInHandler = () => {
        this.props.history.push('/signin');
    }

    render() {
        const formElementsArray = [];
        for (let key in this.state.controls) {
            formElementsArray.push({
                id: key,
                config: this.state.controls[key]
            });
        }

        let form = formElementsArray.map(formElement => (
            <Input
                key={formElement.id}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                changed={(event) => this.inputChangedHandler(event, formElement.id)}
                invalid={!formElement.config.valid}
                shouldValidate={formElement.config.validation}
                touched={formElement.config.touched} />
        ));

        if (this.props.loading) {
            form = <Spinner />
        }

        let errorMessage = null;
        if (this.props.error) {
            errorMessage = (<div style={{ margin: '10px' }}><p className={classes.error}>{this.props.error}</p>Try again.</div>);
        }

        let authRedirect = null;
        if (!this.state.isSignIn && this.props.isAuthenticated) {
            authRedirect = <Redirect to={this.props.authRedirectPath} />;
        }

        return (            
            < div className = { classes.Auth } >
                { authRedirect }
                <div style={{ 'padding': '10px' }}>
                    Log in
                </div>
                <form onSubmit={this.submitHandler}>
                    {errorMessage}
                    {form}
                    <Button btnType="Success">SUBMIT</Button>
                </form>
                <Button
                    btnType="Danger"
                    clicked={this.switchToSignInHandler}>
                    SWITCH TO SIGN IN
                </Button>
            </div >
        );
    }
}

const mapStateToProps = (state) => {
    return {
        loading: state.logIn.loading,
        error: state.logIn.error,
        isAuthenticated: state.logIn.token !== null,
        building: state.burgerBuilder.building,
        authRedirectPath: state.logIn.authRedirectPath
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onAuth: (email, password, isSignIn) => dispatch(actions.logIn(email, password, isSignIn)),
        onSetAuthRedirectPath: () => dispatch(actions.setLogInRedirectPath('/'))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(LogIn);

