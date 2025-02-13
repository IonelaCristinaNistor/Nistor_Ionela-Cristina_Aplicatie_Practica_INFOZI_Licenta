import React, { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Row, Col, ListGroup, Card, ListGroupItem, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getOrderDetails, payOrder, deliveryOrder } from '../actions/orderActions';
import { ORDER_PAY_RESET, ORDER_DELIVERY_RESET } from '../constants/orderConstants';
import SpinnerComponent from '../components/SpinnerComponent';
import Message from '../components/Message';
import CustomPayPalButton from '../components/CustomPayPalButton';

function Order() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const orderId = id;

  const [sdkReady, setSdkReady] = useState(false);

  const orderDetails = useSelector((state) => state.orderDetails || {});
  const { error, loading, order } = orderDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInformation } = userLogin;

  const orderPay = useSelector((state) => state.orderPay || {});
  const { success: successPay } = orderPay;

  const orderDelivery = useSelector((state) => state.orderDelivery || {});
  const { success: successDelivery } = orderDelivery;

  const itemsPrice = useMemo(() => {
    if (order && order.orderItems) {
      const decimals = (num) => (Math.round(num * 100) / 100).toFixed(2);
      return decimals(order.orderItems.reduce((acc, item) => acc + item.price * item.quantity, 0));
    }
    return 0;
  }, [order]);

  const addPayPalScript = () => {
    if (!window.paypalScriptAdded) {
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = 'https://www.paypal.com/sdk/js?client-id=AVKAlCVgBqieKabnyZdDTbav2B68aG3XSbWGppb6TnNSjPFLQkrISjKkmFlt7pSFi_XQotXllrorKVuQ';

      script.async = true; //incărca scriptul asincron,pentru a nu bloca incarcarea paginii
      script.onload = () => { //dupa incarcarea completa a scriptului
        setSdkReady(true);
      };
      document.body.appendChild(script);
      window.paypalScriptAdded = true;
    } else {
      setSdkReady(true);
    }
  };

  useEffect(() => {
    if (!order || successPay || order._id !== Number(orderId) || successDelivery) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch({ type: ORDER_DELIVERY_RESET });
      dispatch(getOrderDetails(orderId));
    } else if (!order.isPaid) {
      if (!window.paypal) {
        addPayPalScript();
      } else {
        setSdkReady(true);
      }
    }
  }, [dispatch, order, orderId, successPay, successDelivery]);

  const successPaymentHandler = (paymentResults) => {
    dispatch(payOrder(orderId, paymentResults));
    window.location.reload();
  };

  const successDeliveryHandler = () => {
    dispatch(deliveryOrder(order));
  };

  const formattedDate = (date) => {
    return new Date(date).toLocaleDateString('ro-RO', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  return loading ? (
    <SpinnerComponent />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <div>
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroupItem>
            <h1>Order: {order._id}</h1>
              <p>
                <strong>Name: </strong>
                {order.user.name}
              </p>
              <p>
                <strong>Email: </strong>
                {order.user.email}
              </p>
              <p>
                <strong>Address: </strong>
                {order.deliveryAddress.address}, {order.deliveryAddress.city}
              </p>
              {order.isDelivered ? (
                <Message variant="success">Delivered: {formattedDate(order.delivered)}</Message>
              ) : (
                <Message variant="info">Not delivered yet</Message>
              )}
            </ListGroupItem>

            <ListGroupItem>
              <h2>Payment Method</h2>
              <p>
                <strong>Method: </strong>
                {order.paymentMethod}
              </p>
              {order.isPaid ? (
                <Message variant="success">Paid at: {formattedDate(order.paidAt)}</Message>
              ) : (
                <Message variant="warning">Not paid yet</Message>
              )}
            </ListGroupItem>

            <ListGroupItem>
              <h2>Items in Order: </h2>
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
                          {item.quantity} x {item.price} LEI = {(item.quantity * item.price).toFixed(2)} LEI
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
                  <Col>{itemsPrice} LEI</Col>
                </Row>
              </ListGroupItem>

              <ListGroupItem>
                <Row>
                  <Col>Delivery:</Col>
                  <Col>{order.deliveryPrice} LEI</Col>
                </Row>
              </ListGroupItem>

              <ListGroupItem>
                <Row>
                  <Col>Tax:</Col>
                  <Col>{order.taxPrice} LEI</Col>
                </Row>
              </ListGroupItem>

              <ListGroupItem>
                <Row>
                  <Col>Total:</Col>
                  <Col>{order.totalPrice} LEI</Col>
                </Row>
              </ListGroupItem>

              {!order.isPaid && (
                <ListGroupItem>
                  {!sdkReady ? (
                    <SpinnerComponent />
                  ) : (
                    <CustomPayPalButton amount={order.totalPrice} onSuccess={successPaymentHandler} />
                  )}
                </ListGroupItem>
              )}
            </ListGroup>
            {userInformation && userInformation.isAdmin && order.isPaid && !order.isDelivered && (
              <ListGroupItem>
                <Button type="button" className="btn btn-block" onClick={successDeliveryHandler}>
                  Select as delivered
                </Button>
              </ListGroupItem>
            )}
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default Order;
