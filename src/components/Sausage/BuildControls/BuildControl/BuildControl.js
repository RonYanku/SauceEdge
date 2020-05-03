import React from 'react';
import classes from './BuildControl.css';
import Button from 'react-bootstrap/Button'
import { connect } from 'react-redux';
import axios from '../../../../axios-orders';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { FaPlus, FaMinus } from 'react-icons/fa';

const buildControl = (props) => (

    <div className={classes.MenuItem}>
       <div className={classes.Label}>{props.label}</div>
        <img className={classes.MenuItemImage} src={props.image} alt="" />
        <div className={classes.Label}>{props.prices[props.label]}$</div>
        <ButtonGroup>
            <Button 
                style={{ margin: "5px", width: "60px", height: "60px", background: "rgb(214, 197, 46)", color:"black", boxShadow: "5px 5px 3px rgba(46, 46, 46, 0.62)"}}
                onClick={props.removed} 
                disabled={props.disabled}><FaMinus /></Button>
            <Button
                style={{margin: "5px", width: "60px", height: "60px", background:"rgb(214, 197, 46)", color:"black", boxShadow: "5px 5px 3px rgba(46, 46, 46, 0.62)"}}
                className={classes.More} 
                onClick={props.added}><FaPlus /></Button>
        </ButtonGroup>
    </div>

);

const mapStateToProps = state => {
    return {
      prices: state.sausageBuilder.INGREDIENT_PRICES
    };
  };
  export default connect(mapStateToProps)(buildControl, axios);
