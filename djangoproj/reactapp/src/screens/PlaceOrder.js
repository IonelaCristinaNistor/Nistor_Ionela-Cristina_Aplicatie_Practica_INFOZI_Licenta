import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Row, Col, ListGroup, Image, Card, ListGroupItem } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { addItemsInOrder } from '../actions/orderActions';
import { ORDER_CREATE_RESET } from '../constants/orderConstants';
import Message from '../components/Message';
import OrderProgress from '../components/OrderProgress';
import { selectCartItems, selectDeliveryAddress, selectPaymentMethod } from '../selectors/cartSelectors';

function PlaceOrder() {
    const orderCreate = useSelector(state => state.orderCreate || {});
    const { error, success, order } = orderCreate;
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const cartItems = useSelector(selectCartItems);
    const deliveryAddress = useSelector(selectDeliveryAddress);
    const paymentMethod = useSelector(selectPaymentMethod);

    const decimals = (num) => (Math.round(num * 100) / 100).toFixed(2);
    const itemsPrice = decimals(cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0));
    const deliveryPrice = decimals(itemsPrice > 1000 ? 0 : 30);
    const taxPrice = decimals(Number((0.015) * itemsPrice));
    const totalPrice = decimals(Number(itemsPrice) + Number(deliveryPrice) + Number(taxPrice));

    useEffect(() => {
        if (!paymentMethod) {
            navigate('/payment');
        }
    }, [paymentMethod, navigate]);

    const placeOrder = async () => {
        dispatch(addItemsInOrder({
            orderItems: cartItems,
            deliveryAddress,
            paymentMethod,
            itemsPrice,
            deliveryPrice,
            taxPrice,
            totalPrice,
        }));
    };

    useEffect(() => {
        if (success && order && order._id) {
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
                                {deliveryAddress.address},
                                {deliveryAddress.city}
                            </p>
                        </ListGroupItem>

                        <ListGroupItem>
                            <h2>Payment Method</h2>
                            <p>
                                <strong>Method: </strong>
                                {paymentMethod}
                            </p>
                        </ListGroupItem>

                        <ListGroupItem>
                            <h2>Order Items</h2>
                            {cartItems.length === 0 ? <Message variant='info'>Your cart is empty</Message> : (
                                <ListGroup variant='flush'>
                                    {cartItems.map((item, index) => (
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
                                                    {item.quantity} x {item.price}LEI = {(item.quantity * item.price).toFixed(2)}LEI
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
                                    <Col>{itemsPrice}LEI</Col>
                                </Row>
                            </ListGroupItem>

                            <ListGroupItem>
                                <Row>
                                    <Col>Delivery:</Col>
                                    <Col>{deliveryPrice} LEI</Col>
                                </Row>
                            </ListGroupItem>

                            <ListGroupItem>
                                <Row>
                                    <Col>Tax:</Col>
                                    <Col>{taxPrice} LEI</Col>
                                </Row>
                            </ListGroupItem>

                            <ListGroupItem>
                                <Row>
                                    <Col>Total:</Col>
                                    <Col>{totalPrice} LEI</Col>
                                </Row>
                            </ListGroupItem>

                            <ListGroupItem>
                                {error && <Message variant='danger'>{error}</Message>}
                            </ListGroupItem>

                            <ListGroupItem>
                                <Button type='button' className='btn btn-block'
                                        disabled={cartItems.length === 0}
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
