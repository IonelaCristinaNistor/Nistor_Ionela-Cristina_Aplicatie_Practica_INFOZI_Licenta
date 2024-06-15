import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Row, Col, ListGroup, Button, Image } from 'react-bootstrap';
import { loadFavorites, removeFavorite } from '../actions/favoriteActions';
import Message from '../components/Message';
import SpinnerComponent from '../components/SpinnerComponent'

const Favorites = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const userLogin = useSelector(state => state.userLogin);
    const { userInformation } = userLogin;

    useEffect(() => {
        if (userInformation) {
            dispatch(loadFavorites());
        }
    }, [dispatch, userInformation]);

    const favorite = useSelector(state => state.favorite);
    const { favorites, loading, error } = favorite || { favorites: [] };

    const removeFromFavoritesHandler = (_id) => {
        dispatch(removeFavorite(_id));
    };

    const addToCartHandler = (_id) => {
        navigate(`/cart/${_id}?artworkQuantity=1`);
    };

    return (
        <div>
            <h1 className='text-center my-4'>My Favorites</h1>
            {!userInformation ? (
                <Message variant='warning'>Please <Link to='/login'>log in</Link> to see your favorites...</Message>
            ) : loading ? (
                <SpinnerComponent />
            ) : error ? (
                <Message variant='success'>Deleted</Message>
            ) : favorites.length === 0 ? (
                <Message variant='info'>No favorites found</Message>
            ) : (
                <ListGroup variant='flush' className='divFav'>
                    {favorites.map((favorite) => (
                        <ListGroup.Item key={favorite.artwork._id}>
                            <Row>
                                <Col md={2}>
                                    {favorite.artwork && (
                                        <Image src={favorite.artwork.image} alt={favorite.artwork.title} fluid rounded />
                                    )}
                                </Col>
                                <Col md={4} className='titleFav'>
                                    {favorite.artwork && (
                                        <Link to={`/artwork/${favorite.artwork._id}`}>{favorite.artwork.title}</Link>
                                    )}
                                </Col>
                                <Col md={2}>
                                    <Button
                                        type='button'
                                        variant='light'
                                        onClick={() => addToCartHandler(favorite.artwork._id)}
                                        disabled={!favorite.artwork || favorite.artwork.availability === 0}
                                    >
                                        Add to Cart
                                    </Button>
                                </Col>
                                <Col md={2}>
                                    <Button
                                        type='button'
                                        variant='danger'
                                        onClick={() => removeFromFavoritesHandler(favorite.artwork._id)}
                                        disabled={!favorite.artwork}
                                    >
                                        Remove
                                    </Button>
                                </Col>
                            </Row>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            )}
        </div>
    );
};

export default Favorites;
