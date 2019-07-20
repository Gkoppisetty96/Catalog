import React from "react";
import "./modal.css";
import PropTypes from "prop-types";

export default class Modal extends React.Component {
  // onClose and onSave are defined in the Books.js because the API results weren't defined in this
  // onClose = e => {
  //   this.props.onClose && this.props.onClose(e);
  // };

  // onSave = e => {
  //   // alert("Add to DB");
  //   this.props.onClose && this.props.onClose(e);
  //   console.log("onsaveindex");

  //   console.log(this.state.apiResTitle)

  //   // API.saveBook({
  //   //       title: this.state.apiResTitle,
  //   //       author: this.state.apiResAuthor,
  //   //       genre: this.state.genre, 
  //   //       synopsis: this.state.synopsis,
  //   //       cover: this.state.apiResImage
  //   //     })
  //   //       .then(res => this.loadBooks())
  //   //       .catch(err => console.log(err));
  // };

  render() {
    if (!this.props.show) {
      return null;
    }
    return (
      <div className="modal" id="modal" style= {{padding: 25}}>
      <div>
          <h2>Confirm Book</h2>
          <div className="content" style={{ padding:10}}>{this.props.children}</div>
      </div>
      </div>
    );
  }
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired
};