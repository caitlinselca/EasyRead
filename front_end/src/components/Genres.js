import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
// import isEmpty from "is-empty";
import { Link, useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import "./Genres.css";
import { fontFamily } from "@material-ui/system";

const RegisterView = props => {
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
          Select Your Favorite Genres!
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
            Horror
          </Button> {' '}
        {/* </div>
        <div className = "Button"> */}
          <Button
            className={classes.button}
            type="submit"
            variant="contained"
            color="primary"
          >
            Thriller
          </Button> {' '}
        {/* </div> */}
        {/* <div className = "Button"> */}
          <Button
            className={classes.button}
            type="submit"
            variant="contained"
            color="primary"
          >
            Romance
          </Button> {' '}
        </div>
        <div className = "ButtonAlignment">
          <Button
            className={classes.button}
            type="submit"
            variant="contained"
            color="primary"
          >
            Drama
          </Button> {' '}
          <Button
            className={classes.button}
            type="submit"
            variant="contained"
            color="primary"
          >
            Action
          </Button> {' '}
          <Button
            className={classes.button}
            type="submit"
            variant="contained"
            color="primary"
          >
            Fantasy
          </Button>
        <div className = "Button">
          <Button
            className={classes.button}
            type="submit"
            variant="contained"
            color="primary"
          >
            Comedy
          </Button> {' '}
          <Button
            className={classes.button}
            type="submit"
            variant="contained"
            color="primary"
          >
            Mystery
          </Button> {' '}
          <Button
            className={classes.button}
            type="submit"
            variant="contained"
            color="primary"
          >
            Sci-Fi
          </Button> {' '}
          <Button
            className={classes.button}
            type="submit"
            variant="contained"
            color="primary"
          >
            Fiction
          </Button> {' '}
          <Button
            className={classes.button}
            type="submit"
            variant="contained"
            color="primary"
          >
            Non-Fiction
          </Button> {' '}
          <Button
            className={classes.button}
            type="submit"
            variant="contained"
            color="primary"
          >
            Educational
          </Button> {' '}
          <Button
            className={classes.button}
            type="submit"
            variant="contained"
            color="primary"
          >
            Crime
          </Button> {' '}
          <Button
            className={classes.button}
            type="submit"
            variant="contained"
            color="primary"
          >
            Young Adult
          </Button> {' '}
          <Button
            className={classes.button}
            type="submit"
            variant="contained"
            color="primary"
          >
            Children's Books
          </Button> {' '}
        </div>
        </div>
        <div className = "EndButton">
          <Button
            className={classes.button2}
            type="submit"
            variant="contained"
            //color="primary"
            href="/subjects"
          >
            Next Page
          </Button>
        </div>
      </form>
      </div>
    </div>
  );
};

export default RegisterView;