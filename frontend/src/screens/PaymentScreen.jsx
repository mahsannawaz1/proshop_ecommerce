import React,{ useState,useEffect } from 'react';
import { Button,Form,Col } from 'react-bootstrap';
import CheckoutSteps from '../components/CheckoutSteps';
import FormContainer from '../components/common/FormContainer';
import { useDispatch, useSelector } from 'react-redux';
import { savePaymentMethod } from './../actions/cartActions';
import { useNavigate } from 'react-router-dom';

function PaymentScreen() {
  const cart = useSelector(state=>state.cart)
  const { shippingAddress } = cart

  const [paymentMethod, SetPaymentMethod] = useState('PayPal')

  const dispatch = useDispatch()
  const navigate = useNavigate()
  
  if (!shippingAddress.address) {
    navigate('/shipping')
  }

  const submitHandler = (e) =>
  {
    e.preventDefault()
    console.log('submitted')
    dispatch(savePaymentMethod(paymentMethod))
    navigate('/placeorder')
  }

  return (  
    <FormContainer>
      <CheckoutSteps step1 step2 step3 />
      <Form onSubmit={submitHandler}>
        <Form.Group>
          <Form.Label as="legend">Select Method</Form.Label>
          <Col>
            <Form.Check
              type="radio"
              label="PayPal or Credit Card"
              id="paypal"
              name="paymentMethod"
              checked
              onChange={(e)=>SetPaymentMethod(e.target.value)}
            ></Form.Check>
          </Col>
        </Form.Group>
      <Button type="submit" variant="primary" className="my-2">Continue</Button>
      </Form>
    </FormContainer>
  );
}

export default PaymentScreen;