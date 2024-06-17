import React from 'react';

import "../index.css"

import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom'

function Artwork({ artwork }) {
  return (
    <Card className="card my-2 mt-3 p-3 border-secondary d-flex flex-column">
        <Link to={`/artwork/${artwork._id}`}>
            <Card.Img src={artwork.image} className='artwork-image'/>
        </Link>

        <Card.Body className='d-flex flex-column flex-grow-1'>
          <Link to={`/artwork/${artwork._id}`}>
            <Card.Title as="div">
              <strong>{artwork.Title}</strong>
            </Card.Title>
          </Link>

          <Card.Text as="h3">
            {artwork.price} LEI
          </Card.Text>

          <Card.Text as="div">
            <div className='my-1'>
            </div>
          </Card.Text>
        </Card.Body>
    </Card>
  );
}

export default Artwork;
