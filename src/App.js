/****************************************************************************
 * WEB422 – Assignment 3
 * I declare that this assignment is my own work in accordance with Seneca Academic Policy.
 * No part of this assignment has been copied manually or electronically from any other source
 * (including web sites) or distributed to other students.
 *
 * Name: _byeongsuk yoo__ Student ID: _062411079_ Date: _20210625_
 *
 * Online Link to Restaurant App: _https://web422a3.vercel.app/Restaurants___
 *
 ***********************************************************************************/
import "./App.css";
import React, { useState } from "react";
import {
  Button,
  Col,
  Container,
  Form,
  FormControl,
  Nav,
  Navbar,
  Row,
} from "react-bootstrap";

import { Redirect, Route, Switch, useHistory } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";

import About from "./components/About";
import Restaurants from "./components/Restaurants";
import Restaurant from "./components/Restaurant";
import NotFound from "./components/NotFound";

function App() {
  const [searchString, setSearchString] = useState("");
  let history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    history.push(`/restaurants?borough=${searchString}`);
    setSearchString("");
  };

  return (
    <>
      <Navbar bg="light" expand="lg">
        <LinkContainer to="/">
          <Navbar.Brand>New York Restaurants</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <LinkContainer to="/restaurants">
              <Nav.Link>Full List</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/about">
              <Nav.Link>About</Nav.Link>
            </LinkContainer>
          </Nav>
          <Form onSubmit={handleSubmit} inline>
            <FormControl
              type="text"
              placeholder="Borough only"
              className="mr-sm-2"
              value={searchString}
              onChange={(e) => setSearchString(e.target.value)}
            />
            <Button type="submit" variant="outline-success">
              Search
            </Button>
          </Form>
        </Navbar.Collapse>
      </Navbar>
      <br />

      <Container>
        <Row>
          <Col>
            <Switch>
              <Route exact path="/">
                <Redirect to="/Restaurants" />
              </Route>
              <Route exact path="/about">
                <About />
              </Route>
              <Route exact path="/Restaurants">
                <Restaurants />
              </Route>
              <Route path="/Restaurant/:id">
                <Restaurant />
              </Route>
              <Route path="">
                <NotFound />
              </Route>
            </Switch>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default App;
