import React from 'react';

import "../index.css"

import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom'

function Artwork({ artwork }) {
  return (
    <Card className="d-flex flex-column card mt-3 p-3 border-secondary" style={{color: 'black'}}>
        <Link to={`/artwork/${artwork._id}`}>
            <Card.Img src={artwork.image} className='artwork-image'/>
        </Link>

        <Card.Body className='d-flex flex-column flex-grow-1'>
          <Link to={`/artwork/${artwork._id}`} className="text-decoration-none" style={{color: 'black'}}>
            <Card.Title as="h5">
              <strong>{artwork.title}</strong>
            </Card.Title>
          </Link>

          <Card.Text as="h3" className='d-flex justify-content-center my-2'>
            {artwork.price} LEI
          </Card.Text>
        </Card.Body>
    </Card>
  );
}

export default Artwork;
