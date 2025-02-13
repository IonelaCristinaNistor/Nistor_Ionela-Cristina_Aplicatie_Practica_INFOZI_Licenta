import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Table, Button, Row, Col } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { listArtworks, deleteArtwork, createArtwork } from '../actions/artworkActions'
import { ARTWORK_CREATE_RESET } from '../constants/artworkConstants'
import SpinnerComponent from '../components/SpinnerComponent';
import Message from '../components/Message';

function ArtworkAdminList() {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const artworkList = useSelector(state => state.artworkList)
    const { loading, error, artworks } = artworkList

    const artworkDelete = useSelector(state => state.artworkDelete)
    const { loading: loadingDelete, error: errorDelete, success: successDelete } = artworkDelete

    const artworkCreate = useSelector(state => state.artworkCreate)
    const { loading: loadingCreate, error: errorCreate, success: successCreate, artwork: createdArtwork } = artworkCreate

    const userLogin = useSelector(state => state.userLogin)
    const { userInformation } = userLogin

    useEffect (() => {
        dispatch({type: ARTWORK_CREATE_RESET})
        if(!userInformation.isAdmin) {
            navigate('/login')
        }

        if(successCreate) {
            navigate(`/admin/artwork/${createdArtwork._id}/edit`)
        } else {
            dispatch(listArtworks())
        }
        
    }, [dispatch, navigate, userInformation, successDelete, successCreate, createdArtwork])
    
    const deleteActionHandler = (_id) => {
        if(window.confirm('You sure?')) {
           dispatch(deleteArtwork(_id))
        }
    }

    const createHandler = () => {
        dispatch(createArtwork())
    }

  return (
    <div>
        
        <Row className='align-items-center'>
            <Col>
                <h1 style={{color: 'black'}}>All Products</h1>
            </Col>

            <Col className='text-right'>
                <Button className='my-3 rounded' onClick={createHandler}><i className='fas fa-circle-plus'></i> Create Product</Button>
            </Col>

        </Row>

        {loadingDelete && <SpinnerComponent />}
        {errorDelete && <Message variant='danger'>{errorDelete}</Message>}

        {loadingCreate && <SpinnerComponent />}
        {errorCreate && <Message variant='danger'>{errorCreate}</Message>}

      {loading 
        ? (<SpinnerComponent />) 
        : error 
            ? (<Message variant='danger'>{error}</Message>) 
            : (
                <Table striped hover responsive className='table-sm mt-4'>
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
                        {artworks.slice().sort((x, y) => x._id - y._id).map(artwork => (
                            <tr className='table-dark' key={artwork._id}>
                                <td>{artwork._id}</td>
                                <td>{artwork.title}</td>
                                <td>{artwork.artist_name}</td>
                                <td>{artwork.price}LEI</td>
                                <td>{artwork.category}</td>
                                
                                <td>
                                    <LinkContainer to = {`/admin/artwork/${artwork._id}/edit`}>
                                        <Button variant='' className='btn-md'>
                                            <i className='fas fa-pen' style={{color: 'white'}}></i>
                                        </Button>
                                    </LinkContainer>

                                    <Button variant='' className='btn-md' style={{color: 'white'}} onClick = {() => deleteActionHandler(artwork._id)}>
                                        <i className='fas fa-trash-can'></i>
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
//slice creeaza o cpoie a unui array sau a unei parti din array
export default ArtworkAdminList
