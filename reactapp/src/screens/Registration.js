import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Form, Button, Col, Row, Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import SpinnerComponent from '../components/SpinnerComponent';
import Message from '../components/Message';
import FormComponent from '../components/FormComponent';

import { register } from '../actions/userActions';
import '../index.css'

function RegistrationScreen() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('')

    const navigate = useNavigate()
    const location = useLocation()
    const dispatch = useDispatch()

    const params = new URLSearchParams(location.search)
    const redirect = params.get('redirect') || '/'

    const userRegister = useSelector((state) => state.userRegister)
    const { error, loading, userInformation } = userRegister
    
    useEffect(() => {
        if (userInformation) {
            navigate(redirect)
        }
    }, [navigate, userInformation, redirect])

    const submitHandler = (e) => {
        e.preventDefault()
        if(password !== confirmPassword) {
            setMessage('Passwords do not coincide.')
        } else {
            dispatch(register(name, email, password))
        }
    }

    return (
        <Container sm={2} className='d-flex justify-content-center align-items-center' style={{marginTop: '150px'}}>
        <FormComponent>
            <h1 className='text-center'>Register</h1>
            {error && <Message variant='danger'>{error}</Message>}
            {message && <Message variant='danger'>{message}</Message>}
            {loading && <SpinnerComponent />}
            <Form onSubmit={submitHandler}>

            <Form.Group controlId='name'>
                    <Form.Label>Name</Form.Label>
                    <Form.Control style={{ borderRadius: '10px'}}
                        type='name'
                        required
                        placeholder='Enter Name'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group controlId='email'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control style={{borderRadius: '10px'}}
                        type='email'
                        required
                        placeholder='Enter Email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group controlId='password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control style={{borderRadius: '10px'}}
                        type='password'
                        required
                        placeholder='Enter Password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group controlId='confirmPassword'>
                    <Form.Label>Confirm Pssword</Form.Label>
                    <Form.Control style={{borderRadius: '10px'}}
                        type='password'
                        required
                        placeholder='Confirm Password'
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    ></Form.Control>
                </Form.Group>
                <Container className='d-flex flex-column justify-content-center align-items-center'>
                        <Button type='submit' variant='primary' className='mt-3' style={{width: '30%', borderRadius: '10px'}}>Register</Button>
            <Row className='py-2'>
                <Col>
                    Have an account?{' '}
                    <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>
                        Sign In
                    </Link>
                </Col>
            </Row>
            </Container>
            </Form>
        </FormComponent>
    </Container>
    );
}

export default RegistrationScreen
