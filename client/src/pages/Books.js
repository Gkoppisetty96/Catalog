import React, { Component } from "react";
import axios from 'axios';
import DeleteBtn from "../components/DeleteBtn";
import Jumbotron from "../components/Jumbotron";
import Modal from "../components/Modal";
import API from "../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { Input, FormBtn, Btn } from "../components/Form";
require("dotenv").config();


class Books extends Component {
  state = {
    books: [],
    show: false,
    gApiResults: [],
    title: "",
    author: "",
    genre: "", 
    synopsis: "",
    cover: "",
    apiResTitle:"",
    apiResAuthor:"",
    apiResSyn:"", 
    apiResImage:""
  };

  constructor(props) {
    super(props);
  }

  showModal = e => {
    this.setState({
      show: !this.state.show
    });
  };

  onClose = e => {
    this.props.onClose && this.props.onClose(e);
// force modal close
    this.setState({ 
      show: !this.state.show
    });
  };

  onSave = e => {
    this.props.onClose && this.props.onClose(e);
    console.log(this.state.apiResTitle + " on shelf");

    API.saveBook({
          title: this.state.apiResTitle,
          author: this.state.apiResAuthor,
          genre: this.state.genre, 
          synopsis: this.state.apiResSyn,
          cover: this.state.apiResImage
        })
          .then(res => this.loadBooks())
          .catch(err => console.log(err));
    
    // now force the modal to close
    this.setState({ 
      show: !this.state.show
    });
  };


  componentDidMount() {
    this.loadBooks();
  }

  loadBooks = () => {
    API.getBooks()
      .then(res =>
        this.setState({ books: res.data, title: "", author: "", genre: "", synopsis: "", cover: "" })
      )
      .catch(err => console.log(err));
  };

  // sort button loads
  loadAA = () => {
    API.sortAA()
      .then(res =>
        this.setState({ books: res.data, title: "", author: "", genre: "", synopsis: "", cover: "" })
      )
      .catch(err => console.log(err));
  };

  loadAZ = () => {
    API.sortAZ()
      .then(res =>
        this.setState({ books: res.data, title: "", author: "", genre: "", synopsis: "", cover: "" })
      )
      .catch(err => console.log(err));
  };

  loadTA = () => {
    API.sortTA()
      .then(res =>
        this.setState({ books: res.data, title: "", author: "", genre: "", synopsis: "", cover: "" })
      )
      .catch(err => console.log(err));
  };

  loadTZ = () => {
    API.sortTZ()
      .then(res =>
        this.setState({ books: res.data, title: "", author: "", genre: "", synopsis: "", cover: "" })
      )
      .catch(err => console.log(err));
  };

  deleteBook = id => {
    API.deleteBook(id)
      .then(res => this.loadBooks())
      .catch(err => console.log(err));
  };

  sortBooks = event => {
    event.preventDefault();
    let nowSort = event.target.id;

    console.log(nowSort);

    switch(nowSort) {
      case 'time' :
        API.getBooks()
          .then(res => this.loadBooks())
          .catch(err => console.log(err));
        break;
      case 'authorA':
        API.sortAA()
          .then(res => this.loadAA())
          .catch(err => console.log(err));
        break;
      case 'authorZ':
        API.sortAZ()
          .then(res => this.loadAZ())
          .catch(err => console.log(err))
        break;
      case 'titleA':
        API.sortTA()
          .then(res => this.loadTA())
          .catch(err => console.log(err));
        break;
      case 'titleZ':
        API.sortTZ()
          .then(res => this.loadTZ())
          .catch(err => console.log(err));
        break;
    }

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
    // console.log (title + "," + author);

    // console.log (process.env.REACT_APP_GOOGLESECRET);

    let queryURL = 'https://www.googleapis.com/books/v1/volumes?q=' + title + '+inauthor:' + author + '&key=' + process.env.REACT_APP_GOOGLESECRET;

    // axios call
    axios.get(queryURL)
      .then(res => {
        
        if(res.status === 200){
          console.log("Book Found")
          // console.log (res.data);
          this.gApiResults = res.data;

          let nowBook = this.gApiResults.items[0].volumeInfo;

          // console.log("nowbook"+ this.state.genre);
          console.log(nowBook);
          // console.log (nowBook.authors[0]);
          // console.log (nowBook.imageLinks.thumbnail);
          // console.log (nowBook.title);

          this.state.apiResTitle = nowBook.title;
          this.state.apiResImage = nowBook.imageLinks.thumbnail;
          this.state.apiResAuthor = nowBook.authors[0];
          this.state.apiResSyn=nowBook.description;
          
          this.showModal();
          
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

  };

// render the page

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

            <Btn type="button" className="btn btn-outline-dark" id= "time" onClick={this.sortBooks}> Time </Btn>
            <Btn type="button" className="btn btn-outline-dark" id= "authorA" onClick={this.sortBooks}> Authors A-Z </Btn>
            <Btn type="button" className="btn btn-outline-dark" id= "authorZ" onClick={this.sortBooks}> Authors Z-A </Btn>
            <Btn type="button" className="btn btn-outline-dark" id= "titleA" onClick={this.sortBooks}> Titles A-Z </Btn>
            <Btn type="button" className="btn btn-outline-dark" id= "titleZ" onClick={this.sortBooks}> Titles Z-A </Btn>

            <br/>
        
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

        <Modal onClose={this.showModal} show={this.state.show}>
          <Row>

            <Col size="md-7 md-offset-1">
              <label>Title: </label>
              <label> {this.state.apiResTitle}</label> <br/>
              <label>Author: </label>
              <label> {this.state.apiResAuthor}</label> <br/>
              <label>Genre: </label>
              <label> {this.state.genre}</label>
            </Col>

            <Col size="md-3 md-offset-1">
              <img src={this.state.apiResImage}/>
            </Col>

          </Row>
          <Row>
            <Btn type="button" className="btn-secondary" onClick={this.onClose}>
                Nope, let me try again
            </Btn>
            <Btn type="button" className="btn-primary" onClick={this.onSave}>
                Yes, this is the book!
            </Btn>
          </Row>
        </Modal>

      </Container>

    );
  }
}

export default Books;