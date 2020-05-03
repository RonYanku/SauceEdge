import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { useForm } from 'react-hook-form';
import Spinner from '../../components/UI/Spinner/Spinner';
import classes from './Auth.css';
import * as actions from '../../store/actions/index';

const auth = props => {

  const { handleSubmit, register, errors } = useForm();

  const [isSignup, setIsSignup] = useState(true);

  const { buildingsausage, authRedirectPath, onSetAuthRedirectPath } = props;

  useEffect(() => {
    if (!buildingsausage && authRedirectPath !== '/') {
      onSetAuthRedirectPath();
    }
  }, [buildingsausage, authRedirectPath, onSetAuthRedirectPath]);

  const submitHandler = data => {
    props.onAuth(data.email, data.password, isSignup);
  };

  const switchAuthModeHandler = () => {
    setIsSignup(!isSignup);
  };

let myForm = (
  <form onSubmit={handleSubmit(submitHandler)}>
  email:
  <br/>
  <input
    name="email"
    ref={register({
      required: 'Required',
      pattern: {
        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
        message: "invalid email address"
      }
    })}
  />
  <br/>
  {errors.email && errors.email.message}
    <br/>
    password:
    <br/>
  <input type="password"
    name="password"
    ref={register({
      validate: value => value !== "admin" || "Nice try!",
      required: 'Required'
    })}
  />
  <br/>
  {errors.password && errors.password.message}
  <br/>
  <Button type="submit" variant="success">SUBMIT</Button>
</form>);

  if (props.loading) {
    myForm = <Spinner />;
  }

  let errorMessage = null;

  if (props.error) {
    errorMessage = <p>{props.error.message}</p>;
  }

  let authRedirect = null;
  if (props.isAuthenticated) {
    authRedirect = <Redirect to={props.authRedirectPath} />;
  }

  return (
      <div className={classes.Auth}>
        <strong className={classes.SauceEdge}>Sauce Edge</strong>
        <br/>
        {authRedirect}
        {errorMessage}       
        {myForm}
        <br/>
        <Button onClick={switchAuthModeHandler} variant="dark">
          SWITCH TO {isSignup ? 'SIGNIN' : 'SIGNUP'}
        </Button>
      </div>
  );
};

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: state.auth.token !== null,
    buildingsausage: state.sausageBuilder.building,
    authRedirectPath: state.auth.authRedirectPath
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, password, isSignup) =>
      dispatch(actions.auth(email, password, isSignup)),
    onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(auth);
