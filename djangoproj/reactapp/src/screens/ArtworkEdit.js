import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Form, Button, Container, FormGroup } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import SpinnerComponent from '../components/SpinnerComponent';
import Message from '../components/Message';
import FormComponent from '../components/FormComponent';
import { listArtworkDetails, updateArtwork } from '../actions/artworkActions';
import { ARTWORK_UPDATE_RESET } from '../constants/artworkConstants';

function ArtworkEdit() {
    const { id: artworkId } = useParams();

    const [title, setTitle] = useState('');
    const [artist_name, setArtist_name] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(0);
    const [category, setCategory] = useState('');
    const [availability, setAvailability] = useState(0);
    const [image, setImage] = useState('');

    const [upload, setUpload] = useState(false);

    const [buttonColor, setButtonColor] = useState('purple');

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const artworkDetails = useSelector((state) => state.artworkDetails || {});
    const { error, loading, artwork } = artworkDetails;

    const artworkUpdate = useSelector((state) => state.artworkUpdate);
    const { error: errorUpdate, loading: loadingUpdate, success: successUpdate } = artworkUpdate;

    useEffect(() => {
        if (successUpdate) {
            dispatch({ type: ARTWORK_UPDATE_RESET });
            navigate('/admin/artworklist');
        } else {
            if (Number(artwork._id) !== Number(artworkId)) {
                dispatch(listArtworkDetails(artworkId));
            } else {
                setTitle(artwork.title);
                setArtist_name(artwork.artist_name);
                setDescription(artwork.description);
                setPrice(artwork.price);
                setCategory(artwork.category);
                setAvailability(artwork.availability);
                setImage(artwork.image)
            }
        }
    }, [dispatch, navigate, artwork, artworkId, successUpdate]);

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(updateArtwork({
            _id: Number(artworkId),
            title,
            artist_name,
            description,
            price,
            category,
            availability
        }));
    };
    // astepta rezolvarea unei promisiuni si continua executia dupa rezolvare
    const uploadImage = async (e) => {
        const file = e.target.files[0] //se preia primul fisier selectat
        const formData = new FormData()
        formData.append('image', file) //adauga un nou element de tip image
        formData.append('artwork_id', artworkId)
        setUpload(true)
        try{
            const config = {
                Headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
            const {data} = await axios.post('/api/artworks/upload/', formData, config) //comunica cu serverul si trimite o cerere
            
            setImage(data)
            setUpload(false)
        } catch {
            setUpload(false)
        }
    }

    return (
        <div>
            <Button variant='secondary' className='rounded ms-5 px-4'>
                <Link to='/admin/artworklist' style={{ 'textDecoration': 'none', 'color': 'black' }}>Back</Link>
            </Button>

            <Container sm={2} className='d-flex justify-content-center align-items-center' style={{ fontSize: 'large', color: 'black' }}>
                <FormComponent>
                    <h1 className='text-center'>Edit Artwork</h1>
                    {loadingUpdate && <SpinnerComponent />}
                    {errorUpdate && <Message variant='danger'>{error}</Message>}

                    {loading ? <SpinnerComponent /> : error ? <Message variant='danger'>{error}</Message>
                        : (
                            <Form onSubmit={submitHandler}>

                                <FormGroup controlId='title'>
                                    <Form.Label>Title</Form.Label>
                                    <Form.Control style={{ borderRadius: '10px', marginTop: '5px', marginBottom: '5px' }}
                                        type='text'
                                        required
                                        placeholder='Enter title'
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                    ></Form.Control>
                                </FormGroup>

                                <FormGroup controlId='artist_name'>
                                    <Form.Label>Artist Name</Form.Label>
                                    <Form.Control style={{ borderRadius: '10px', marginTop: '5px', marginBottom: '5px' }}
                                        type='name'
                                        required
                                        placeholder='Enter Artist Name'
                                        value={artist_name}
                                        onChange={(e) => setArtist_name(e.target.value)}
                                    ></Form.Control>
                                </FormGroup>

                                <FormGroup controlId='description'>
                                    <Form.Label>Description</Form.Label>
                                    <Form.Control style={{ borderRadius: '10px', marginTop: '5px', marginBottom: '5px' }}
                                        type='text'
                                        required
                                        placeholder='Enter description'
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                    ></Form.Control>
                                </FormGroup>

                                <FormGroup controlId='Price'>
                                    <Form.Label>Price</Form.Label>
                                    <Form.Control style={{ borderRadius: '10px', marginTop: '5px', marginBottom: '5px' }}
                                        type='number'
                                        required
                                        placeholder='Enter price'
                                        value={price}
                                        onChange={(e) => setPrice(e.target.value)}
                                    ></Form.Control>
                                </FormGroup>

                                <FormGroup controlId='category'>
                                    <Form.Label>Category</Form.Label>
                                    <Form.Check
                                        style={{ borderRadius: '10px', marginTop: '5px', marginBottom: '5px' }}
                                        type='radio'
                                        required
                                        name='category'
                                        value='Painting'
                                        label='Painting'
                                        checked={category === 'Painting'}
                                        onChange={(e) => setCategory(e.target.value)}
                                    />
                                </FormGroup>

                                <FormGroup controlId='category'>
                                    <Form.Check
                                        style={{ borderRadius: '10px', marginTop: '5px', marginBottom: '5px' }}
                                        type='radio'
                                        name='category'
                                        value='Sculpture'
                                        label='Sculpture'
                                        checked={category === 'Sculpture'}
                                        onChange={(e) => setCategory(e.target.value)}
                                    />
                                </FormGroup>

                                <FormGroup controlId='availability'>
                                    <Form.Label>Availability</Form.Label>
                                    <Form.Control style={{ borderRadius: '10px', marginTop: '5px', marginBottom: '5px' }}
                                        type='number'
                                        placeholder='Enter Availability'
                                        value={availability}
                                        onChange={(e) => setAvailability(e.target.value)}
                                    ></Form.Control>
                                </FormGroup>

                                <FormGroup controlId='image'>
                                    <Form.Label>Image</Form.Label>
                                    <Form.Control style={{ borderRadius: '10px', marginTop: '5px', marginBottom: '5px' }}
                                        type='text'
                                        placeholder='Enter image'
                                        value={image}
                                        onChange={(e) => setImage(e.target.value)}
                                    ></Form.Control>

                                    <Form.Control
                                    label='Choose image...' 
                                    type='file' 
                                    onChange={uploadImage}>
                                    </Form.Control>
                                    {upload && <SpinnerComponent />}
                                </FormGroup>

                                <Container className='d-flex flex-column justify-content-center align-items-center'>
                                    <Button type='submit' variant='primary' className='mt-3'
                                        style={{ backgroundColor: buttonColor, color: 'white', border: 'none', width: '30%', borderRadius: '10px' }}
                                        onClick={() => setButtonColor(buttonColor === 'purple' ? 'green' : 'purple')}>
                                        Update
                                    </Button>
                                </Container>
                            </Form>
                        )}
                </FormComponent>
            </Container>
        </div>
    );
}

export default ArtworkEdit;
