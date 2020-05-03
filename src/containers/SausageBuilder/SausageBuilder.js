import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BuildControls from '../../components/Sausage/BuildControls/BuildControls'
import Aux from '../../hoc/_Aux/_Aux';
import Modal from 'react-bootstrap/Modal'
import OrderSummary from '../../components/Sausage/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';
import axios from '../../axios-orders';
import classes from './SausageBuilder.css';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import bratwurst from '../../assets/images/bratwurst.jpg';
import knackwurst from '../../assets/images/knackwurst.jpg';
import chorizo from '../../assets/images/chorizo.jpg';
import andouille from '../../assets/images/andouille.jpg';
import mustard from '../../assets/images/mustard.jpg';
import ketchup from '../../assets/images/kentuckyKetchup.jpg'
import bbq from '../../assets/images/bbq.jpg';
import jalapeno from '../../assets/images/thousandIslands.jpg';
import sourcream from '../../assets/images/sourCream.jpg';
import  mayo from '../../assets/images/blueCheese.jpg';


const sausageBuilder = props => {

  const saucesMenu = [
    { label: 'mustard', type: 'mustard', image: mustard },
    { label: 'ketchup', type: 'ketchup', image: ketchup },
    { label: 'bbq', type: 'bbq', image: bbq },
    { label: 'mayo', type: 'mayo', image: mayo },
    { label: 'jalapeno', type: 'jalapeno', image: jalapeno },
    { label: 'sourcream', type: 'sourcream', image: sourcream },
  ];
  

  const sausageMenu = [
    { label: 'knackwurst', type: 'knackwurst', image: knackwurst},
    { label: 'bratwurst', type: 'bratwurst', image: bratwurst },
    { label: 'andouille', type: 'andouille', image: andouille },
    { label: 'chorizo', type: 'chorizo', image: chorizo },

  ];

  const [purchasing, setPurchasing] = useState(false);

  const[menuState,setMenuState] = useState(sausageMenu);

  const dispatch = useDispatch();


  const ings = useSelector(state => {
    return state.sausageBuilder.ingredients;
  });
  const price = useSelector(state => state.sausageBuilder.totalPrice);
  const error = useSelector(state => state.sausageBuilder.error);
  const isAuthenticated = useSelector(state => state.auth.token !== null);

  const onIngredientAdded = ingName => dispatch(actions.addIngredient(ingName));
  const onIngredientRemoved = ingName =>
    dispatch(actions.removeIngredient(ingName));

  const onInitIngredients = useCallback(
    () => dispatch(actions.initIngredients()),
    [dispatch]
  );

  const onInitPurchase = () => dispatch(actions.purchaseInit());
  const onSetAuthRedirectPath = path =>
    dispatch(actions.setAuthRedirectPath(path));

  useEffect(() => {
    onInitIngredients();
  }, [onInitIngredients]);

  const updatePurchaseState = ingredients => {
    const sum = Object.keys(ingredients)
      .map(igKey => {
        return ingredients[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    return sum > 0;
  };

  const purchaseHandler = () => {
    if (isAuthenticated) {
      setPurchasing(true);
    } else {
      onSetAuthRedirectPath('/checkout');
      props.history.push('/auth');
    }
  };



  const purchaseCancelHandler = () => {
    setPurchasing(false);
  };

  const purchaseContinueHandler = () => {
    onInitPurchase();
    props.history.push('/checkout/contact-data');
  };

  const disabledInfo = {
    ...ings
  };
  for (let key in disabledInfo) {
    disabledInfo[key] = disabledInfo[key] <= 0;
  }
  let orderSummary = null;
  let sausage = error ? <p>Ingredients can't be loaded!</p> : <Spinner />;

  if (ings) {
    sausage = (
      <Aux>
        <ButtonGroup style={{zIndex: "10" ,width: "100%", height:"60px", position: "fixed"}}>
          <Button 
              style={{borderColor: "green", background:"rgb(214, 197, 46)", color:"black"}} 
              onClick={() => setMenuState(sausageMenu)}>Sausages</Button>
          <Button
              style={{borderColor: "green", background:"rgb(214, 197, 46)", color:"black"}} 
              onClick={() => setMenuState(saucesMenu)}>Sauces</Button>
        </ButtonGroup>
        <br/>
        <br/>
        <BuildControls
          menuType={menuState}
          ingredientAdded={onIngredientAdded}
          ingredientRemoved={onIngredientRemoved}
          disabled={disabledInfo}
          purchasable={updatePurchaseState(ings)}
          ordered={purchaseHandler}
          isAuth={isAuthenticated}
          price={price}
        />
        <br/>
        <br/>
        <button
          className={classes.OrderButton}
          disabled={!updatePurchaseState(ings)}
          onClick={purchaseHandler}>
              {isAuthenticated ? 'ORDER NOW' : 'SIGN UP TO ORDER'}
        </button>   
      </Aux>
    );
    orderSummary = (
      <OrderSummary

        ingredients={ings}
        price={price}
        purchaseCancelled={purchaseCancelHandler}
        purchaseContinued={purchaseContinueHandler}
      />
    );
  }

  return (
    <Aux>
      <Modal className={classes.modalPosition} show={purchasing} modalClosed={purchaseCancelHandler}>
        {orderSummary}
      </Modal>
      {sausage}
    </Aux>
  );
};

export default withErrorHandler(sausageBuilder, axios);
