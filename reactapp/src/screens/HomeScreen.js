import React,{ useState, useEffect } from 'react'
import axios from 'axios'

import { Row, Col } from 'react-bootstrap'
import Artwork from '../components/Artwork'

function HomeScreen() {
  
   const [artworks, setArtworks] = useState([])

  useEffect(() => {

    async function fetchArtworks() {

    const { data } = await axios.get('/api/artworks/')
    setArtworks(data)
   }

   fetchArtworks()

    }, [])

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
