import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Row, Col, Image, ListGroup, Button, Form, Card } from 'react-bootstrap';
import { listArtworkDetails, fetchReactions, addArtworkLike, addComment } from '../actions/artworkActions';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { addFavorite, removeFavorite } from '../actions/favoriteActions'
import SpinnerComponent from '../components/SpinnerComponent';
import Message from '../components/Message';
import Comments from '../components/Comments';
import ModalCustom from '../components/ModalCustom';

function Artwork() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const artworkDetails = useSelector(state => state.artworkDetails);
    const { error, loading, artwork } = artworkDetails;

    const userLogin = useSelector(state => state.userLogin);
    const { userInformation } = userLogin;

    const favorite = useSelector(state => state.favorite);
    const { favorites } = favorite || { favorites: [] };
    const isFavoriteInitial = favorites.find(fav => fav.artwork && fav.artwork._id === parseInt(id));

    const [isFavorite, setIsFavorite] = useState(isFavoriteInitial);
    const [showModal, setShowModal] = useState(false);
    const [comment, setComment] = useState('');
    const [artworkQuantity, setArtQuantity] = useState(1);
    const [isLiked, setIsLiked] = useState('');

    useEffect(() => {
        if (id) {
            dispatch(listArtworkDetails(id));
            dispatch(fetchReactions(id));
        }
        setIsFavorite(isFavoriteInitial);
    }, [dispatch, id, isFavoriteInitial]);

    const addItemInCart = () => {
        if (!userInformation) {
            setShowModal(true);
            return;
        }
        navigate(`/cart/${id}?artworkQuantity=${artworkQuantity}`);
    };

    const handleFavorite = () => {
        if (!userInformation) {
            setShowModal(true);
            return;
        }

        const _id = parseInt(id);

        if (isFavorite) {
            dispatch(removeFavorite(_id));
        } else {
            dispatch(addFavorite(_id));
        }

        setIsFavorite(!isFavorite);
    };

    const handleModalClose = () => setShowModal(false);

    const reactionList = useSelector(state => state.reactionList);
    const { loading: loadingReaction, error: errorReaction, reactions } = reactionList;

    const submitCommentHandler = (e) => {
        e.preventDefault();
        if (userInformation) {
            dispatch(addComment(id, comment));
            setComment('');
        } else {
            setShowModal(true);
        }
    };

    const handleArtworkLike = () => {
        if (userInformation) {
            dispatch(addArtworkLike(id));
            setIsLiked(!isLiked);
        } else {
            setShowModal(true);
        }
    };

    return (
        <div>
            <Link to='/' className='btn btn-primary rounded my-2'>Go Back</Link>
            {loading ? (
                <SpinnerComponent />
            ) : error ? (
                <Message variant='danger'>{error}</Message>
            ) : (
                <Row className='row_artworks'>
                    <Col md={6} className='d-flex align-items-center justify-content-center'>
                        <Image src={artwork.image} alt={artwork.title} fluid className='image-list' />
                    </Col>
                    <Col md={6}>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <h2>{artwork.title}</h2>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col><strong>Price:</strong></Col>
                                    <Col>
                                        <strong>{artwork.price} LEI</strong>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col><strong>Category:</strong></Col>
                                    <Col>
                                        <strong>{artwork.category}</strong>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item><strong className='me-3'>Description:</strong> {artwork.description}</ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col><strong>Status:</strong></Col>
                                    <Col>{artwork.availability > 0 ? 'In Stock' : 'Out of Stock'}</Col>
                                </Row>
                            </ListGroup.Item>

                            {artwork.availability > 0 && (
                                <ListGroup.Item className='d-flex justify-content-between'>
                                    <Row>
                                        <Col><strong>Quantity</strong></Col>
                                        <Col xs='auto' className=''>
                                            <Form.Select as="select" value={artworkQuantity} onChange={(m) => setArtQuantity(m.target.value)}>
                                                {[...Array(artwork.availability).keys()].map((cnt) => (
                                                    <option key={cnt + 1} value={cnt + 1}>
                                                        {cnt + 1}
                                                    </option>
                                                ))}
                                            </Form.Select>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                            )}

                            <ListGroup.Item className='d-flex justify-content-between'>
                                <Button onClick={addItemInCart} className='btn btn-block rounded' type='button'  disabled={artwork.availability <= 0}>
                                    Add to cart
                                </Button>

                                <Button onClick={handleFavorite} className='btn btn-block rounded' type='button'>
                                    {isFavorite ? <AiFillStar color="gold" /> : <AiOutlineStar color="gold" />}
                                    {isFavorite ? ' Remove from Favorites' : ' Add to Favorites'}
                                </Button>
                            </ListGroup.Item>


                            <ListGroup.Item className='d-flex flex-row justify-content-center'>
                                <Card className='d-flex flex-row justify-content-between align-items-center py-3 rounded-pill' style={{width: '300px'}}>
                            <Button
                                className='rounded-pill mx-3'
                                variant={isLiked ? "danger" : "outline-danger"}
                                onClick={handleArtworkLike}
                            >
                                <i className='fas fa-heart'></i> {isLiked ? "Like" : "Like"}
                            </Button>
                                    <span className='mx-5'>{artwork.likes_counter} {artwork.likes_counter === 1 ? 'Like' : 'Likes'}</span>
                                </Card>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                {loadingReaction ? (
                                    <SpinnerComponent />
                                ) : errorReaction ? (
                                    <Message variant='danger'>{errorReaction}</Message>
                                ) : (
                                    <>
                                        <Form onSubmit={submitCommentHandler}>
                                            <Form.Group controlId='comment'>
                                                <Form.Label>Add a Comment</Form.Label>
                                                <Form.Control
                                                    as='textarea'
                                                    row='3'
                                                    value={comment}
                                                    onChange={(e) => setComment(e.target.value)}
                                                    required
                                                ></Form.Control>
                                            </Form.Group>
                                            <Button type='submit' variant='primary' className='mt-2 rounded'>
                                                Submit
                                            </Button>
                                        </Form>
                                    </>
                                )}
                            </ListGroup.Item>
                        </ListGroup>
                    </Col>
                </Row>
            )}

            <Card className='d-flex flex-column justify-content-center my-3 p-3' style={{'width' : '400px'}}>
            {reactions && reactions.length > 0 ? (
            reactions.map((reaction) => (
           <Comments key={reaction._id} reaction={reaction}/>
             ))
            ) : (
                <div>No reactions</div>
            )}
            </Card>

            <ModalCustom show={showModal} handleClose={handleModalClose} />
        </div>
    );
}

export default Artwork;
