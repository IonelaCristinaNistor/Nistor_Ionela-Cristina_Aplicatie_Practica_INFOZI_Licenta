import React, { useEffect } from 'react'
import "../index.css"
import { Link, useParams, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, ListGroup, Image, Form, Button, Container, Card } from 'react-bootstrap'
import { addItemInCart, removeArtFromCart } from '../actions/cartActions'
import TrashIconToogle from '../components/TrashIconToogle'
import Message from '../components/Message'

function Cart() {
    const { id } = useParams();
    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const cart = useSelector(state => state.cart)
    const { cartItems } = cart

    console.log('cartItems: ', cartItems);

    // extragerea cantitatii din URL
    const searchParams = new URLSearchParams(location.search);
    const quantity = searchParams.get('artworkQuantity') ? Number(searchParams.get('artworkQuantity')) : 1;

    console.log('quantity: ', quantity);

    useEffect(() => {
        if (id) {
            dispatch(addItemInCart(id, quantity));
        }
    }, [dispatch, id, quantity]);

    const removeFromCart = (id) => {
        dispatch(removeArtFromCart(id))
    }
        const checkout = () => {
            navigate('/login?redirect=shipping');
        };

  return (
    <Container className='cartItemContainer'>
    <Row>
      <Col md = {8}>
        <h1 style={{'padding': '20px', 'color': 'black'}}>Shopping cart</h1>
        {cartItems.length === 0 ? (
            <Message variant='info'>
                Your cart is empty! <Link to = '/'>Go back</Link>
            </Message>
        ) : (
            <ListGroup variant='flash'>
                {cartItems.map(item => (
                    <ListGroup.Item key = { item.artwork }>
                        <Row  className='cartRow d-flex justify-content-center'>
                            <Col md = {2}>                            
                                     <Image src = { item.image } alt = {item.title} fluid rounded/>
                            </Col>
                            <Col md = {3}>
                                <Link to={`/artwork/${item.artwork}`} className='linkTitleCart'>{item.title}</Link>
                            </Col>

                            <Col md = {2}>
                                ${item.price}
                            </Col>

                            <Col md = {3} style={{'width': '100px'}}>
                                <Form.Select as="select" style={{'font-size': 'large'}} value={item.quantity} onChange={(m) => 
                                    dispatch(addItemInCart(item.artwork, Number(m.target.value)))}>
                                    {
                                        [...Array(item.availability).keys()].map((cnt) =>(
                                            <option key={ cnt + 1 } value={ cnt + 1 }>
                                                { cnt + 1 }
                                            </option>
                                        ))
                                    }
                                </Form.Select>
                            </Col>

                            <Col md = {1}>
                                <Button type='btn' variant='' onClick={() => removeFromCart(item.artwork)}>
                                    <TrashIconToogle />
                                </Button>
                            </Col>
                        </Row>
                    </ListGroup.Item>
                ))}
            </ListGroup>
        )}
      </Col>

      <Col md= {4}>
        <Card className='cardCart'>
            <ListGroup variant='flush'>
                <ListGroup.Item>
                    <h2>Total ({ cartItems.reduce((x, item) => x + item.quantity, 0)}) items</h2>
                    { cartItems.reduce((x, item) => x + item.quantity * item.price, 0)} $
                </ListGroup.Item>
            </ListGroup>
            <ListGroup.Item>
                <Button type='btn' className='btn btn-block' disabled = { cartItems.length === 0 } onClick = {checkout}>
                    Proceed to checkout
                </Button>
            </ListGroup.Item>
        </Card>
      </Col>
    </Row>
    </Container>
  )
}

export default Cart