import React from "react";
import "./nav.css";


function Nav() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <a className="navbar-brand" href="/">
        Personal Catalog
      </a>

      {/* <button type="button" className="btn btn-outline-light" style= {{float: "right"}}> Login </button> */}
    </nav>
  );
}

export default Nav;
