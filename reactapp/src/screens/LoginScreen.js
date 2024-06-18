import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Form, Button, Col, Row, Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import SpinnerComponent from '../components/SpinnerComponent';
import Message from '../components/Message';
import { login } from '../actions/userActions';
import FormComponent from '../components/FormComponent';

function LoginScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();

    const params = new URLSearchParams(location.search);
    const redirect = params.get('redirect') || '/';

    const userLogin = useSelector((state) => state.userLogin);
    const { error, loading, userInformation} = userLogin;
    
    useEffect(() => {
        if (userInformation) {
            navigate(redirect);
        }
    }, [navigate, userInformation, redirect]);

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(login(email, password));
    };

    return (
        <div style={{marginTop: '150px'}}>
        <FormComponent className='d-flex justify-content-center align-items-center'>
            <h1 className='text-center my-4' style = {{color: 'black'}}>Sign In</h1>
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <SpinnerComponent />}
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='email'>
                    <Form.Label style = {{color: 'black', fontSize: 'large'}}>Email Address</Form.Label>
                    <Form.Control style={{ borderRadius: '10px'}}
                        type='email'
                        placeholder='Enter Email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group controlId='password'>
                    <Form.Label style = {{color: 'black', fontSize: 'large'}}>Password</Form.Label>
                    <Form.Control style={{ borderRadius: '10px'}}
                        type='password'
                        placeholder='Enter Password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    ></Form.Control>
                </Form.Group>
                <Container className='d-flex flex-column justify-content-center align-items-center'>
                <Button type='submit' variant='primary' className='mt-3 rounded'>
                    Submit
                </Button>
   
            <Row className='py-2'>
                <Col style={{color: 'black'}}>
                    New Customer?{' '}
                    <Link style={{color: 'black'}} to={redirect ? `/register?redirect=${redirect}` : '/register'}>
                        Register
                    </Link>
                </Col>            
            </Row>
                </Container>     
        </Form>

        </FormComponent>
        </div>    
    );
}

export default LoginScreen;
