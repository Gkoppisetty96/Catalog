import React, { Component } from "react";
import axios from 'axios';
import DeleteBtn from "../components/DeleteBtn";
import Jumbotron from "../components/Jumbotron";
import Modal from "../components/Modal";
import API from "../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { Input, FormBtn } from "../components/Form";
require("dotenv").config();

// console.log(process.env.REACT_APP_GOOGLESECRET);

class Books extends Component {
  state = {
    books: [],
    gApiResults: [],
    title: "",
    author: "",
    genre: "", 
    synopsis: "",
    cover: ""
  };

  constructor(props) {
    super(props);
    this.state.isOpen = false;
  }

  


  componentDidMount() {
    this.loadBooks();
  }

  loadBooks = () => {
    API.getBooks()
      .then(res =>
        this.setState({ books: res.data, title: "", author: "", genre: "", synopsis: "" })
      )
      .catch(err => console.log(err));
  };

  toggleModal = () => {
    console.log("onload");
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  deleteBook = id => {
    API.deleteBook(id)
      .then(res => this.loadBooks())
      .catch(err => console.log(err));
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };
  
  googleBooksAPI = event => {
    // set what the API is calling
    let title = this.state.title;
    let author = this.state.author;
    console.log (title + "," + author);
    console.log(process.env);

    console.log (process.env.REACT_APP_GOOGLESECRET);

    let queryURL = 'https://www.googleapis.com/books/v1/volumes?q=' + title + '+inauthor:' + author + '&key=AIzaSyAsQc_MVFx8AusunHiSU18mbyM4rLCMZ_c' ;
    // + process.env.REACT_APP_GOOGLESECRET;

    // axios call
    axios.get(queryURL)
      .then(res => {
        
        if(res.status === 200){
          console.log("SUCCESSS")
          console.log (res.data);
          this.gApiResults = res.data;

          let nowBook = this.gApiResults.items[0].volumeInfo;

          //this.toggleModal(true);
          // this.setState({
          //   // isOpen: true
          // });
          

          // $(this.modal).modal('show');
        // $(this.modal).on('hidden.bs.modal', handleModalCloseClick);

          console.log (nowBook);
          
        }

      })
  }

  handleFormSubmit = event => {
    console.log(this.state.title + " " + this.state.author + " " + this.state.genre +" is being added");
    
    event.preventDefault();
    // call google API
    this.googleBooksAPI();
    // user confirmation in modal 

    // add to DB

    if (this.state.title && this.state.author && this.state.genre) {
      API.saveBook({
        title: this.state.title,
        author: this.state.author,
        genre: this.state.genre, 
        synopsis: this.state.synopsis,
        cover: this.state.cover
      })
        .then(res => this.loadBooks())
        .catch(err => console.log(err));
    }
  };



  

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-6">
            <Jumbotron>
              <h1>Get a New Book?</h1>
            </Jumbotron>
            <form>
              <Input
                value={this.state.title}
                onChange={this.handleInputChange}
                name="title"
                placeholder="Title (required)"
              />
              <Input
                value={this.state.author}
                onChange={this.handleInputChange}
                name="author"
                placeholder="Author (required)"
              />
              <Input
                value={this.state.genre}
                onChange={this.handleInputChange}
                name="genre"
                placeholder="Genre (required)"
              />
              {/* <TextArea
                value={this.state.synopsis}
                onChange={this.handleInputChange}
                name="synopsis"
                placeholder="Synopsis (Optional)"
              /> */}
              <FormBtn
                disabled={!(this.state.author && this.state.title && this.state.genre)}
                onClick={this.handleFormSubmit}

              >
                Submit Book
              </FormBtn>
            </form>
          </Col>

         
          <Col size="md-6 sm-12">
            <Jumbotron>
              <h1>My Bookshelf</h1>
            </Jumbotron>
            <button type="button" className="btn btn-outline-dark" id= "all" > All </button>
            <button type="button" className="btn btn-outline-dark" id= "az" > A - Z </button>
            <button type="button" className="btn btn-outline-dark" id= "fiction"> Fiction </button>
            <button type="button" className="btn btn-outline-dark" id= "nonfiction"> Non-Fiction </button>
        
            {this.state.books.length ? (
              <List>
                {this.state.books.map(book => (
                  <ListItem key={book._id}>
                    <Link to={"/books/" + book._id}>
                      <strong>
                        {book.title} by {book.author}
                      </strong>
                    </Link>
                    <DeleteBtn onClick={() => this.deleteBook(book._id)} />
                  </ListItem>
                ))}
              </List>
            ) : (
              <h3>No Results to Display</h3>
            )}
          </Col>
        </Row>

        <Modal show={this.state.isOpen}
            onClose={this.toggleModal}>
            <h1> MODAL HERE</h1>
         </Modal>

      
      </Container>
    );
  }
}

export default Books;