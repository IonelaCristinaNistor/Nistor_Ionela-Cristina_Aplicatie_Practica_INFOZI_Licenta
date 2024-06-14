import React, { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Row, Col, ListGroup, Card, ListGroupItem } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getOrderDetails, payOrder } from '../actions/orderActions';
import { PayPalButton } from 'react-paypal-button-v2';
import SpinnerComponent from '../components/SpinnerComponent';
import Message from '../components/Message';

function Order() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const orderId = id;

  const [sdkReady, setSdkReady] = useState(false);

  const orderDetails = useSelector(state => state.orderDetails || {});
  const { error, loading, order } = orderDetails;

  const orderPay = useSelector(state => state.orderPay || {});
  const { loading: loadingPay, success: successPay } = orderPay;

  const itemsPrice = useMemo(() => {
    if (order && order.orderItems) {
      const decimals = (num) => (Math.round(num * 100) / 100).toFixed(2);
      return decimals(order.orderItems.reduce((acc, item) => acc + item.price * item.quantity, 0));
    }
    return 0;
  }, [order]);

  useEffect(() => {
    const addPayPalScript = () => {
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = 'https://www.paypal.com/sdk/js?client-id=AVKAlCVgBqieKabnyZdDTbav2B68aG3XSbWGppb6TnNSjPFLQkrISjKkmFlt7pSFi_XQotXllrorKVuQ';
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };

    if (!order || successPay || order._id !== Number(orderId)) {
      dispatch(getOrderDetails(orderId));
    } else if (!order.isPaid) {
      if (!window.paypal) {
        addPayPalScript();
      } else {
        setSdkReady(true);
      }
    }
  }, [order, orderId, dispatch, successPay]);

  const successPaymentHandler = (paymentResult) => {
    dispatch(payOrder(orderId, paymentResult)); 
    };

    const formattedDate = (date) => {
      return new Date(date).toLocaleDateString('ro-RO', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      });
    };


  return loading ? (
    <SpinnerComponent />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <div>
      <h1>Order: {order._id}</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroupItem>
              <h2>Shipping</h2>
              <p><strong>Name: </strong>{order.user.name}</p>
              <p><strong>Email: </strong>{order.user.email}</p>
              <p>
                <strong>Shipping: </strong>
                {order.deliveryAddress.address}, {order.deliveryAddress.city}
              </p>
              {order.isDelivered ? (
                <Message variant="success">Delivered: {formattedDate(order.delivered)}</Message>
              ) : (
                <Message variant="warning">Not delivered yet</Message>
              )}
            </ListGroupItem>

            <ListGroupItem>
              <h2>Payment Method</h2>
              <p>
                <strong>Method: </strong>{order.paymentMethod}
              </p>
              {order.isPaid ? (
                <Message variant="success">Paid at: {formattedDate(order.paidAt)}</Message>
              ) : (
                <Message variant="warning">Not paid yet</Message>
              )}
            </ListGroupItem>

            <ListGroupItem>
              <h2>Order Items</h2>
              {order.orderItems.length === 0 ? (
                <Message variant="info">Your order is empty</Message>
              ) : (
                <ListGroup variant="flush">
                  {order.orderItems.map((item, index) => (
                    <ListGroupItem key={index}>
                      <Row>
                        <Col>
                          <Link to={`/artwork/${item.artwork}`} style={{ color: 'black', textDecoration: 'none' }}>
                            {item.title}
                          </Link>
                        </Col>
                        <Col md={4}>
                          {item.quantity} x ${item.price} = {(item.quantity * item.price).toFixed(2)}
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
            <ListGroup variant="flush">
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
                  <Col>${order.deliveryPrice}</Col>
                </Row>
              </ListGroupItem>

              <ListGroupItem>
                <Row>
                  <Col>Tax:</Col>
                  <Col>${order.taxPrice}</Col>
                </Row>
              </ListGroupItem>

              <ListGroupItem>
                <Row>
                  <Col>Total:</Col>
                  <Col>${order.totalPrice}</Col>
                </Row>
              </ListGroupItem>

              {!order.isPaid && (
                <ListGroupItem>
                  {loadingPay && <SpinnerComponent />}
                  {!sdkReady ? (
                    <SpinnerComponent />
                  ) : (
                    <PayPalButton amount={order.totalPrice} onSuccess={successPaymentHandler} />
                  )}
                </ListGroupItem>
              )}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default Order;
