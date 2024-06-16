import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Row, Col, ListGroup, Button, Image, Container } from 'react-bootstrap';
import { loadFavorites, removeFavorite } from '../actions/favoriteActions';
import Message from '../components/Message';
import SpinnerComponent from '../components/SpinnerComponent'
import TrashIconToogle from '../components/TrashIconToogle'
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
        <Container>
        <div>
            <h1 className='my-4' style={{color: 'black'}}>My Favorites</h1>
            {!userInformation ? (
                <Message variant='warning'>Please <Link to='/login'>log in</Link> to see your favorites...</Message>
            ) : loading ? (
                <SpinnerComponent />
            ) : error ? (
                <Message variant='success'>Deleted</Message>
            ) : favorites.length === 0 ? (
                <Message variant='info'>No favorites found</Message>
            ) : (
                <ListGroup variant='flush responsive' className='divFav' style={{width: '900px'}}>
                    {favorites.map((favorite) => (
                        <ListGroup.Item key={favorite.artwork._id}>
                            <Row>
                                <Col md={2}>
                                    {favorite.artwork && (
                                        <Image src={favorite.artwork.image} alt={favorite.artwork.title} fluid rounded />
                                    )}
                                </Col>
                                <Col md={2} className='titleFav mt-4'>
                                    {favorite.artwork && (
                                        <Link to={`/artwork/${favorite.artwork._id}`}>{favorite.artwork.title}</Link>
                                    )}
                                </Col>
                                <Col md={2}>
                                    <Button
                                        type='button'
                                        variant='primary'
                                        onClick={() => addToCartHandler(favorite.artwork._id)}
                                        disabled={!favorite.artwork || favorite.artwork.availability === 0}
                                        className='rounded mt-4'
                                    >
                                        Add to Cart
                                    </Button>
                                </Col>
                                <Col md={2}>
                                    <Button
                                        type='button'
                                        variant=''
                                        onClick={() => removeFromFavoritesHandler(favorite.artwork._id)}
                                        disabled={!favorite.artwork}
                                        className='rounded mt-1'
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
        </Container>
    );
};

export default Favorites;
