import React from 'react'
import { Row, Col } from 'react-bootstrap'
import Artwork from '../components/Artwork'

import artworks from '../artworks'

function HomeScreen() {
  return (
    <div>
      <h1>Latest Products</h1>
      <Row>
        {artworks.map(artwork => (
            <Col className='d-flex align-items-stretch' key={artwork.artwork_id} sm={12} md={6} lg={4} xl={3}>
                <Artwork artwork={artwork}></Artwork>
            </Col>
        ))}
      </Row>
    </div>
  )
}

export default HomeScreen
