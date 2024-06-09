import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Form, Button, Col, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import SpinnerComponent from '../components/SpinnerComponent';
import Message from '../components/Message';
import FormComponent from '../components/FormComponent';

import { userDetails } from '../actions/userActions';

function Profile() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('')

    const navigate = useNavigate()
    const location = useLocation()
    const dispatch = useDispatch()



    const userDetails = useSelector((state) => state.userDetails)
    const { error, loading, user } = userDetails

    const userLogin = useSelector((state) => state.userLogin)
    const { userInformation } = userLogin
    
    useEffect(() => {
        if (!userInformation) {
            navigate('/login')
        } else {
            if(!user || user.name){
                dispatch.userDetails('profile')
            } else {
                setName(user.name)
                setEmail(user.email)
            }
        }
    }, [dispatch, navigate, userInformation, user])

    const submitHandler = (e) => {
        e.preventDefault()
        if(password !== confirmPassword) {
            setMessage('Passwords do not coincide.')
        } else {
            console.log('Updating...')
        }
    }

  return (
    <Row>
        <Col md = {3}>
            <h2>User Profile</h2>
            {error && <Message variant='danger'>{error}</Message>}
            {message && <Message variant='danger'>{message}</Message>}
            {loading && <SpinnerComponent />}
            <Form onSubmit={submitHandler}>

            <Form.Group controlId='name'>
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type='name'
                        required
                        placeholder='Enter Name'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group controlId='email'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                        type='email'
                        placeholder='Enter Email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group controlId='password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type='password'
                        placeholder='Enter Password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group controlId='confirmPassword'>
                    <Form.Label>Confirm Pssword</Form.Label>
                    <Form.Control
                        type='password'
                        required
                        placeholder='Confirm Password'
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Button type='submit' variant='primary' className='mt-3'>Update your information</Button>
            </Form>
        </Col>
        <Col md = {9}>
            <h2>My Orders</h2>
        </Col>
    </Row>
  )
}

export default Profile
