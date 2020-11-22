import React, { Component } from "react";

class NavBar extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-light navbar-expand-md">
          <div className="container-fluid">
            <a className="navbar-brand" href="/">
              {" "}
              4Defence
            </a>
            <button
              data-toggle="collapse"
              className="navbar-toggler"
              data-target="#navcol-1"
            >
              <span className="sr-only">Toggle navigation</span>
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navcol-1">
              <ul className="nav navbar-nav">
                <li className="nav-item" role="presentation">
                  <a className="nav-link active" href="#/trainingen">
                    Trainingen
                  </a>
                </li>
                <li className="nav-item" role="presentation">
                  <a className="nav-link" href="#/leden">
                    Leden
                  </a>
                </li>
                <li className="nav-item" role="presentation">
                  <a className="nav-link" href="#"></a>
                </li>
              </ul>
              <div align="right"></div>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}

export default NavBar;
