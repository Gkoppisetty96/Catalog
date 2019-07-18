import React from "react";
import "./modal.css";
import PropTypes from "prop-types";

export default class Modal extends React.Component {
  onClose = e => {
    this.props.onClose && this.props.onClose(e);
  };

  onSave = e => {
    alert("Add to DB");
    this.props.onClose && this.props.onClose(e);
  };

  render() {
    if (!this.props.show) {
      return null;
    }
    return (
      <div class="modal" id="modal">
      <div>
          <h2>Get New Book Confirmation Page</h2>
          <div class="content">{this.props.children}</div>
          <div class="actions">
          <div class="modal-footer">
            <button type="button" class="btn-secondary" onClick={this.onClose}>Cancel</button>
            <button type="button" class="btn-primary" onClick={this.onSave} >Add</button></div>
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