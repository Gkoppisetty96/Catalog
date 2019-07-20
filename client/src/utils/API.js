import axios from "axios";

export default {
  // Gets all books
  getBooks: function() {
    return axios.get("/api/books");
  },
// all the sorts
  sortAZ: function() {
    return axios.get("/api/books/sortAZ");
  },
  sortFic: function() {
    return axios.get("/api/books/sortFic");
  },
  sortNonFic: function() {
    return axios.get("/api/books/sortNonFic");
  },
  // Gets the book with the given id
  getBook: function(id) {
    return axios.get("/api/books/" + id);
  },
  // Deletes the book with the given id
  deleteBook: function(id) {
    return axios.delete("/api/books/" + id);
  },
  // Saves a book to the database
  saveBook: function(bookData) {
    return axios.post("/api/books", bookData);
  }
};
