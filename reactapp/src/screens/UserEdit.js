import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Form, Button, Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import SpinnerComponent from '../components/SpinnerComponent';
import Message from '../components/Message';
import FormComponent from '../components/FormComponent';
import { getUserDetails, updateUserData } from '../actions/userActions'
import { USER_UPDATE_DATA_RESET, USER_UPDATE_DATA_SUCCESS } from '../constants/userConstants'

function UserEdit() {
    const userId  = useParams() //extrage params din URL si ii pune intr-un obj, pentru a accesa orice param def pt ruta direct din obj

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [isAdmin, setAdmin] = useState(false)

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const userDetails = useSelector((state) => state.userDetails)
    const { error, loading, user } = userDetails

    const userUpdate = useSelector((state) => state.userUpdate)
    const { error: errorUpdate, loading: loadingUpdate, success: successUpdate } = userUpdate

    
    useEffect(() => {
        if (successUpdate) {
            dispatch({type: USER_UPDATE_DATA_SUCCESS})
            navigate('/admin/userlist')
            dispatch({type: USER_UPDATE_DATA_RESET})
        } else {
        if (user.id !== Number(userId.id)) {
            dispatch(getUserDetails(userId.id))
        } else {
            setName(user.name)
            setEmail(user.email)
            setAdmin(user.isAdmin)
        }}
        
    }, [dispatch, user, userId, successUpdate, navigate ])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updateUserData({id: user.id, name, email, isAdmin}))
    }

    const [buttonColor, setButtonColor] = useState('purple');
    
    return (
    <div>
        <Button variant='secondary' className='rounded mt-5 ms-5 px-4'><Link to='/admin/userlist' style={{'textDecoration': 'none', 'color': 'black'}}>Back</Link></Button>

        <Container sm={2} className='d-flex justify-content-center align-items-center' style={{marginTop: '10px'}}>
            <FormComponent>
                <h1 className='text-center' style={{color: 'black'}}>Edit User</h1>
                {loadingUpdate && <SpinnerComponent /> }
                {errorUpdate && <Message variant='danger'>{error}</Message>}
                {successUpdate && <Message variant='success'>YES</Message>}
                {loading ? <SpinnerComponent /> : error ? <Message variant='danger'>{error}</Message>
                 : (
                <Form onSubmit={submitHandler}>

                <Form.Group controlId='name'>
                        <Form.Label style={{color: 'black', fontSize: 'large'}}>Name</Form.Label>
                        <Form.Control style={{ borderRadius: '10px' , marginTop: '10px'}}
                            type='name'
                            placeholder='Enter Name'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        ></Form.Control>
                    </Form.Group>

                    <Form.Group controlId='email' className='mt-2'>
                        <Form.Label style={{color: 'black', fontSize: 'large'}}>Email Address</Form.Label>
                        <Form.Control style={{borderRadius: '10px' , marginTop: '10px'}}
                            type='email'
                            required
                            placeholder='Enter Email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        ></Form.Control>
                    </Form.Group>

                    <Form.Group controlId='isAdmin'>
                        <Form.Check style={{borderRadius: '10px', marginTop: '10px', color: 'black', fontSize: 'large'}}
                            type='checkbox'
                            label='Admin'
                            required
                            checked={isAdmin}
                            onChange={(e) => setAdmin(e.target.checked)}
                        ></Form.Check>
                    </Form.Group>
                    <Container className='d-flex flex-column justify-content-center align-items-center'>
                        <Button type='submit' variant='primary' className='mt-3' 
                        style={{backgroundColor: buttonColor, color: 'white', border: 'none', width: '30%', borderRadius: '10px' }}
                        onClick={() => setButtonColor(buttonColor === 'purple' ? 'green' : 'purple')}>
                            Update
                        </Button>
                    </Container>
                </Form>
            )}
            </FormComponent>
        </Container>
    </div>
    );
}

export default UserEdit
