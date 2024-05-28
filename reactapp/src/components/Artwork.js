import React from 'react';

import "../index.css"

import Reactions from './Reactions';

import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom'

function Artwork({ artwork }) {
  return (
    <Card className="my-2 mt-3 p-3 border-secondary d-flex flex-column" class="card">
        <Link to={`/artwork/${artwork.artwork_id}`}>
            <Card.Img src={artwork.image} className='artwork-image'/>
        </Link>

        <Card.Body className='d-flex flex-column flex-grow-1'>
          <Link to={`/artwork/${artwork.artwork_id}`}>
            <Card.Title as="div">
              <strong>{artwork.Title}</strong>
            </Card.Title>
          </Link>

          <Card.Text as="h3">
            ${artwork.price}
          </Card.Text>

          <Card.Text as="div">
            <div className='my-1'>
              <Reactions artworkId={artwork.artwork_id} />
            </div>
          </Card.Text>
        </Card.Body>
    </Card>
  );
}

export default Artwork;
