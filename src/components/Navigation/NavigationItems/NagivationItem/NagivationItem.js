import React from 'react';
import PropType from 'prop-types';
import classes from './NavigationItem.module.css';
import { NavLink } from 'react-router-dom';

const navigationItem = (props) => {
    return (
        <li className={classes.NavigationItem}>
            {/*<a
                href={props.link}
                className={props.active ? classes.active : null}>

                {props.children}
            </a>*/}
            <NavLink 
                activeClassName={classes.active} 
                exact
                to={props.link}>
                {props.children}
            </NavLink>
        </li>
    );
}

navigationItem.propTypes = {
    link: PropType.string,
    active: PropType.bool
}

export default navigationItem;