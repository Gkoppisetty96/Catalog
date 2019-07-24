import axios from "axios";

export default {
  // Gets all books
  getBooks: function() {
    return axios.get("/api/books");
  },
// all the sorts
  sortAA: function() {
    return axios.get("/api/books/sortAA");
  },
  sortAZ: function() {
    return axios.get("/api/books/sortAZ");
  },
  sortTA: function() {
    return axios.get("/api/books/sortTA");
  },
  sortTZ: function() {
    return axios.get("/api/books/sortTZ");
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
