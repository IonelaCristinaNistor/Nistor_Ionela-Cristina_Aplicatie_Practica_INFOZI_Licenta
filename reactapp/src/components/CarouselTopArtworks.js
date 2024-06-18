import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Carousel, Image } from 'react-bootstrap'
import SpinnerComponent from '../components/SpinnerComponent'
import Message from '../components/Message'
import { carouselListArtworks } from '../actions/artworkActions'

function CarouselTopArtworks() {
    const dispatch = useDispatch()
    const carouselList = useSelector(state => state.carouselList)
    const { error, loading, artworks } = carouselList

    useEffect(() => {
        dispatch(carouselListArtworks())
    }, [dispatch])


  return (
    loading ? <SpinnerComponent /> : error ? <Message variant='danger'>{error}</Message> : (
        <Carousel pause='hover' fade>
            {artworks.map(artwork => (
                <Carousel.Item key={artwork._id}>
                    <Link to={`/artwork/${artwork._id}`}></Link>
                    <Image src={artwork.image} alt={artwork.title} fluid/>
                    <Carousel.Caption className='carousel.caption'>
                        <h4>{artwork.title} ( {artwork.price} LEI )</h4>
                    </Carousel.Caption>
                </Carousel.Item>
            ))}
        </Carousel>
    )
  )
}

export default CarouselTopArtworks
