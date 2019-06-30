import React from 'react';
import classes from './NagivationItems.module.css';
import NavigationItem from './NagivationItem/NagivationItem';

const navigationItems = (props) => {
    return (
        <ul className={classes.NavigationItems}>
            <NavigationItem link="/" active={true} >Burger Builder</NavigationItem>
            <NavigationItem link="/" >Checkout</NavigationItem>
        </ul>
    );
}

export default navigationItems;