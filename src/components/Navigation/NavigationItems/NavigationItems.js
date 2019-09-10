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
                : <NavigationItem link="/auth">Login</NavigationItem>
            }
        </ul>
    );
}

export default navigationItems;