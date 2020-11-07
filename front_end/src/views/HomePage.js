import React, { useState } from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import "./HomePage.css";
import Cookies from 'universal-cookie';
import homepage from '../utils/homepage';
import NavigationBar from '../components/NavigationBar'
import BookGridList from '../components/BookGridList'
import Container from '@material-ui/core/Container'

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
    <div className="HomePage">
      <NavigationBar />
      <Container maxWidth="md">
        <BookGridList />
      </Container>
    </div>
  );
};

export default HomePage;