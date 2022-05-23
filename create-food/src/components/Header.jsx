import React, { Component } from "react";
import logo from "./favicon.ico";
import "../App.css";

import { Navbar } from "react-bootstrap";
import { Container } from "react-bootstrap";

export default class Header extends Component {
  render() {
    return (
      <>
        <div className="header">
          <Navbar bg="light" variant="light">
            <Container>
              <Navbar.Brand>
                <h1>
                  <img
                    id=""
                    alt="logo with the letter C and globe"
                    src={logo}
                    width="60"
                    height="60"
                  />
                  Create Food
                </h1>
              </Navbar.Brand>
            </Container>
          </Navbar>
        </div>
      </>
    );
  }
}
