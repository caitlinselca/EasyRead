import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import "./HomePage.css";
import Cookies from 'universal-cookie';
import getBooks from '../requests/homepage';
import NavigationBar from '../components/NavigationBar'
import BookGridList from '../components/BookGridList'
import Container from '@material-ui/core/Container'
// import { makeStyles } from '@material-ui/core/styles';
// import { Grid, Card, CardMedia, CardActionArea, CardContent, Typography } from '@material-ui/core/';

const cookies = new Cookies();

class HomePage extends React.Component {

  // const [popularBooks, setBooks] = useState([]);
  // const [booklist, createBooks] = useState([]);
  // useEffect(async() => {
  //   let response = await getBooks();
  //   let books = response.map(book => ({
  //     id: book.isbn,
  //     title: book.title,
  //     author: book.authors[0].name,
  //     cover: book.cover_id
  //   }));
  //   console.log(books);
  //   createBooks(books);
  //   //author: authors -> name
  //   //title: title
  //   //cover: cover_id
  // });

  constructor(props) {
    super(props);

    this.state = {books: []}
  }

  async componentDidMount() {
    let response = await getBooks();
    let booklist = response.map(book => ({
          title: book.title,
          author: book.authors[0].name,
          cover: book.cover_id
      }));

    this.setState({books: booklist});
    console.log(this.state.books);

  }

  // const useStyles = makeStyles(theme => ({
  //   textField: {
  //     width: "100%",
  //     marginTop: "1%"
  //   },
  //   button: {
  //     width: "50%",
  //     display: "flex",
  //     justifyContent: "center",
  //     alignItems: "center",
  //     marginLeft: "25%",
  //     marginTop: ".5%"
  //   }
  // }));

render(){
  return (
    <div className="HomePage">
      <NavigationBar />
      <Container maxWidth="md">
        <div className = "root">
          {this.state.books !== undefined && this.state.books.map(book => {
            return(
              <div className = "books">
                <div className="image"><img src={`http://covers.openlibrary.org/b/id/${book.cover}-M.jpg`}></img></div>
                <div className="title">{book.title}</div>
                <div className="author">{book.author}</div>
              </div>
            )
          }) }
        </div>
        {/* <BookGridList books={books}/> */}
        {/* <img src="http://covers.openlibrary.org/b/id/9277716-M.jpg"></img> */}
      </Container>
    </div>
  );
}
};

export default HomePage;