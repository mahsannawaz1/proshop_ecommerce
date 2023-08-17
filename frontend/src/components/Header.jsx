import React from 'react';
import { Container, Form, Navbar, Nav, NavDropdown, Button } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { logout } from '../actions/userActions';
import { useDispatch,useSelector } from 'react-redux';
function Header() {
  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin
  const dispatch=useDispatch()
  const logoutHandler = () => {
    dispatch(logout())
    
  }
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

              {userInfo ? (
                <NavDropdown title={userInfo.name} id="username">
                  <LinkContainer to="/profile">
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to="/login">
                <Nav.Link href="#action2"> <i className="fas fa-user"></i> Login</Nav.Link>
                  </LinkContainer>
                  
                )}

           
          </Nav>
        
        </Navbar.Collapse>
      </Container>
    </Navbar>
      </header>
    
  )
}

export default Header