import React from 'react';
import classes from './NagivationItems.module.css';
import NavigationItem from './NagivationItem/NagivationItem';

const navigationItems = (props) => {
    return (
        <ul className={classes.NavigationItems}>
            <NavigationItem link="/">Burger Builder</NavigationItem>
            <NavigationItem link="/orders">Orders</NavigationItem>
            <NavigationItem link="/auth">Login</NavigationItem>
            <NavigationItem link="/sign-in">Sign In</NavigationItem>
        </ul>
    );
}

export default navigationItems;