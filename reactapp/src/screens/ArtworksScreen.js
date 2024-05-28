import React from 'react';

import "../index.css"

import { Link, useParams } from 'react-router-dom';
import { Row, Col, Image, ListGroup, Button, Card } from 'react-bootstrap';
import Reactions from "../components/Reactions";
import artworks from '../artworks.js';

function ArtworksScreen() {
  const { id } = useParams();
  const artwork = artworks.find((a) => a.artwork_id === parseInt(id));

  return (
    <div class="artworkpage">
      <Link to='/' className='btn btn-primary rounded my-2'>Go Back</Link>
      <Row>
        <Col md={6}>
          <Image src={artwork.image} alt={artwork.name} fluid/>
        </Col>

        <Col md={3}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h3>{artwork.title}</h3>
            </ListGroup.Item>

            <ListGroup.Item>
            <Reactions artworkId={artwork.artwork_id} />
            </ListGroup.Item>

            <ListGroup.Item>
              Price: ${artwork.price}
            </ListGroup.Item>

            <ListGroup.Item>
              Descrpition: {artwork.description}
            </ListGroup.Item>
          </ListGroup>
        </Col>

        <Col md={3}>
          <Card class="artwork-card">
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <Row>
                  <Col>Price:</Col>
                  <Col>
                    <strong>${artwork.price}</strong>
                  </Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Status</Col>
                  <Col>
                    {artwork.InStock > 0 ? "In Stock" : "Out of Stock"}
                  </Col>
                </Row>

                <ListGroup>
                  <Button className='btn btn-block' disabled={artwork.InStock === 0} type='button'>Add to cart</Button>
                </ListGroup>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default ArtworksScreen;
