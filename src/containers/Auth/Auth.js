import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import classes from './Auth.module.css';
import * as actions from '../../store/actions/index';

class Auth extends Component {

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
        },
        isSignIn: false
    }

    checkValidation(value, rules) {
        if (!rules) {
            return true;
        }
        if (rules.required) {
            if (value.trim() === '')
                return false;
        }
        if (rules.minLength) {
            if (value.trim().length < rules.minLength)
                return false;
        }
        if (rules.maxLength) {
            if (value.trim().length > rules.maxLength)
                return false;
        }
        if (rules.contains) {
            for (let searchedChars of rules.contains) {
                if (!value.includes(searchedChars)) {
                    return false;
                }
            }
        }
        return true;
    }

    inputChangedHandler = (event, controlName) => {
        const updatedControls = {
            ...this.state.controls,
            [controlName]: {
                ...this.state.controls[controlName],
                value: event.target.value,
                valid: this.checkValidation(event.target.value, this.state.controls[controlName].validation),
                touched: true
            }
        };
        this.setState({ controls: updatedControls });
    }

    submitHandler = (event) => {
        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignIn);
    }

    switchAuthModeHandler = () => {
        this.setState(prevState => {
            return {
                isSignIn: !prevState.isSignIn
            };
        })
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
        if (this.state.isSignIn && this.props.isAuthenticated) {
            authRedirect = <Redirect to="/" />;
        }

        return (            
            < div className = { classes.Auth } >
                { authRedirect }
                <div style={{ 'padding': '10px' }}>
                    {this.state.isSignIn ? 'Sign in new user' : 'Log in'}
                </div>
                <form onSubmit={this.submitHandler}>
                    {errorMessage}
                    {form}
                    <Button btnType="Success">SUBMIT</Button>
                </form>
                <Button
                    btnType="Danger"
                    clicked={this.switchAuthModeHandler}>
                    {this.state.isSignIn ? 'SWITCH TO LOG IN' : 'SWITCH TO SIGN IN'}
                </Button>
            </div >
        );
    }
}

const mapStateToProps = (state) => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auty.token !== null
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onAuth: (email, password, isSignIn) => dispatch(actions.auth(email, password, isSignIn))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);

