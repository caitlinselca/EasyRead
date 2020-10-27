import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
// import isEmpty from "is-empty";
import { Link, useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import "./Subjects.css";
import { fontFamily } from "@material-ui/system";

const ThemesView = props => {
  const [state, setState] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: ""
  });

  const history = useHistory();

  const registerUser = event => {
    event.preventDefault();
    props.registerUser(state, history);
  };

  const handleChange = event => {
    setState({ ...state, [event.target.id]: event.target.value });
  };

  const useStyles = makeStyles(theme => ({
    textField: {
      //width: "100%"
    },
    button: {
      width: "30%",
      marginTop: "2%"
    },
    button2: {
      width: "100%"
    }
  }));

  const classes = useStyles();

  return (
    <div className = "Register">
            <div className="EasyReadTitle">
        {/* <label>
            Easy Read
        </label> */}
      </div>
    <div className = "RegisterContainer">
      <form onSubmit={registerUser} autoComplete="off">
      <div className = "EasyReadRegisterTitle">
      <label>
          Select Your Favorite Themes!
      </label>
      </div>
        <br></br>
        <div className = "ButtonAlignment">
          <Button
            className={classes.button}
            type="submit"
            variant="contained"
            color="primary"
          >
            Plot Twist
          </Button> {' '}
        {/* </div>
        <div className = "Button"> */}
          <Button
            className={classes.button}
            type="submit"
            variant="contained"
            color="primary"
          >
            Toxic Relationships
          </Button> {' '}
        {/* </div> */}
        {/* <div className = "Button"> */}
          <Button
            className={classes.button}
            type="submit"
            variant="contained"
            color="primary"
          >
            Coming of Age
          </Button> {' '}
        </div>
        <div className = "ButtonAlignment">
          <Button
            className={classes.button}
            type="submit"
            variant="contained"
            color="primary"
          >
            Emotional
          </Button> {' '}
          <Button
            className={classes.button}
            type="submit"
            variant="contained"
            color="primary"
          >
            Mental Health
          </Button> {' '}
          <Button
            className={classes.button}
            type="submit"
            variant="contained"
            color="primary"
          >
          Women  
          </Button>
        <div className = "Button">
          <Button
            className={classes.button}
            type="submit"
            variant="contained"
            color="primary"
          >
            Crime and Police
          </Button> {' '}
          <Button
            className={classes.button}
            type="submit"
            variant="contained"
            color="primary"
          >
            Love
          </Button> {' '}
          <Button
            className={classes.button}
            type="submit"
            variant="contained"
            color="primary"
          >
            Travel
          </Button> {' '}
          <Button
            className={classes.button}
            type="submit"
            variant="contained"
            color="primary"
          >
            Journey
          </Button> {' '}
          <Button
            className={classes.button}
            type="submit"
            variant="contained"
            color="primary"
          >
            LGBTQ+
          </Button> {' '}
          <Button
            className={classes.button}
            type="submit"
            variant="contained"
            color="primary"
          >
            Times Bestseller
          </Button> {' '}
          <Button
            className={classes.button}
            type="submit"
            variant="contained"
            color="primary"
          >
            Friendships
          </Button> {' '}
          <Button
            className={classes.button}
            type="submit"
            variant="contained"
            color="primary"
          >
            School
          </Button> {' '}
          <Button
            className={classes.button}
            type="submit"
            variant="contained"
            color="primary"
          >
            Inspirational
          </Button> {' '}
        </div>
        </div>
        <div className = "EndButton">
          <Button
            className={classes.button2}
            type="submit"
            variant="contained"
            //color="primary"
            href="/calculatebooks"
          >
            Next Page
          </Button>
        </div>
      </form>
      </div>
    </div>
  );
};

export default ThemesView;