import React, { useState, useEffect, useReducer, useContext } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
import AuthContext from '../../store/auth-context';

const emailReducer = (state, action) => {
 
  if (action.type === 'USER_INPUT') {
    return {value: action.payload, isValid: action.payload.includes('@')}
  }
  if (action.type === 'INPUT_BLUR') {
    return {value: state.value, isValid: state.value.includes('@')}
  }
  return {value: '', isValid: false}
}

const passwordReducer = (state, action) => {
  
  if (action.type === 'USER_INPUT') {
    return {value: action.payload, isValid: action.payload.trim().length > 6}
  }
  if (action.type === 'INPUT_BLUR') {
    return {value: state.value, isValid: state.value.trim().length > 6}
  }
  return {value: '', isValid: false}
}

const Login = (props) => {

  const ctx = useContext(AuthContext)
  // const [enteredEmail, setEnteredEmail] = useState('');
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState('');
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, dispatchEmail] = useReducer(emailReducer, {value: '', isValid: null})

  const [passwordState, dispatchPass] = useReducer(passwordReducer, {value: '', isValid: null})
  
  const {isValid: emailIsValid} = emailState
  const {isValid: passwordIsValid} = passwordState

  useEffect(() => {
    setFormIsValid(
      passwordState.isValid && emailState.isValid
    );
  }, [emailIsValid, passwordIsValid])

  const emailChangeHandler = (event) => {

    dispatchEmail({type: 'USER_INPUT', payload: event.target.value});


  };

  const passwordChangeHandler = (event) => {
    
    dispatchPass({type: 'USER_INPUT', payload: event.target.value})

    setFormIsValid(
      event.target.value.trim().length > 6 && emailState.isValid
    );
    
  };

  const validateEmailHandler = () => {
    dispatchEmail({type: 'INPUT_BLUR'});
    // setEmailIsValid(emailState.value.includes('@'));
  };

  const validatePasswordHandler = () => {
    dispatchPass({type: 'INPUT_BLUR'})
  };

  const submitHandler = (event) => {
    event.preventDefault();
    ctx.onLogin(emailState.value, passwordState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailState.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordState.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={passwordState.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
