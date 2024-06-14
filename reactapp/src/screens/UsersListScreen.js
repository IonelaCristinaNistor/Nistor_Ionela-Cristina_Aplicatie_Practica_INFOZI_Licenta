import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Table, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { listUsers, deleteUser } from '../actions/userActions'

import SpinnerComponent from '../components/SpinnerComponent';
import Message from '../components/Message';

function UsersListScreen() {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const userList = useSelector(state => state.userList)
    const { loading, error, users } = userList

    //const userLogin = useSelector(state => state.userLogin)
    //const { userInformation } = userLogin

    const userDelete = useSelector(state => state.userDelete)
    const { success: successDelete } = userDelete

    useEffect (() => {
        dispatch(listUsers())
    }, [dispatch, navigate,successDelete])

    const deleteActionHandler = (id) => {
        if(window.confirm('Are you sure you want to permanently delete this user?')) {
            dispatch(deleteUser(id))   
        }
    }
    
  return (
    <div>
      <h1>USERS</h1>
      {loading 
        ? (<SpinnerComponent />) 
        : error 
            ? (<Message variant='danger'>{error}</Message>) 
            : (
                <Table striped hover bordered responsive className='table-sm mt-4'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Admin</th>
                            <th style={{'color': 'purple'}}>Edit</th>
                        </tr>
                    </thead>

                    <tbody>
                        {users.map(user => (
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.isAdmin ? (
                                    <i className='fas fa-check' style={{color: 'green'}}></i>
                                ) : (
                                    <i className='fas fa-times' style={{color: 'red'}}></i>
                                )}
                                </td>
                                
                                <td>
                                    <LinkContainer to = {`/admin/user/${user.id}/edit`}>
                                        <Button variant='' className='btn-sm'>
                                            <i className='fas fa-pen' style={{color: 'purple'}}></i>
                                        </Button>
                                    </LinkContainer>

                                    <Button variant='danger' className='btn-sm' onClick = {() => deleteActionHandler(user.id)}>
                                        <i className='fas fa-trash'></i>
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}

    </div>
  )
}

export default UsersListScreen
