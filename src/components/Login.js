import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
// import isEmpty from "is-empty";
// import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import "./Login.css";

const LoginView = props => {
  const [state, setState] = useState({
    username: "",
    password: ""
  });

  const loginUser = event => {
    event.preventDefault();
    props.loginUser(state);
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
      {/* <div className="logincontainer"></div> */}
      {/* <Paper
        variant="elevation"
        elevation={2}
        className="login-background"
        > */}
      <div className="EasyReadTitle">
        <label>
            Easy Read
        </label>
      </div>
      <div className="EasyReadIntro">
        <label>
            Easy Read is an easy way to find the best books in your preferred reading style. Want a horror that also involves drama? Our system will recommend the best books for you!
        </label>
      </div>
      {/* <label>
          Are you already part of Easy Read?
      </label> */}
      <div className="LoginContainer">
      <form onSubmit={loginUser} autoComplete="off">
      <div className = "EasyReadLoginTitle">
      <label>
          Are you already part of Easy Read?
      </label>
      </div>
        <div>
          <TextField
            value={state.username}
            // error={
            //   !isEmpty(props.errors.username) ||
            //   !isEmpty(props.errors.userNotFound)
            // }
            // helperText={props.errors.username || props.errors.userNotFound}
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
            // error={
            //   !isEmpty(props.errors.password) ||
            //   !isEmpty(props.errors.credentials)
            // }
            // helperText={props.errors.password || props.errors.credentials}
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
            //color="primary"
          >
            Login
          </Button>
        </div>

        <br></br>
        <div className = "EasyReadRegisterTitle">
        <label>
          Not part of Easy Read?
        </label>
        </div>
        <div>
        <Button
          className={classes.button}
          type="submit"
          variant="contained"
            //color="red"
          >
          {/* <Link to="/register"> */}
            Sign Up
            {/* </Link> */}
          </Button>
        </div>
      </form>
      </div>
    </div>
  );
};

export default LoginView;