import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Dropdown, DropdownButton } from 'react-bootstrap';
import { listArtworks } from '../actions/artworkActions';
import Artwork from '../components/Artwork';
import SpinnerComponent from '../components/SpinnerComponent';
import Message from '../components/Message';

const ArtworkListScreen = () => {
  const [selectCategory, setSelectCategory] = useState('All');

  const dispatch = useDispatch();
  
  const artworkList = useSelector(state => state.artworkList);
  const { loading, error, artworks } = artworkList;

  useEffect(() => {
    dispatch(listArtworks());
  }, [dispatch]);

  const handleCategory = (category) => {
    setSelectCategory(category);
  };

  const filteredArtworks = selectCategory === 'All'
    ? artworks
    : artworks.filter(artwork => artwork.category === selectCategory);

  return (
    <div>
      <h1 className='d-flex justify-content-center my-3' style={{color: 'black'}}>All Products</h1>
      
      <DropdownButton id='dropdown-basic-button' title={`Category: ${selectCategory}`}>
        <Dropdown.Item onClick={() => handleCategory('All')}>All</Dropdown.Item>
        <Dropdown.Item onClick={() => handleCategory('Painting')}>Painting</Dropdown.Item>
        <Dropdown.Item onClick={() => handleCategory('Sculpture')}>Sculpture</Dropdown.Item>
      </DropdownButton>
      
      {loading ? <SpinnerComponent />
        : error ? <Message variant='danger'>{error}</Message>
        :
        <Row>
          {filteredArtworks.map(artwork => (
            <Col className='d-flex justify-content-center' key={artwork._id} sm={12} md={6} lg={4} xl={3}>
              <Artwork artwork={artwork}></Artwork>
            </Col>
          ))}
        </Row>
      }
    </div>
  );
};

export default ArtworkListScreen;
