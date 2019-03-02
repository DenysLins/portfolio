import * as React from "react";
import { Button, Form, FormControl, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";

class SecondSection extends React.Component {
  render() {
    return (
      <>
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand href="/">Navbar</Navbar.Brand>
          <Nav className="mr-auto">
            <Link to="/" className="m-1">
              Home
            </Link>
            <Link to="/second" className="m-1">
              Second
            </Link>
          </Nav>
          <Form inline>
            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
            <Button variant="outline-info">Search</Button>
          </Form>
        </Navbar>
      </>
    );
  }
}

export default SecondSection;
