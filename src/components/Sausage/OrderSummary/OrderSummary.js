import React from 'react';
import Aux from '../../../hoc/_Aux/_Aux';
import Button from 'react-bootstrap/Button';
import classes from './OrderSummary.css';

const orderSummary = props => {
  const ingredientSummary = Object.keys(props.ingredients)
    .filter(item => props.ingredients[item]>0)
    .map(igKey => {
      return (
        <li key={igKey}>
          <span style={{ textTransform: 'capitalize' }}>{igKey}</span>:{' '}
          {props.ingredients[igKey]}
        </li>
      );
  });

  return (
    <Aux>
      <div className={classes.orderStructure}>
        <h3>Your Order</h3>
        <p>A delicious sausage with the following ingredients:</p>
        <ul>{ingredientSummary}</ul>
        <p>
          <strong>Total Price: {props.price.toFixed(2)}</strong>
        </p>
        <p>Continue to Checkout?</p>
        <div className={classes.summaryButtons}>
          <Button variant="danger" className={classes.summaryButton} onClick={props.purchaseCancelled}>
            CANCEL
          </Button>
          &nbsp; &nbsp;
          <Button variant="primary" className={classes.summaryButton} onClick={props.purchaseContinued}>
            CONTINUE
          </Button>
          </div>
          <br/>
      </div>
    </Aux>
  );
};

export default orderSummary;
