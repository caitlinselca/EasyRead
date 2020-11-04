import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import "./HomePage.css";
import Cookies from 'universal-cookie';
import getBooks from '../requests/homepage';
import NavigationBar from '../components/NavigationBar'
import BookGridList from '../components/BookGridList'
import Container from '@material-ui/core/Container'

const cookies = new Cookies();

const HomePage = props => {
  const [popularBooks, setBooks] = useState([]);

  useEffect(async() => {
    let response = await getBooks();
    let books = response.map(book => ({
      title: book.title,
      author: book.authors[0].name,
      cover: book.cover_id
    }));
    console.log(books);
    //author: authors -> name
    //title: title
    //cover: cover_id
  });

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
        <BookGridList/>
      </Container>
    </div>
  );
};

export default HomePage;