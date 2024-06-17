import React from 'react'
import { Button, Nav, NavItem } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

function OrderProgress({ step1, step2, step3, step4}) {
  return (
    <Nav className='justify-content-center mb-4 mt-1'>
        <NavItem>
            { step1 ? (
                <LinkContainer to='/login' style={{color: 'black'}}>
                    <Button variant='outline-primary' className='rounded-pill mx-3'>Login</Button>
                </LinkContainer>
            )  : (
                <Button variant='outline-primary' className='rounded-pill  mx-3' disabled>Login</Button>
            )}
        </NavItem>

        <h3><i className='fas fa-arrow-right' style={{color: 'purple'}}></i></h3>

        <NavItem>
            { step2 ? (
                <LinkContainer to='/delivery' style={{color: 'black'}}>
                    <Button variant='outline-primary' className='rounded-pill mx-3'>Delivery</Button>
                </LinkContainer>
            )  : (
                <Button variant='outline-primary' className='rounded-pill  mx-3' disabled>Delivery</Button>
            )}
        </NavItem>

        <h3><i className='fas fa-arrow-right' style={{color: 'purple'}}></i></h3>

        <NavItem>
            { step3 ? (
                <LinkContainer to='/payment' style={{color: 'black'}}>
                    <Button variant='outline-primary' className='rounded-pill  mx-3'>Payment</Button>
                </LinkContainer>
            )  : (
                <Button variant='outline-primary' className='rounded-pill  mx-3' disabled>Payment</Button>
            )}
        </NavItem>

        <h3><i className='fas fa-arrow-right' style={{color: 'purple'}}></i></h3>

        <NavItem>
            { step4 ? (
                <LinkContainer to='/placeorder'  style={{color: 'black'}}>
                    <Button variant='outline-primary' className='rounded-pill  mx-3'>Place Order</Button>
                </LinkContainer>
            )  : (
                <Button variant='outline-primary' className='rounded-pill  mx-3' disabled>Place Order</Button>
            )}
        </NavItem>
    </Nav>
  )
}

export default OrderProgress
