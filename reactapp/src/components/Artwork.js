import React from 'react'
import { Card } from 'react-bootstrap'


function Artwork({ artwork }) {
  return (
    <Card className="my-4 p-3 rounded">
        <a href={`/artwork/${artwork.artwork_id}`}>
            <Card.Img src={artwork.image}/>
        </a>

        <Card.Body>
          <a href={`/artwork/${artwork.artwork_id}`}>
            <Card.Title as="div">
              <strong>{artwork.title}</strong>
            </Card.Title>
          </a>

          <Card.Text as="h3">
            ${artwork.price}
          </Card.Text>
        </Card.Body>
    </Card>
  )
}

export default Artwork
