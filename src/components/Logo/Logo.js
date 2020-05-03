import React from 'react';

import SausageLogo from '../../assets/images/logo.png';
import classes from './Logo.css';

const logo = (props) => (
    <div className={classes.Logo} style={{height: props.height}}>
        <img src={SausageLogo} alt="Sauce Edge" />
    </div>
);

export default logo;