import React from "react";
import "./HomePage.css";
import { getGenres, getBooks } from '../utils/utils'; 
import NavigationBar from '../components/NavigationBar'
import Container from '@material-ui/core/Container'
import CalculateBooks from './CalculateBooks'


class HomePage extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      books: [],
      mounted: false
    }
  }

  async componentDidMount() {
    
    console.log("I am called");

    let response = await getBooks();
    console.log("Response: ", response);

    this.setState({books: response.books, mounted:true});
    console.log("State:", this.state.books);

  }

  render(){
    return !this.state.mounted ? (<CalculateBooks />) : (
      <div className="HomePage">
        <NavigationBar />
        <Container maxWidth="md">
          
          <div className = "root">
            {this.state.books == null || this.state.books.length == 0 ? (<div> No books :( </div>) : this.state.books.map(book => {
              
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
        <div class="centerbutton">
            <div class="pagination">
              <button href="#">❮</button>
              <button href="#">❯</button>
            </div>
          </div>
      </div>
    );
  }
};

export default HomePage;