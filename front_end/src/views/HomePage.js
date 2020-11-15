import React from "react";
import "./HomePage.css";
import { getGenres, getBooks } from '../utils/utils'; 
import NavigationBar from '../components/NavigationBar'
import Container from '@material-ui/core/Container'

class HomePage extends React.Component {

  constructor(props) {
    super(props);

    this.state = {books: []}
  }

  async componentDidMount() {
    
    console.log("I am called");
    
    let genres = await getGenres();
    console.log(genres);
    let response = await getBooks(genres);
    let booklist = [];
    console.log("Response: ", response);
      
    for(let genres of response){
      console.log()
      genres.works.forEach(book => (
        booklist.push(
        JSON.stringify({
          title: book.title,
          author: book.authors[0].name,
          cover: book.cover_id
        })  
      )));
    }

    booklist = new Set(booklist);

    this.setState({books: Array.from(booklist).map(JSON.parse)});
    console.log("State:", this.state.books);

  }

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
      </Container>
    </div>
  );
}
};

export default HomePage;