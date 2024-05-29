import React from 'react';

import "../index.css";

import { Link, useParams } from 'react-router-dom';
import { Row, Col, Image, ListGroup, Button } from 'react-bootstrap';
import Reactions from "../components/Reactions";
import artworks from '../artworks.js';

function ArtworksScreen() {
  const { id } = useParams();
  const artwork = artworks.find((a) => a.artwork_id === parseInt(id));
  return (
    <div>
      <Link to='/' className='btn btn-primary rounded my-2'>Go Back</Link>

      <Row className='row_artworks'>
        <Col md={6} className='d-flex align-items-ceneter justify-content-center'>
          <Image src={artwork.image} alt={artwork.title} fluid className="image-list"/>
        </Col>

        <Col md={6}>
            <ListGroup variant='flush'>

            <ListGroup.Item>
              <h3>{artwork.title}</h3>
            </ListGroup.Item>

            <ListGroup.Item>
                  <Button className='btn btn-block' disabled={artwork.availability === 0} type='button'>Add to cart</Button>
            </ListGroup.Item>
            
              <ListGroup.Item>
                <Row>
                  <Col>Price:</Col>
                  <Col><strong>${artwork.price}</strong></Col>
                </Row>
              </ListGroup.Item>

            <ListGroup.Item>
              Descrpition: {artwork.description}
            </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Status:</Col>
                  <Col>{artwork.availability > 0 ? 'In Stock' : 'Out of Stock'}</Col>
                </Row>
              </ListGroup.Item>

            <ListGroup.Item>
              <Reactions artworkId={artwork.artwork_id} />
            </ListGroup.Item>
            </ListGroup>
            </Col>
      </Row>
    </div>
  );
}

export default ArtworksScreen;
