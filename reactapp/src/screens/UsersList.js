import React, { useState, useEffect } from 'react';
import { LinkContainer, useLocation, useNavigate } from 'react-router-bootstrap';
import { Table, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import SpinnerComponent from '../components/SpinnerComponent';
import Message from '../components/Message';
import { listUsers } from '../actions/userActions'

function UsersList() {
    const dispatch = useDispatch()
    const usersList = useSelector(state => state.usersList)
    const { loading, error, users } = usersList

    useEffect (() => {
        dispatch(listUsers())
    },[dispatch])

  return (
    <div>
      <h1>User list: </h1>
      {loading ? (<SpinnerComponent />) : error ? (<Message variant= 'danger'>{error}</Message>) : (
        <h1>ceva</h1>
      )}
    </div>
  )
}

export default UsersList
