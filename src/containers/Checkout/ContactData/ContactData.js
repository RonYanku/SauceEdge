import React, { useState } from 'react';
import { connect } from 'react-redux';

import Aux from '../../../hoc/_Aux/_Aux';
import Modal from '../../../components/UI/Modal/Modal';

import classes from './ContactData.css';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'
import FormLabel from 'react-bootstrap/FormLabel'

import Spinner from '../../../components/UI/Spinner/Spinner';
import axios from '../../../axios-orders';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../../store/actions/index';

import {loadStripe} from '@stripe/stripe-js';

import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  Elements,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js';


const ELEMENT_OPTIONS = {
  style: {
    base: {
      fontSize: '18px',
      color: '#424770',
      letterSpacing: '0.025em',
      '::placeholder': {
        color: '#aab7c4',
      },
    },
    invalid: {
      color: '#9e2146',
    },
  },
};



const stripePromise = loadStripe('pk_test_6pRNASCoBOKtIshFeQd4XMUh');


const paymentData = props => {
  const [purchasing, setPurchasing] = useState(false);
  const CheckoutForm = () => {
    const elements = useElements();
    const stripe = useStripe();
    const [name, setName] = useState('');
    const [errorMessage, setErrorMessage] = useState(null);
    const [paymentMethod, setPaymentMethod] = useState(null);
  
    const CancelPayment = () => {
      props.history.push('/');
    }

    
    const handleSubmit = async (event) => {
      event.preventDefault();

      if (!stripe || !elements) {
        // Stripe.js has not loaded yet. Make sure to disable
        // form submission until Stripe.js has loaded.
        return; 
      }

      const cardElement = elements.getElement(CardNumberElement);
  
      const payload = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
        billing_details: {
          name
        },
      });
  
      if (payload.error) {
        console.log('[error]', payload.error);
        setErrorMessage(payload.error.message);
        setPaymentMethod(null);
      } else {
        console.log('[PaymentMethod]', payload.paymentMethod);
        setPaymentMethod(payload.paymentMethod);
        setErrorMessage(null);
      }

      const order = {
          ingredients: props.ings,
          price: props.price,
          userId: props.userId,
          paymentDetails: payload.paymentMethod
      };

      if (payload.paymentMethod) {
      setPurchasing(true);
      await props.onOrdersausage(order, props.token);
    
      setTimeout(() => {
        setPurchasing(false);
        props.history.push('/');
      }, 2000);
    }
    };

    return (
      <div>
        <br/>
        <br/>
        <strong className={classes.PaymentHeader}>Payment Details</strong>
        <br/>
        <div className={classes.PaymentData}>
        <Form onSubmit={handleSubmit}>
        <FormLabel htmlFor="name">Full Name</FormLabel>
        <input className={classes.PaymentInput}
          id="name"
          required
          placeholder="John Doe"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <label htmlFor="cardNumber">Card Number</label>
        <br/>
        <CardNumberElement
          id="cardNumber"
          required
          options={ELEMENT_OPTIONS}
        />
        <label htmlFor="expiry">Card Expiration</label>
        <CardExpiryElement
          id="expiry"
          options={ELEMENT_OPTIONS}
        />
        <label htmlFor="cvc">CVC</label>
        <CardCvcElement
          id="cvc"
          options={ELEMENT_OPTIONS}
        />
        <Button onClick={CancelPayment} variant="danger" disabled={!stripe}>
          Cancel
        </Button>
        &nbsp;&nbsp;
        <Button type="submit" disabled={!stripe}>
          Pay
        </Button>
      </Form>
      </div>
    </div>  
      );
    };

  
  return (
  <Elements stripe={stripePromise}>
    <Aux>
    <Modal show={purchasing}>
      {<strong className={classes.PaymentSuccessful}>Order Successful</strong>}
    </Modal>
    <CheckoutForm />
    </Aux>
  </Elements>
  )
}

const mapStateToProps = state => {
  return {
    ings: state.sausageBuilder.ingredients,
    price: state.sausageBuilder.totalPrice,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onOrdersausage: (orderData, token) =>
      dispatch(actions.purchasesausage(orderData, token))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(paymentData, axios));
