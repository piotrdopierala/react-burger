import React from 'react';
import PropType from 'prop-types';
import classes from './Backdrop.module.css'

const backdrop = (props) => (
    props.show ? <div className={classes.Backdrop} onClick={props.clicked}></div> : null
);

backdrop.propTypes = {
    clicked: PropType.func
}

export default backdrop;
