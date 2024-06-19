import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Col, FormGroup, FormLabel, FormCheck } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import OrderProgress from '../components/OrderProgress'
import FormComponent from '../components/FormComponent';
import { savePayment } from '../actions/cartActions'

function Payment() {
    const cart = useSelector(state => state.cart)
    const { deliveryAddress } = cart

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [paymentMethod, setpaymentMethod] = useState(cart.paymentMethod || 'PayPal')

    if(!deliveryAddress.address) {
        navigate('/delivery')
    }

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(savePayment(paymentMethod))
        navigate('/placeorder')
    }


  return (
    <FormComponent>
        <OrderProgress step1 step2 step3/>
        <Form onSubmit={submitHandler}>
            <FormGroup>
                <FormLabel as='legend' style={{color: 'black'}}>
                    Select method
                </FormLabel>
                <Col>
                    <FormCheck type='radio' 
                    label='Paypal or Credit Card' 
                    id='paypal' 
                    style={{color: 'black', fontSize: 'large', margin: '10px'}}
                    name='paymentMethod' 
                    value='PayPal' 
                    onChange={(e) => (setpaymentMethod(e.target.value))}
                    >
                    </FormCheck>
                </Col>

                <Col>
                    <FormCheck type='radio' 
                    label='Cash on Delivery' 
                    id='cash' 
                    name='paymentMethod' 
                    style={{color: 'black', fontSize: 'large', margin: '10px'}}
                    value='Cash on Delivery' 
                    onChange={(e) => (setpaymentMethod(e.target.value))}
                    >
                    </FormCheck>
                </Col>
            </FormGroup>

            <Button type='submit' variant='primary' className='my-3'>Continue</Button>
        </Form>
    </FormComponent>
  )
}

export default Payment
