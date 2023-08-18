import React, { useState, useEffect } from 'react';
import {useDispatch,useSelector} from 'react-redux'
import { Row,Col,ListGroup,Image,Card, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import FormContainer from '../components/common/FormContainer';
import CheckoutSteps from '../components/CheckoutSteps';
import Message from './../components/Message';
import { createOrder } from '../actions/orderActions';
import { CREATE_ORDER_RESET } from '../constants/orderConstant';



function PlaceOrderScreen() {

  const orderCreate = useSelector(state => state.orderCreate)
  const { order,success,error } = orderCreate
  
  const cart = useSelector(state => state.cart)
  const { cartItems, shippingAddress, paymentMethod } = cart

  let itemsPrice=0
  for (var i = 0; i < cartItems.length; i++) { 
      itemsPrice += Number(cartItems[i].qty * cartItems[i].price)
  } 
  let shippingPrice = ((itemsPrice < 100) ? 10 : 0)
  let taxPrice = (itemsPrice * 0.25)
  let totalPrice = (itemsPrice + shippingPrice + taxPrice)
  const navigate=useNavigate()
  const dispatch = useDispatch()

  const placeOrderHandler = () => {
    dispatch(createOrder({
      orderItems: cartItems,
      shippingAddress: shippingAddress,
      paymentMethod: paymentMethod,
      itemsPrice: itemsPrice,
      shippingPrice: shippingPrice,
      taxPrice: taxPrice,
      totalPrice: totalPrice
    }))
  }
  useEffect(() => {
    if (!paymentMethod) {
      console.log('Hello')
      navigate('/payment')
    }
    if (success) {
      console.log(order)
      dispatch({
        type:CREATE_ORDER_RESET
      })

    }
  },[success])
  return ( 
    <div>
      <CheckoutSteps step1 step2 step3 step4 />
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>
                  Shipping: {shippingAddress.address}, {shippingAddress.city}
                  {'   '}
                  {shippingAddress.postalCode},
                  {'   '}
                  {shippingAddress.country}
                </strong>
              </p>
            </ListGroup.Item>
            
            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong>
                  Method: {paymentMethod}
                </strong>
              </p>
            </ListGroup.Item>
            
            <ListGroup.Item>
              <h2>Order Items</h2>
              {
                cartItems.length === 0 ? <Message variant="info">Your cart is empty</Message> :
                  (
                    <ListGroup variant="flush">
                      {cartItems.map((item, index) => (
                        <ListGroup.Item key={index}>
                          <Row>
                            <Col md={1}>
                              <Image src={item.image} alt={item.name} fluid rounded />
                            </Col>
                            <Col>
                              <Link to={`/products/${item.product}`}>{item.name}</Link>
                            </Col>
                            <Col md={4}>
                              {item.qty}x ${item.price} = ${(item.qty * item.price).toFixed(2)}
                            </Col>
                          </Row>
                        </ListGroup.Item>
                      ))}

                    </ListGroup>
                )
              }
              </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">

              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Item:</Col>
                  <Col>${ itemsPrice.toFixed(2)  }</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Shipping:</Col>
                  <Col>${ shippingPrice.toFixed(2)   }</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Tax:</Col>
                  <Col>${ taxPrice.toFixed(2)   }</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Total:</Col>
                  <Col>${ totalPrice.toFixed(2)  }</Col>
                </Row>
              </ListGroup.Item>
              
              <ListGroup.Item>
                {error && <Message variant="danger">{ error }</Message>}
              </ListGroup.Item>

              <ListGroup.Item>
                <Button
                  type="button"
                  className="btn-block"
                  disabled={cartItems.length === 0}
                  onClick={placeOrderHandler}
                >Place Order</Button>
              </ListGroup.Item>

            </ListGroup>
          </Card>
        </Col>
      </Row>
    </div>
   );
}

export default PlaceOrderScreen;
