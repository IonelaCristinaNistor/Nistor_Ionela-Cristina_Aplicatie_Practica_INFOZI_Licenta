import React from 'react';
import "../index.css";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { logout } from '../actions/userActions'
import { useDispatch, useSelector } from 'react-redux';
import { Image, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

function NavScrollExample() {
  const userLogin = useSelector((state) => state.userLogin);
  const dispatch = useDispatch()
  const { userInformation } = userLogin;

  const logoutHandler = () => {
    dispatch(logout())
  };

  return (
    <header>
      <Navbar expand="lg" fixed='top' className="roundedm fixedNavbar">
        <Container fluid>
          <Image src='../icons40.png' roundedCircle className='px-2'></Image>
          <LinkContainer to='/'>
            <Navbar.Brand>Gallery</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: '200px' }}
              navbarScroll
            >
              <LinkContainer to='/'>
                <Nav.Link>Home</Nav.Link>
              </LinkContainer>
              <LinkContainer to='/artworklistscreen'>
                <Nav.Link>Artworks</Nav.Link>
              </LinkContainer>
            </Nav>

            <Nav className='me-4'>
              <LinkContainer to='/cart'>
                <Nav.Link><i className="fa-solid fa-shopping-cart"></i></Nav.Link>
              </LinkContainer>

              <LinkContainer to='/favorites'>
                <Nav.Link><i className="fa-solid fa-star"></i></Nav.Link>
              </LinkContainer>

              {userInformation ? (
                <NavDropdown title={userInformation.name}>
                  <LinkContainer to='/profile'>
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to='/login'>
                  <Nav.Link><i className="fa-solid fa-right-to-bracket"></i> Login</Nav.Link>
                </LinkContainer>
              )}
              {userInformation && userInformation.isAdmin &&  (
                <NavDropdown title='Admin Panel' id='adminmenu'>

                  <LinkContainer to='/admin/artworklist'>
                    <NavDropdown.Item>Artworks List</NavDropdown.Item>
                  </LinkContainer>

                  <LinkContainer to='/admin/userList'>
                    <NavDropdown.Item>Users</NavDropdown.Item>
                  </LinkContainer>

                  <LinkContainer to='/admin/orderlist'>
                    <NavDropdown.Item>Orders</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}

export default NavScrollExample;
