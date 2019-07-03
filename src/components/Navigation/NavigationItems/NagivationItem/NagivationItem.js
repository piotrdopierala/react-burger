import React from 'react';
import PropType from 'prop-types';
import classes from './NavigationItem.module.css';

const navigationItem = (props) => {
    return (
        <li className={classes.NavigationItem}>
            <a
                href={props.link}
                className={props.active ? classes.active : null}>

                {props.children}
            </a>
        </li>
    );
}

navigationItem.propTypes = {
    link: PropType.string,
    active: PropType.bool
}

export default navigationItem;