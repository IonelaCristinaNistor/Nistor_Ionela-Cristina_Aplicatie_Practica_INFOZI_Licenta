import React from 'react';
import "../index.css";
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Logo from './Logo';

function Footer() {
  return (
    <div className="footer-copyright">
      <footer>
  <Container>
      <Row>
        	<Col md={2} className="text-center py-3">
            <Logo />
        </Col>
        <Col md={2} className="text-center py-2">
          <Link to='/' className='d-block footerLink'>Home</Link>
          <Link className='d-block footerLink'>About us</Link>
          <Link className='d-block footerLink'>Artworks</Link>
        </Col>
        <Col md={2} className="text-center py-3">
          <Link className='d-block footerLink'>Facebook</Link>
          <Link className='d-block footerLink'>Instagram</Link>
        </Col>
      </Row>
      <Row className="">
        <Col md={12} className="text-center pb-4 pt-1">
          Copyright &copy; Gallery
        </Col>
      </Row>
    </Container>
      </footer>
    </div>
  )
}

export default Footer
