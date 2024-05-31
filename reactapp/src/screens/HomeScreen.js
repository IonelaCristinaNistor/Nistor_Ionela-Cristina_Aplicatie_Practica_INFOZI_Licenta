import React,{ useEffect } from 'react'

import { Row, Col } from 'react-bootstrap'
import Artwork from '../components/Artwork'
import { useDispatch, useSelector } from 'react-redux'
import { listArtworks} from '../artworkActions'

import Header from '../components/Header'
import Footer from '../components/Footer'


function HomeScreen() {
  const dispatch = useDispatch()
  const artworkList = useSelector(state => state.artworkList)
  const { artworks } = artworkList 
  
  useEffect(() => {
    dispatch(listArtworks())

    }, [])

  return (
    <div>
      <Header />
      <Row className='shopscreen-row mx-auto'>
        {artworks.map(artwork => (
            <Col className='d-flex align-items-stretch' key={artwork.artwork_id} sm={12} md={6} lg={4} xl={3}>
                <Artwork artwork={artwork} />
            </Col>
        ))}
      </Row>
      <Footer />
    </div>
  )
}

export default HomeScreen
