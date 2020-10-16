import React, { useState } from "react";
// import isEmpty from "is-empty";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import "./HomePage.css";
import Cookies from 'universal-cookie';
import homepage from '../requests/homepage';

const cookies = new Cookies();

const HomePage = props => {

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
      
      </div>
    </div>
  );
};

export default HomePage;