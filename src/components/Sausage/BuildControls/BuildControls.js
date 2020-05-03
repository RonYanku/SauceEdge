import React from 'react';
import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';

const buildControls = ( props ) => (
    <div className={classes.BuildControls}>
    <br/>
        {props.menuType.map( ctrl => (
            <BuildControl
                key={ctrl.label}
                label={ctrl.label}
                image={ctrl.image}
                added={() => props.ingredientAdded( ctrl.type )}
                removed={() => props.ingredientRemoved( ctrl.type )}
                disabled={props.disabled[ctrl.type]} />
        ) )}
    </div>
);

export default buildControls;