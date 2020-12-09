import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { login }from "../utils/utils";
import Cookies from 'universal-cookie';
import "./Login.css";

const cookies = new Cookies();

const LoginView = props => {
  const [state, setState] = useState({
    username: "",
    password: ""
  });
  const [error, setError] = useState({
    isError:  false,
    errorMessage: ""
  }); 

  const history = useHistory();

  const loginUser = async event => {
    event.preventDefault();
    let response = await login(state);
    if(response.status == 200){
      setError({...error, [false]: [""]});
      cookies.set('accessToken', response.data.accessToken, { path: '/' });
      history.push('/welcome');
    }
    else{
      setError({isError: true, errorMessage: response.data});
    }
  };

  const handleChange = event => {
    setState({ ...state, [event.target.id]: event.target.value });
  };

  const useStyles = makeStyles(theme => ({
    textField: {
      width: "100%",
      marginTop: "1%"
    },
    button: {
      width: "50%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      marginLeft: "25%",
      marginTop: ".5%"
    }
  }));

  const classes = useStyles();

  return (
    <div className="Login">
      <div className="EasyReadLoginTitle">
        <label>
            Easy Read
        </label>
      </div>
      <div className="EasyReadLoginIntro">
        <label>
            Finding books has never been easier.
        </label>
      </div>
      <div className="LoginContainer">
      <form onSubmit={loginUser} autoComplete="off">
      <div className = "EasyReadLoginQuestion">
      <label>
          Are you already part of Easy Read?
      </label>
      </div>
        <div>
          <TextField
            value={state.username}
            onChange={handleChange}
            className={classes.textField}
            id="username"
            label="Username"
            variant="outlined"
          />
        </div>
        <br></br>
        <div>
          <TextField
            value={state.password}
            onChange={handleChange}
            className={classes.textField}
            id="password"
            label="Password"
            variant="outlined"
            type="password"
          />
        </div>
        <br></br>
        <div>
          <Button
            className={classes.button}
            type="submit"
            variant="contained"
          >
            Login
          </Button>
        </div>

        <br></br>
        <div className = "EasyReadRegisterQuestion">
        <label>
          Not part of Easy Read?
        </label>
        </div>
        <div>
        <Button
          className={classes.button}
          type="submit"
          variant="contained"
          onClick={() => {history.push('/register')}}
          >
            Sign Up
          </Button>
        </div>
      </form>
      </div>

      {error.isError &&
        <div className = "login-err-banner">
          {error.errorMessage}
        </div>
      }

    </div>
  );
};

export default LoginView;