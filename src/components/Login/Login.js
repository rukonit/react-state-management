import React, { useState, useEffect, useReducer } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';

const emailReducer = (state, action) => {
  console.log('email reducer called ' + state.value);
  if (action.type === 'USER_INPUT') {
    return {value: action.payload, isValid: action.payload.includes('@')}
  }
  if (action.type === 'INPUT_BLUR') {
    return {value: state.value, isValid: state.value.includes('@')}
  }
  return {value: '', isValid: false}
}

const passwordReducer = (state, action) => {
  console.log('password reducer called ' + state.value);
  if (action.type === 'USER_INPUT') {
    return {value: action.payload, isValid: action.payload.trim().length > 6}
  }
  if (action.type === 'INPUT_BLUR') {
    return {value: state.value, isValid: state.value.trim().length > 6}
  }
  return {value: '', isValid: false}
}

const Login = (props) => {
  // const [enteredEmail, setEnteredEmail] = useState('');
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState('');
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, dispatchEmail] = useReducer(emailReducer, {value: '', isValid: false})

  const [passwordState, dispatchPass] = useReducer(passwordReducer, {value: '', isValid: false})
  
  // useEffect(() => {
  //   setFormIsValid(
  //     enteredPassword.trim().length > 6 && enteredEmail.includes('@')
  //   );
  // }, [enteredPassword, enteredPassword])

  const emailChangeHandler = (event) => {

    dispatchEmail({type: 'USER_INPUT', payload: event.target.value});

    setFormIsValid(
      passwordState.value.trim().length > 6 && event.target.value.includes('@')
    );


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
    props.onLogin(emailState.value, passwordState.value);
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
