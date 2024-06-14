import React from 'react';
import "../index.css";
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Logo from './Logo';

function Footer() {
  return (
    <div className="footer-copyright">
      <footer>
  <Container>
      <Row className='d-flex justify-content-between py-3'>
        	<Col md={2} className="text-center py-3">
            <Logo />
        </Col>
        <Col md={2} className="text-center py-2">
          <Link to='/' className='d-block footerLink'>Home</Link>
          <Link to='/artworklistscreen' className='d-block footerLink'>Artworks</Link>
        </Col>
        <Col md={2} className="text-center py-3">
          <Link className='d-block footerLink'>Facebook</Link>
          <Link className='d-block footerLink'>Instagram</Link>
        </Col>
        <Col md={2} className="text-center py-3">
          <Link to='/cart' className='d-block footerLink'>Cart</Link>
          <Link to='/favorites' className='d-block footerLink'>Favorites</Link>
        </Col>
        <Col xs="auto ms-5" className='py-4'>
            <Form.Control
              type="text"
              placeholder="Search"
              className=" mr-sm-2 rounded"
            />
          </Col>
          <Col xs="auto" className='py-4'>
            <Button type="submit" className='rounded'>Submit</Button>
          </Col>
      </Row>
      <Row>
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
