import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Row, Col, ListGroup, Image, Button } from 'react-bootstrap';
import SpinnerComponent from '../components/SpinnerComponent';
import { listFavoriteItems, favoriteRemove } from '../actions/favoriteActions';

const FavoritesScreen = () => {
  const dispatch = useDispatch();
  const favorite = useSelector((state) => state.favorite);
  const { loading, error, artwork } = favorite;

  useEffect(() => {
    dispatch(listFavoriteItems());
  }, [dispatch]);

  const removeFromFavoritesHandler = (id) => {
    dispatch(favoriteRemove(id));
  };

  useEffect(() => {
    console.log(artwork); // Check the structure of artwork data
  }, [artwork]);

  return (
    <div>
      <h1>My Favorites</h1>
      {loading ? (
        <SpinnerComponent />
      ) : error ? (
        <p>{error}</p>
      ) : (
        <ListGroup variant='flush'>
          {artwork && artwork.length ? (
            artwork.map((favorite) => (
              <ListGroup.Item key={favorite.id}>
                <Row>
                  <Col md={2}>
                    <Image src={favorite.image} alt={favorite.title} fluid rounded />
                  </Col>
                  <Col md={3}>
                    <Link to={`/artwork/${favorite.artwork}`}>{favorite.title}</Link>
                  </Col>
                  <Col md={2}>
                    <Button
                      type='button'
                      variant='light'
                      onClick={() => removeFromFavoritesHandler(favorite.id)}
                    >
                      <i className='fas fa-trash'></i>
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))
          ) : (
            <p>No favorites found</p>
          )}
        </ListGroup>
      )}
    </div>
  );
};

export default FavoritesScreen;
