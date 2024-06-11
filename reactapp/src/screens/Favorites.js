import React, { useEffect } from 'react';
import '../index.css'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Row, Col, ListGroup, Button, Image, Spinner } from 'react-bootstrap';
import { removeFavorite, loadFavorites } from '../actions/favoriteActions';
import Message from '../components/Message';
import TrashIconToogle from '../components/TrashIconToogle'

const Favorites = () => {
    const dispatch = useDispatch();

    const userLogin = useSelector(state => state.userLogin);
    const { userInformation } = userLogin;

    useEffect(() => {
        if (userInformation) {
            dispatch(loadFavorites());
        }
    }, [dispatch, userInformation]);

    const favorite = useSelector(state => state.favorite);
    const { favorites, loading, error } = favorite || { favorites: [] };

    const removeFromFavoritesHandler = (favorite_id) => {
        dispatch(removeFavorite(favorite_id));
    };

    return (
        <div>
            <h1>My Favorites</h1>
            {!userInformation ? (
                <Message variant='info'>Please <Link to='/login'>log in</Link> to see your favorites</Message>
            ) : loading ? (
                <Spinner animation="border" role="status">
                    <span className="sr-only">Loading...</span>
                </Spinner>
            ) : error ? (
                <Message variant='danger'>{error}</Message>
            ) : favorites.length === 0 ? (
                <p>No favorites found</p>
            ) : (
                <ListGroup variant='flush' className='divFav'>
                    {favorites.map((favorite) => (
                        <ListGroup.Item key={favorite.id}>
                            <Row>
                                <Col md={2}>
                                    {favorite.artwork && (
                                        <Image src={favorite.artwork.image} alt={favorite.artwork.title} fluid rounded />
                                    )}
                                </Col>
                                <Col md={6} className='titleFav'>
                                    {favorite.artwork && (
                                        <Link to={`/artwork/${favorite.artwork.artwork_id}`}>{favorite.artwork.title}</Link>
                                    )}
                                </Col>
                                <Col md={1}>
                                    <Button
                                        type='button'
                                        variant=''
                                        onClick={() => removeFromFavoritesHandler(favorite.id)}
                                        disabled={!favorite.artwork}
                                    >
                                        <TrashIconToogle />
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
