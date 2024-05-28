import React from 'react';

import "../index.css";

import { Container, Row, Col } from 'react-bootstrap';

function Footer() {
  return (
    <div class="footer-copyright">
      <footer>
        <Container>
            <Row>
                <Col className="text-center py-3"> Copyright &copy; Gallery</Col>
            </Row>
        </Container>
      </footer>
    </div>
  )
}

export default Footer
