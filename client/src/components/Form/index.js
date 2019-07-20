import React from "react";

// This file exports the Input, TextArea, and FormBtn components

export function Input(props) {
  return (
    <div className="form-group">
      <input className="form-control" {...props} />
    </div>
  );
}

export function FormBtn(props) {
  return (
    <button {...props} style={{ float: "right", margin: 10}} className="btn btn-success">
      {props.children}
    </button>
  );
}

export function Btn(props) {
  return (
    <button {...props} style={{ margin: 10}} className="btn btn-outline-dark">
      {props.children}
    </button>
  );
}
