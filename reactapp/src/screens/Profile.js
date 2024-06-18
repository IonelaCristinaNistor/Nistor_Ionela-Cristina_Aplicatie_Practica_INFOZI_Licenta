import '../index.css'
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Col, Row, Table, Container } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux';

import SpinnerComponent from '../components/SpinnerComponent';
import Message from '../components/Message';
//import FormComponent from '../components/FormComponent';

import { getUserDetails, updateUser } from '../actions/userActions';
import { USER_UPDATE_RESET } from '../constants/userConstants'
import { listOrders } from '../actions/orderActions'


function Profile() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('')
    const [confMessage, setConfMessage] = useState('')

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const userDetails = useSelector((state) => state.userDetails)
    const { error, loading, user } = userDetails

    const userLogin = useSelector((state) => state.userLogin)
    const { userInformation } = userLogin

    const userUpdate = useSelector((state) => state.userUpdate)
    const { success } = userUpdate

    const orderListMy = useSelector((state) => state.orderListMy)
    const { loading: loadingMyOrders, error: errorMyOrders, orders } = orderListMy

    useEffect (() => {
        const messageTimer = setTimeout(() => {setConfMessage('')}, 3000)
        return () => clearTimeout(messageTimer)
    })
    
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

    useEffect(() => {
        if (!userInformation) {
            navigate('/login')
        } else {
            if(!user || !user.name || success || userInformation.id !== user.id){
                dispatch({type: USER_UPDATE_RESET})
                dispatch(getUserDetails('profile'))
                dispatch(listOrders())

                    if(success) {
                        setConfMessage('Your profile details have been updated successfully!');
                    }
            } else {
                setName(user.name)
                setEmail(user.email)
            }
        }
    }, [dispatch, navigate, userInformation, user, success])

    const submitHandler = (e) => {
        e.preventDefault()
        if(password !== confirmPassword) {
            setMessage('Passwords do not coincide.')
        } else {
            dispatch(updateUser({
                'id': user._id,
                'name': name,
                'email': email,
                'password': password,
            }))
            setMessage('')
        }
    }

  return (
    <Row>
        <Col md = {8}>
            <h2 style={{ color: 'black', paddingTop:'10px'}}>My Orders</h2>
            {loadingMyOrders ? (
                <SpinnerComponent /> 
            ) : errorMyOrders ? (
                <Message variant='danger'>{errorMyOrders}</Message>
            ) : (
                <Table striped responsive className='table-sm table-custom mt-4'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Date</th>
                            <th>Total</th>
                            <th>Paid</th>
                            <th>Delivered</th>
                        </tr>
                    </thead>

                    <tbody>
                        {orders.map(order => (
                        <tr className='table-dark' key={order._id}>
                            <td>{order._id}</td>
                            <td>{formattedDate(order.orderDate)}</td>
                            <td>{order.totalPrice}LEI</td>
                            <td>{order.isPaid ? formattedDate(order.paidAt) : (
                                <i className='fas fa-times' style={{color: 'white'}}></i>
                            )}</td>
                            <td>
                                <LinkContainer to = {`/order/${order._id}`}>
                                <Button className='btn btn-sm rounded'>See details</Button>
                                </LinkContainer>
                            </td>
                        </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </Col>
        <Col md = {4}>
            <h2 style={{ color: 'black', paddingTop:'10px' }}>User Profile</h2>
            {error && <Message variant='danger'>{error}</Message>}
            {message && <Message variant='danger'>{message}</Message>}
            {confMessage && <Message variant='success'>{confMessage}</Message>}
            {loading && <SpinnerComponent />}
            
            <Form onSubmit={submitHandler}>
            <Form.Group controlId='name'>
                    <Form.Label style={{color: 'black'}}>Name</Form.Label>
                    <Form.Control className='rounded my-1'
                        type='name'
                        required
                        placeholder='Enter Name'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group controlId='email'>
                    <Form.Label style={{color: 'black'}}>Email Address</Form.Label>
                    <Form.Control className='rounded my-1'
                        type='email'
                        placeholder='Enter Email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group controlId='password'>
                    <Form.Label style={{color: 'black'}}>Password</Form.Label>
                    <Form.Control className='rounded my-1'
                        type='password'
                        placeholder='Enter Password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group controlId='confirmPassword'>
                    <Form.Label style={{color: 'black'}}>Confirm Password</Form.Label>
                    <Form.Control className='rounded my-1'
                        type='password'
                        placeholder='Confirm Password'
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    ></Form.Control>
                </Form.Group>
                <Container className='d-flex flex-column justify-content-center align-items-center'>
                <Button type='submit' variant='primary' className='mt-3 rounded'>Update your informations</Button>
                </Container>
            </Form>
        </Col>
    </Row>
  )
}

export default Profile
