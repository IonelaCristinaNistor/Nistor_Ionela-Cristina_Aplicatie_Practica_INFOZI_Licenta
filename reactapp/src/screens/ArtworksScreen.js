import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Row, Col, Image, ListGroup, Button, Form, Modal, ListGroupItem } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { listArtworkDetails } from '../actions/artworkActions';
import { addFavorite, removeFavorite } from '../actions/favoriteActions';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import Reactions from '../components/Reactions'
import SpinnerComponent from '../components/SpinnerComponent';
import Message from '../components/Message';

function ArtworkScreen() {
    const dispatch = useDispatch();
    const { id } = useParams();
    const artworkDetails = useSelector((state) => state.artworkDetails);
    const { error, loading, artwork } = artworkDetails;

    const userLogin = useSelector(state => state.userLogin);
    const { userInformation } = userLogin;

    const favorite = useSelector((state) => state.favorite);
    const { favorites } = favorite || { favorites: [] };
    const isFavoriteInitial = favorites.find(fav => fav.artwork && fav.artwork.artwork_id === parseInt(id));

    const [isFavorite, setIsFavorite] = useState(isFavoriteInitial);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        if (id) dispatch(listArtworkDetails(id));
        setIsFavorite(isFavoriteInitial);
    }, [dispatch, id, isFavoriteInitial]);

    const [artworkQuantity, setArtQuantity] = useState(1);
    const navigate = useNavigate();

    const addItemInCart = () => {
        if (!userInformation) {
            setShowModal(true);
            return;
        }
        navigate(`/cart/${id}?artworkQuantity=${artworkQuantity}`);
    };

    const handleFavorite = () => {
        if (!userInformation) {
            setShowModal(true);
            return;
        }

        const artwork_id = parseInt(id);

        if (isFavorite) {
            dispatch(removeFavorite(artwork_id));
        } else {
            dispatch(addFavorite(artwork_id));
        }

        setIsFavorite(!isFavorite);
    };

    const handleModalClose = () => setShowModal(false);
    const handleLogin = () => {
        setShowModal(false);
        navigate('/login');
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
                            <ListGroup.Item>
                                <Row>
                                    <Col>Category: </Col>
                                    <Col>
                                        <strong>{artwork.category}</strong>
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
                                <ListGroup.Item className='d-flex justify-content-between'>
                                    <Row>
                                        <Col>Quantity</Col>
                                        <Col xs='auto' className=''>
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

                            <ListGroup.Item className='d-flex justify-content-between'>
                                <Button onClick={addItemInCart} className='btn btn-block rounded' type='button' disabled = {artwork.availability <= 0}>
                                    Add to cart
                                </Button>
    
                                <Button onClick={handleFavorite} className='btn btn-block rounded' type='button'>
                                    {isFavorite ? <AiFillStar color="gold" /> : <AiOutlineStar color="gold" />}
                                    {isFavorite ? ' Remove from Favorites' : ' Add to Favorites'}
                                </Button>
                            </ListGroup.Item>
                            <ListGroupItem>
                                <Reactions artworkId = {artwork.artwork_id}/>
                            </ListGroupItem>
                        </ListGroup>
                    </Col>
                </Row>
            )}

            <Modal show={showModal} onHide={handleModalClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Not Authenticated</Modal.Title>
                </Modal.Header>
                <Modal.Body>Please log in to add this item</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleModalClose}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleLogin}>
                        Log In
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default ArtworkScreen;
