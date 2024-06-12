import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Row, Col, Image, ListGroup, Button, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { listArtworkDetails } from '../actions/artworkActions';
import { addFavorite, removeFavorite } from '../actions/favoriteActions';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
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

    useEffect(() => {
        if (id) dispatch(listArtworkDetails(id));
        setIsFavorite(isFavoriteInitial);
    }, [dispatch, id, isFavoriteInitial]);

    const [artworkQuantity, setArtQuantity] = useState(1);
    const navigate = useNavigate();

    const addItemInCart = () => {
        navigate(`/cart/${id}?artworkQuantity=${artworkQuantity}`);
    };

    const handleFavorite = () => {
        if (!userInformation) {
            alert('Please log in to add favorites');
            navigate('/login');
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

    useEffect(() => {
        setIsFavorite(isFavoriteInitial);
    }, [favorites, isFavoriteInitial]);

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
                                    {isFavorite ? <AiFillStar color="gold" /> : <AiOutlineStar color="gold" />}
                                    {isFavorite ? ' Remove from Favorites' : ' Add to Favorites'}
                                </Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Col>
                </Row>
            )}
        </div>
    );
}

export default ArtworkScreen;
