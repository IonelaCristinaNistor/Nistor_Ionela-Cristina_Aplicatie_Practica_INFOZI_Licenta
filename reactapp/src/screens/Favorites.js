import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Row, Col, ListGroup, Image, Button } from 'react-bootstrap'
import Message from '../components/Message'
import SpinnerComponent from '../components/SpinnerComponent'
import { favoriteListItem, favoriteRemove } from '../actions/favoriteActions'

const FavoritesScreen = () => {
    const dispatch = useDispatch()
    const favorite = useSelector(state => state.favorite);
    const { favorites } = favorite;

    useEffect(() => {
        dispatch(favoriteListItem());
    }, [dispatch]);

    const removeFromFavoritesHandler = (id) => {
        dispatch(favoriteRemove(id));
    };

    return (
        <div>
            <h1>My Favorites</h1>
                <ListGroup variant='flush'>
                    {favorites.map((favorites) => (
                        <ListGroup.Item key={favorites._id}>
                            <Row>
                                <Col md={2}>
                                    <Image src={favorites.image} alt={favorites.title} fluid rounded />
                                </Col>
                                <Col md={3}>
                                    <Link to={`/favorites/${favorites._id}`}>{favorites.title}</Link>
                                </Col>
                                <Col md={2}>
                                    <Button
                                        type='button'
                                        variant='light'
                                        onClick={() => removeFromFavoritesHandler(favorites._id)}
                                    >
                                        <i className='fas fa-trash'></i>
                                    </Button>
                                </Col>
                            </Row>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
        </div>
    );
};

export default FavoritesScreen;
