import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, Row, Col, ListGroup, Image, Card, ListGroupItem } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import Message from '../components/Message'
import OrderProgress from '../components/OrderProgress'

function PlaceOrder() {
    const cart = useSelector(state => state.cart)
  return (
    <div>
        <OrderProgress step1 step2 step3 step4/>
        <Row>
            <Col md = {8}>
                <ListGroup variant='flush'>
                    <ListGroupItem>
                        <h2>Shipping</h2>
                        <p><strong>Shipping: </strong></p>
                        {cart.deliveryAddress.address}, {cart.deliveryAddress.city},
                        {' '}
                    </ListGroupItem>
                </ListGroup>
            </Col>

            <Col md = {4}>
            </Col>
        </Row>
    </div>
  )
}

export default PlaceOrder
