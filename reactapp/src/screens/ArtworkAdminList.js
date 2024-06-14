import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Table, Button, Row, Col } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { listArtworks, deleteArtwork } from '../actions/artworkActions'

import SpinnerComponent from '../components/SpinnerComponent';
import Message from '../components/Message';

function ArtworkAdminList() {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const artworkList = useSelector(state => state.artworkList)
    const { loading, error, artworks } = artworkList

    const artworkDelete = useSelector(state => state.artworkDelete)
    const { loading: loadingDelete, error: errorDelete, success: successDelete } = artworkDelete

    const userLogin = useSelector(state => state.userLogin)
    const { userInformation } = userLogin

    useEffect (() => {
        if(userInformation || !userInformation.isAdmin) {
            dispatch(listArtworks())   
        }else {
            navigate('/login')
        }
        
    }, [dispatch, navigate, userInformation, successDelete])
    
    const deleteActionHandler = (artwork_id) => {
        if(window.confirm('You sure?')) {
           dispatch(deleteArtwork(artwork_id))
        }
    }

    const createHandler = (artwork) => {
        //create artwork
    }

  return (
    <div>
        
        <Row className='align-items-center'>
            <Col>
                <h1>Artworks</h1>
            </Col>

            <Col className='text-right'>
                <Button className='my-3' onClick={createHandler}><i className='fas fa-plus'></i> Create Product</Button>
            </Col>

        </Row>

        {loadingDelete && <SpinnerComponent />}
        {errorDelete && <Message variant='danger'>{error}</Message>}

      {loading 
        ? (<SpinnerComponent />) 
        : error 
            ? (<Message variant='danger'>{error}</Message>) 
            : (
                <Table striped hover bordered responsive className='table-sm mt-4'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Title</th>
                            <th>Artist Name</th>
                            <th>Price</th>
                            <th>Category</th>
                            <th>Edit</th>
                        </tr>
                    </thead>

                    <tbody>
                        {artworks.map(artwork => (
                            <tr key={artwork.artwork_id}>
                                <td>{artwork.artwork_id}</td>
                                <td>{artwork.title}</td>
                                <td>{artwork.artist_name}</td>
                                <td>{artwork.price}</td>
                                <td>{artwork.category}</td>
                                
                                <td>
                                    <LinkContainer to = {`/admin/artwork/${artwork.artwork_id}/edit`}>
                                        <Button variant='' className='btn-sm'>
                                            <i className='fas fa-pen' style={{color: 'purple'}}></i>
                                        </Button>
                                    </LinkContainer>

                                    <Button variant='primary' className='btn-sm' onClick = {() => deleteActionHandler(artwork.artwork_id)}>
                                        <i className='fas fa-trash'></i>
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}

    </div>
  )
}

export default ArtworkAdminList
