import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Row, Col, Image, ListGroup, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { listArtworkDetails } from '../actions/artworkActions';
import Reactions from '../components/Reactions';
import SpinnerComponent from '../components/SpinnerComponent';
import Message from '../components/Message';

function ArtworkScreen() {
    const dispatch = useDispatch();
    const { id } = useParams();
    const artworkDetails = useSelector((state) => state.artworkDetails);
    const { error, loading, artwork } = artworkDetails;

    useEffect(() => {
        if (id) dispatch(listArtworkDetails(id));
    }, [dispatch, id]);

    return (
        <div>
            <Link to='/' className='btn btn-primary rounded my-2'>Go Back</Link>
            {loading ? (
                <SpinnerComponent />
            ) : error ? (
                <Message variant='danger'>{error}</Message>
            ) : (
                <Row className='row_artworks'>
                    <Col md={6} className='d-flex align-items-center justify-content-center'>
                        <Image src={artwork.image} alt={artwork.title} fluid className='image-list' />
                    </Col>
                    <Col md={6}>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <h3>{artwork.title}</h3>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Price:</Col>
                                    <Col>
                                        <strong>${artwork.price}</strong>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>Description: {artwork.description}</ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Status:</Col>
                                    <Col>{artwork.availability > 0 ? 'In Stock' : 'Out of Stock'}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Button className='btn btn-block' disabled={artwork.availability === 0} type='button'>
                                    Add to cart
                                </Button>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Reactions artworkId={artwork.artwork_id} />
                            </ListGroup.Item>
                        </ListGroup>
                    </Col>
                </Row>
            )}
        </div>
    );
}

export default ArtworkScreen;
