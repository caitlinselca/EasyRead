import React from "react";
import "./HomePage.css";
import { getGenres, getBooks } from '../utils/utils'; 
import NavigationBar from '../components/NavigationBar';
import Container from '@material-ui/core/Container';
import CalculateBooks from './CalculateBooks';

class HomePage extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      books: [],
      mounted: false,
      currentPage: 1,
      perPage: 50,
      totalBooks: 0,
      totalPages: 0,
      displayBooks: [],
    }

    this.handlePageClick = this.handlePageClick.bind(this);
    this.handlePerPageChange = this.handlePerPageChange.bind(this);
    this.checkInRange = this.checkInRange.bind(this);
    this.renderBooks = this.renderBooks.bind(this);
    this.renderPagination = this.renderPagination.bind(this);
  }

  //==================================================================================================
  // ComponentDid{x} functions
  //==================================================================================================

  async componentDidMount() {
    let cache = localStorage.getItem("cache");
    try {
        cache = JSON.parse(cache);
    } catch (e) {
        cache = undefined;
    }
    
    if(cache && cache.books.length !== 0){
      this.setState({
        books: cache.books,
        mounted: cache.mounted,
        totalBooks: parseInt(cache.totalBooks),
        totalPages: parseInt(cache.totalPages),
        displayBooks: cache.books.slice(0, this.state.perPage)
      })
    }

    else{
      console.log("Loading...");

      let response = await getBooks();
      console.log("Response: ", response);

      this.setState({
        books: response.books, 
        mounted:true,
        totalBooks: response.books? response.books.length: 0,
        totalPages: response.books? Math.ceil(response.books.length/this.state.perPage): 0,
        displayBooks: response.books? response.books.slice(0, this.state.perPage):0
      });

      localStorage.setItem("cache", JSON.stringify(this.state));
    }
  }

  //==================================================================================================
  // Event Hadlers
  //==================================================================================================

  handlePageClick(event){
    event.preventDefault();
    let arrEnd = (event.target.value * this.state.perPage);
    let arrBegin = arrEnd - this.state.perPage;
    
    this.setState({
      currentPage: parseInt(event.target.value),
      displayBooks: this.state.books.slice(arrBegin, arrEnd)
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  handlePerPageChange(event){
    event.preventDefault();
    let num = parseInt(event.target.value);
    if(num === this.state.perPage) return;
    
    this.setState({
      perPage: num,
      currentPage: 1,
      perPage: num,
      totalPages: Math.ceil(this.state.totalBooks/num),
      displayBooks: this.state.books.slice(0, num)
    });
  }


  //==================================================================================================
  // Helper functions
  //==================================================================================================

  // check if a page is in range
  checkInRange(numList, num){
    return numList.includes(num);
  }

  // truncate longer titles of the books
  truncate(input) {
    if (input.length > 50) {
       return input.substring(0, 50) + '...';
    }
    return input;
 };


  //==================================================================================================
  // render methods
  //==================================================================================================

  renderBooks(){
    return(
      <div className = "root fadeIn">
        {this.state.displayBooks == null || this.state.displayBooks.length == 0 ? 
          (<div> No books :( </div>)
          : 
          this.state.displayBooks.map((book, key) => {
            return(
              <div className = "books" key={key}>
                
                <div className="image">
                  <img className = "book-cover" src={`http://covers.openlibrary.org/b/id/${book.cover}-M.jpg`}></img>
                </div>

                <div className="title">{this.truncate(book.title)}</div>
                <div className="author">{book.author}</div>
              </div>
            )
          }) 
        }
      </div>
    )
  }

  renderPagination(){

    let numRange = [];
    let lowerLimit = this.state.currentPage-3 < 0? 0: this.state.currentPage-3;
    let upperLimit = (this.state.currentPage + 1)>this.state.totalPages? this.state.totalPages: this.state.currentPage+1;
    lowerLimit+=1;
    upperLimit+=1;

    for(let i = lowerLimit; i < upperLimit; i++){
      numRange.push(i);
    }

    let style={
      "background-color": "rgb(177, 140, 93)",
      "color": "white"
    }

    return(
      <div className="centerbutton">
        <div className="pagination">
          {this.state.currentPage !== 1 && <button className="page-btn-layout" value={this.state.currentPage-1}  onClick = {this.handlePageClick}>❮</button>}

          {!this.checkInRange(numRange, 1) && this.checkInRange(numRange, 2)&&
              <button className="page-btn-layout" value="1" onClick = {this.handlePageClick}>1</button>
          }
          
          {!this.checkInRange(numRange, 2) &&
            <div className = "extra-btn-container">
              <button className="page-btn-layout" value="1" onClick = {this.handlePageClick}>1</button>
              <button className="page-btn-layout" value="2" onClick = {this.handlePageClick}>2</button>
            </div>
          }          
          
          {lowerLimit - 2 >= 1 && <button className="page-btn-layout" value="...">...</button>}

          {numRange.map((num, key) => {
            return(
              <button style={this.state.currentPage== num? style: null} className="page-btn-layout" key={key} value={num} onClick = {this.handlePageClick}>{num}</button>
            );

          })}

          {this.state.totalPages-1 - upperLimit >= 1 && <button className="page-btn-layout" value="...">...</button>}
          
          {!this.checkInRange(numRange, this.state.totalPages-1)&&
            <div className = "extra-btn-container">
              <button className="page-btn-layout" value={this.state.totalPages-1} onClick = {this.handlePageClick}>{this.state.totalPages-1}</button>
              <button className="page-btn-layout" value={this.state.totalPages} onClick = {this.handlePageClick}>{this.state.totalPages}</button>
            </div>
          }

          {!this.checkInRange(numRange, this.state.totalPages)&& this.checkInRange(numRange, this.state.totalPages-1)&&
            <button className="page-btn-layout" value={this.state.totalPages} onClick = {this.handlePageClick}>{this.state.totalPages}</button>          
          } 

          {this.state.currentPage !== this.state.totalPages && <button className="page-btn-layout" value={this.state.currentPage+1}  onClick = {this.handlePageClick}>❯</button>}
        </div>
      </div>
    );

  }

  render(){
    console.log(this.state);

    return !this.state.mounted ? (<CalculateBooks />) : (
      <div className="HomePage">
        <NavigationBar />
        <Container maxWidth="md">
          <div className = "page-indicator page-header-container-flex fadeIn">
            <div> Page: {this.state.currentPage}</div>
            <div className = "page-result-total">
                <div>Showing {this.state.perPage} results</div>
                <div className = "result-change-small">Change
                  <button value="20" className = "change-perpage-btn-layout" onClick={this.handlePerPageChange}> 20 </button>
                  <button value="50" className = "change-perpage-btn-layout" onClick={this.handlePerPageChange}> 50 </button>
                  <button value="100" className = "change-perpage-btn-layout" onClick={this.handlePerPageChange}> 100 </button>
                  <button value="200" className = "change-perpage-btn-layout" onClick={this.handlePerPageChange}> 200 </button>
                </div>
            </div>
          </div> 
          {/* render books */}
          {this.renderBooks()}          
          <div className = "page-indicator page-bottom fadeIn"> Page: {this.state.currentPage}</div>
        </Container>        

        {/* pagination logic */}
        {this.renderPagination()}
      </div>
    );
  }
};

export default HomePage;