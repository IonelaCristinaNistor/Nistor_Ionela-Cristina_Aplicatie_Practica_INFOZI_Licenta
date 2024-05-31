import React, { useState, useEffect } from 'react';
import "../index.css";
import { Link, useParams } from 'react-router-dom';
import { Row, Col, Image, ListGroup, Button } from 'react-bootstrap';
import Reactions from "../components/Reactions";
import axios from 'axios';

function ArtworksScreen() { // Removed the `match` parameter as it's not needed

  const [artwork, setArtwork] = useState({})
  const { id } = useParams();

  useEffect(() => {
    async function fetchArtwork() {
      const { data } = await axios.get(`/api/artworks/${id}`)
      setArtwork(data)
    }
    fetchArtwork()
  }, [id])

  return (
    <div>
      <Link to='/' className='btn btn-primary rounded my-2'>Go Back</Link>

      <Row className='row_artworks'>
        <Col md={6} className='d-flex align-items-center justify-content-center'>
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
              Description: {artwork.description}
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
