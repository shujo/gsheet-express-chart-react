import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';

const Example = () => {
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand href="#home">GSheet React Chart</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto"></Nav>
            <Nav>
                <Nav.Link href="https://github.com/shujo/gsheet-express-chart-react">Github</Nav.Link>
            </Nav>
        </Navbar.Collapse>
        </Navbar>
  );
}

export default Example;