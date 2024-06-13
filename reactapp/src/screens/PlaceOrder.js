import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Row, Col, ListGroup, Image, Card, ListGroupItem } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { addItemsInOrder } from '../actions/orderActions';
import { ORDER_CREATE_RESET } from '../constants/orderConstants';
import Message from '../components/Message';
import OrderProgress from '../components/OrderProgress';

function PlaceOrder() {
    const orderCreate = useSelector(state => state.orderCreate || {});
    const { error, success, order } = orderCreate;
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const cart = useSelector(state => state.cart);
    const decimals = (num) => (Math.round(num * 100) / 100).toFixed(2);
    const itemsPrice = decimals(cart.cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0));
    const deliveryPrice = decimals(itemsPrice > 1000 ? 0 : 30);
    const taxPrice = decimals(Number((0.015) * itemsPrice));
    const totalPrice = decimals(Number(itemsPrice) + Number(deliveryPrice) + Number(taxPrice));

    if (!cart.paymentMethod) {
        navigate('/payment');
    }

    const placeOrder = () => {
        console.log("Placing order with data:", {
            orderItems: cart.cartItems,
            deliveryAddress: cart.deliveryAddress,
            paymentMethod: cart.paymentMethod,
            itemsPrice,
            deliveryPrice,
            taxPrice,
            totalPrice,
        });

        dispatch(addItemsInOrder({
            orderItems: cart.cartItems,
            deliveryAddress: cart.deliveryAddress,
            paymentMethod: cart.paymentMethod,
            itemsPrice,
            deliveryPrice,
            taxPrice,
            totalPrice,
        }));
    };

    useEffect(() => {
        if (success && order && order._id) {
            console.log("Order created, navigating to order page with _id:", order._id);
            navigate(`/order/${order._id}`);
            dispatch({ type: ORDER_CREATE_RESET });
        }
    }, [success, order, navigate, dispatch]);

    return (
        <div>
            <OrderProgress step1 step2 step3 step4 />
            <Row>
                <Col md={8}>
                    <ListGroup variant='flush'>
                        <ListGroupItem>
                            <h2>Shipping</h2>
                            <p>
                                <strong>Shipping: </strong>
                                {cart.deliveryAddress.address},
                                {cart.deliveryAddress.city}
                            </p>
                        </ListGroupItem>

                        <ListGroupItem>
                            <h2>Payment Method</h2>
                            <p>
                                <strong>Method: </strong>
                                {cart.paymentMethod}
                            </p>
                        </ListGroupItem>

                        <ListGroupItem>
                            <h2>Order Items</h2>
                            {cart.cartItems.length === 0 ? <Message variant='info'>Your cart is empty</Message> : (
                                <ListGroup variant='flush'>
                                    {cart.cartItems.map((item, index) => (
                                        <ListGroupItem key={index}>
                                            <Row>
                                                <Col md={1}>
                                                    <Image src={item.image} alt={item.title} fluid rounded />
                                                </Col>
                                                <Col>
                                                    <Link to={`/artwork/${item.artwork}`}
                                                          style={{ 'color': 'black', 'textDecoration': 'none' }}>
                                                        {item.title}
                                                    </Link>
                                                </Col>
                                                <Col md={4}>
                                                    {item.quantity} x ${item.price} = ${(item.quantity * item.price).toFixed(2)}
                                                </Col>
                                            </Row>
                                        </ListGroupItem>
                                    ))}
                                </ListGroup>
                            )}
                        </ListGroupItem>
                    </ListGroup>
                </Col>

                <Col md={4}>
                    <Card>
                        <ListGroup variant='flush'>
                            <ListGroupItem>
                                <h2>Summary</h2>
                            </ListGroupItem>

                            <ListGroupItem>
                                <Row>
                                    <Col>Items:</Col>
                                    <Col>${itemsPrice}</Col>
                                </Row>
                            </ListGroupItem>

                            <ListGroupItem>
                                <Row>
                                    <Col>Delivery:</Col>
                                    <Col>${deliveryPrice}</Col>
                                </Row>
                            </ListGroupItem>

                            <ListGroupItem>
                                <Row>
                                    <Col>Tax:</Col>
                                    <Col>${taxPrice}</Col>
                                </Row>
                            </ListGroupItem>

                            <ListGroupItem>
                                <Row>
                                    <Col>Total:</Col>
                                    <Col>${totalPrice}</Col>
                                </Row>
                            </ListGroupItem>

                            <ListGroupItem>
                                {error && <Message variant='danger'>{error}</Message>}
                            </ListGroupItem>

                            <ListGroupItem>
                                <Button type='button' className='btn btn-block'
                                        disabled={cart.cartItems.length === 0}
                                        onClick={placeOrder}>
                                    Place Order
                                </Button>
                            </ListGroupItem>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </div>
    );
}

export default PlaceOrder;
