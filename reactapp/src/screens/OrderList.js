import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Table, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { adminOrders } from '../actions/orderActions'

import SpinnerComponent from '../components/SpinnerComponent';
import Message from '../components/Message';

function OrderList() {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const orderList = useSelector(state => state.orderList)
    const { loading, error, orders } = orderList

    const userLogin = useSelector(state => state.userLogin)
    const { userInformation } = userLogin

    useEffect (() => {
        if (userInformation || !userInformation.isAdmin){
         dispatch(adminOrders())           
        }else {
            navigate('/login')
        }
    }, [dispatch, navigate, userInformation])

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
    
  return (
    <div>
      <h1 style = {{color: 'black', marginTop: '5px'}}>Orders</h1>
      {loading 
        ? (<SpinnerComponent />) 
        : error 
            ? (<Message variant='danger'>{error}</Message>) 
            : (
                <Table striped hover bordered responsive className='table-sm mt-4'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>User</th>
                            <th>Created at: </th>
                            <th>Total</th>
                            <th>Payment status</th>
                            <th>Delivery status</th>
                            <th>Order details</th>
                        </tr>
                    </thead>

                    <tbody>
                        {orders.map(order => (
                            <tr className='table-dark' key={order._id}>
                                <td>{order._id}</td>
                                <td>{order.user && order.user.name}</td>
                                <td>{formattedDate(order.orderDate)}</td>
                                <td>{order.totalPrice}LEI</td>

                                <td>{order.isPaid ? (
                                        formattedDate(order.paidAt)
                                    ) : (
                                        <i className='fas fa-times' style={{color: 'red'}}></i>
                                    )}
                                </td>

                                <td>{order.isDelivered ? (
                                        formattedDate(order.delivered)
                                    ) : (
                                        <i className='fas fa-times' style={{color: 'red'}}></i>
                                    )}
                                </td>
                                
                                <td>
                                    <LinkContainer to = {`/order/${order._id}`}>
                                        <Button variant='primary' className='btn-md'>
                                            Order details
                                        </Button>
                                    </LinkContainer>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}

    </div>
  )
}

export default OrderList
