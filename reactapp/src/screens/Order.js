import React, { useEffect, useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Row, Col, ListGroup, Image, Card, ListGroupItem } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getOrderDetails } from '../actions/orderActions';
import SpinnerComponent from '../components/SpinnerComponent'
import Message from '../components/Message';

function Order() {
  const { id } = useParams();
  const orderId = id;

  const orderDetails = useSelector(state => state.orderDetails || {});
  const { error, loading, order } = orderDetails;
  const dispatch = useDispatch();

  const itemsPrice = useMemo(() => {
    if (order && order.orderItems) {
        const decimals = (num) => (Math.round(num * 100) / 100).toFixed(2);
        return decimals(order.orderItems.reduce((acc, item) => acc + item.price * item.quantity, 0));
    }
    return 0;
}, [order]);

  useEffect(() => {
    if(!order || order._id !== Number(orderId)){
    dispatch(getOrderDetails(orderId))
    }
  },[order, orderId, dispatch]);

  return loading ? ( <SpinnerComponent />)  
          : error ? (
            <Message variant='danger'>{error}</Message>
          ) : (
      <div>
        <h1>Order: {order._id}</h1>
          <Row>
              <Col md={8}>
                  <ListGroup variant='flush'>
                      <ListGroupItem>
                          <h2>Shipping</h2>
                          <p>
                              <strong>Shipping: </strong>
                              {order.deliveryAddress.address},
                              {order.deliveryAddress.city}
                          </p>
                      </ListGroupItem>

                      <ListGroupItem>
                          <h2>Payment Method</h2>
                          <p>
                              <strong>Method: </strong>
                              {order.paymentMethod}
                          </p>
                      </ListGroupItem>

                      <ListGroupItem>
                          <h2>Order Items</h2>
                          {order.orderItems.length === 0 ? <Message variant='info'>Your order is empty</Message> : (
                              <ListGroup variant='flush'>
                                  {order.orderItems.map((item, index) => (
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
                                              <Row>
                                                  <Col>Items:</Col>
                                                    <Col>${itemsPrice}</Col>
                                              </Row>

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
                      </ListGroup>
                  </Card>
              </Col>
          </Row>
      </div>
  );
}

export default Order;
