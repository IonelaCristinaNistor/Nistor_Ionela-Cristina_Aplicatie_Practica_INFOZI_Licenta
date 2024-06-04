import "../index.css";

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import { Image } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

function NavScrollExample() {
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
            style={{ maxHeight: '200px'}}
            navbarScroll
          >
            <LinkContainer to='/'>
            <Nav.Link>Home</Nav.Link>
            </LinkContainer>
            <LinkContainer to='/'>
            <Nav.Link>About Us</Nav.Link>
            </LinkContainer>
            <LinkContainer to='/'>
            <Nav.Link>Artworks</Nav.Link>
            </LinkContainer>
          </Nav>

          <Nav className='me-3'>
            <LinkContainer to='/cart'>
            <Nav.Link><i className="fa-solid fa-shopping-cart"></i> Cart</Nav.Link>
            </LinkContainer>
            <LinkContainer to='/login'>
            <Nav.Link><i className="fa-solid fa-right-to-bracket"></i> Login</Nav.Link>
            </LinkContainer>
          </Nav>

        </Navbar.Collapse>
      </Container>
    </Navbar>
    </header>
  );
}

export default NavScrollExample;