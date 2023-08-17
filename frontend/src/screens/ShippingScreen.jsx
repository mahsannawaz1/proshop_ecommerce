import React,{useState} from 'react';
import {useDispatch,useSelector} from 'react-redux'
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import FormContainer from '../components/common/FormContainer';
import CheckoutSteps from '../components/CheckoutSteps';
import { saveShippingAddress } from './../actions/cartActions';

function ShippingScreen() {
  const navigate=useNavigate()
  const cart = useSelector(state=>state.cart)
  const { shippingAddress } = cart

  const [address, SetAddress] = useState(shippingAddress.address)
  const [city, SetCity] = useState(shippingAddress.city)
  const [postalCode, SetPostalCode] = useState(shippingAddress.postalCode)
  const [country, SetCountry] = useState(shippingAddress.country)

  const dispatch = useDispatch()
  
  const submitHandler = (e) =>
  {
    e.preventDefault()
    console.log('submitted')
    dispatch(saveShippingAddress({
      'address':address,
      'city':city,
      'postalCode':postalCode,
      'country':country
    }))
    navigate('/payment')

  }
  return ( 
    <FormContainer>
      <CheckoutSteps step1 step2  />
      <h1>Shipping</h1>
      <Form onSubmit={submitHandler}>

      <Form.Group controlId="address">
          <Form.Label>Address</Form.Label>
          <Form.Control type="text"
            placeholder="Enter Address"
            value={address ? address : '' }
            required
            onChange={(e) => SetAddress(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="city">
          <Form.Label>City</Form.Label>
          <Form.Control type="text"
            placeholder="Enter City"
            value={city ? city : '' }
            required
            onChange={(e) => SetCity(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="postalCode">
          <Form.Label>Postal Code</Form.Label>
          <Form.Control type="text"
            placeholder="Enter Postal Code"
            value={postalCode ? postalCode : '' }
            required
            onChange={(e) => SetPostalCode(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="country">
          <Form.Label>Country</Form.Label>
          <Form.Control type="text"
            placeholder="Enter Country"
            value={country ? country : '' }
            required
            onChange={(e) => SetCountry(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type="submit" variant="primary" className="my-2">Continue</Button>

      </Form>
    </FormContainer>
    );
}

export default ShippingScreen;