import React from 'react';
import classes from './NagivationItems.module.css';
import NavigationItem from './NagivationItem/NagivationItem';

const navigationItems = (props) => {
    return (
        <ul className={classes.NavigationItems}>
            <NavigationItem link="/">Burger Builder</NavigationItem>
            {props.isAuthenticated ? <NavigationItem link="/orders">Orders</NavigationItem> : null}
            {props.isAuthenticated
                ? <NavigationItem link="/logout">Logout</NavigationItem>
                : <NavigationItem link="/login">Login</NavigationItem>
            }
            {!props.isAuthenticated ? <NavigationItem link="/signin">Sign In</NavigationItem>:null}
        </ul>
    );
}

export default navigationItems;