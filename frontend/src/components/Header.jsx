import React from 'react';
import { Container, Form, Navbar, Nav, NavDropdown, Button } from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'
function Header() {
  
  return (
    
      <header>
         <Navbar expand="lg" variant="dark" className="bg-dark" collapseOnSelect>
      <Container fluid>
          <LinkContainer to="/">
            <Navbar.Brand href="/">ProShop</Navbar.Brand>
          </LinkContainer>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="mr-auto "
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
              <LinkContainer to="/cart">
                <Nav.Link href="#action1"> <i className="fas fa-shopping-cart"></i> Cart</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/login">
                <Nav.Link href="#action2"> <i className="fas fa-user"></i> Login</Nav.Link>
              </LinkContainer>
          </Nav>
        
        </Navbar.Collapse>
      </Container>
    </Navbar>
      </header>
    
  )
}

export default Header