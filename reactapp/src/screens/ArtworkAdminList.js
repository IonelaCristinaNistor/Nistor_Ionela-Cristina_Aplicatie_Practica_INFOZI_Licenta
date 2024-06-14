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
            navigate(`/admin/artwork/${createdArtwork.artwork_id}/edit`)
        } else {
            dispatch(listArtworks())
        }
        
    }, [dispatch, navigate, userInformation, successDelete, successCreate, createdArtwork])
    
    const deleteActionHandler = (artwork_id) => {
        if(window.confirm('You sure?')) {
           dispatch(deleteArtwork(artwork_id))
        }
    }

    const createHandler = () => {
        dispatch(createArtwork())
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
        {errorDelete && <Message variant='danger'>{errorDelete}</Message>}

        {loadingCreate && <SpinnerComponent />}
        {errorCreate && <Message variant='danger'>{errorCreate}</Message>}

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
