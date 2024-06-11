import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Row, Col, Image, ListGroup, Button, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { listArtworkDetails } from '../actions/artworkActions';
import { favoriteListItem, favoriteRemove } from '../actions/favoriteActions';
import Reactions from '../components/Reactions';
import SpinnerComponent from '../components/SpinnerComponent';
import Message from '../components/Message';

function ArtworkScreen() {
    const dispatch = useDispatch();
    const { id } = useParams();
    const artworkDetails = useSelector((state) => state.artworkDetails);
    const { error, loading, artwork } = artworkDetails;

    const favoriteList = useSelector((state) => state.favoriteList || { favorites: [] });
    const { favorites } = favoriteList;
    const isFavorite = favorites.find((fav) => fav._id === id);

    useEffect(() => {
        if (id) dispatch(listArtworkDetails(id));
    }, [dispatch, id]);

    const [artworkQuantity, setArtQuantity] = useState(1);
    const navigate = useNavigate();

    const addItemInCart = () => {
        navigate(`/cart/${id}?artworkQuantity=${artworkQuantity}`);
    };

    const handleFavorite = () => {
        if (isFavorite) {
            console.log('add in favorite')
            dispatch(favoriteRemove(id));
        } else {
            dispatch(favoriteListItem(id));
        }
    };

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

                            {artwork.availability > 0 && (
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Quantity</Col>
                                        <Col xs='auto' className='my-2'>
                                            <Form.Select as="select" value={artworkQuantity} onChange={(m) => setArtQuantity(m.target.value)}>
                                                {
                                                    [...Array(artwork.availability).keys()].map((cnt) =>(
                                                        <option key={ cnt + 1 } value={ cnt + 1 }>
                                                            { cnt + 1 }
                                                        </option>
                                                    ))
                                                }
                                            </Form.Select>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                            )}

                            <ListGroup.Item>
                                <Button onClick={addItemInCart} className='btn btn-block' type='button' disabled = {artwork.availability === 0}>
                                    Add to cart
                                </Button>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Button onClick={handleFavorite} className='btn btn-block' type='button'>
                                    {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
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
