import React from "react";
import "./modal.css";
import PropTypes from "prop-types";
import API from "../../utils/API";

export default class Modal extends React.Component {
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
      <div className="modal" id="modal">
      <div>
          <h2>Confirm Book</h2>
          <div className="content">{this.props.children}</div>
          <div className="actions">
          {/* <div className="modal-footer"> */}
            {/* <button type="button" className="btn-secondary" onClick={this.onClose}>Cancel</button>
            <button type="button" className="btn-primary" onClick={this.onSave} >Add</button> */}
          {/* </div> */}
        </div>
      </div>
      </div>
    );
  }
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired
};