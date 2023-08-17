import React, { useEffect, useState } from 'react';
import { Link, redirect, useNavigate } from 'react-router-dom';
import {useDispatch,useSelector} from 'react-redux'
import { Row, Col, Form, Button } from 'react-bootstrap';
import Loader from '../components/common/Loader';
import Message from '../components/Message';
import { login } from './../actions/userActions';
import FormContainer from '../components/common/FormContainer';

function LoginScreen() {
  const [email, SetEmail] = useState('')
  const [password, SetPassword] = useState('')
  const userLogin = useSelector(state => state.userLogin)
  const { loading, userInfo, error } = userLogin
  const navigate = useNavigate()
  const dispatch=useDispatch()
  useEffect(() => {
    if (userInfo) {
      navigate("/")
    }
   
      
    
  }, [userInfo,redirect])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(login(email, password))
    
  }
  return ( 
    <FormContainer>
      <h1>Sign In</h1>
      {error && <Message variant="danger">{error}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>

        <Form.Group controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => SetEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="password">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => SetPassword(e.target.value)}
          ></Form.Control>   
        </Form.Group>

        <Button type="submit" variant="primary" >Sign In</Button>

      </Form>

      <Row className="py-3">
        New Customer? <Link to={
          redirect ? `/register?redirect=${redirect}` : `/register`
        }>Register</Link>
      </Row>
    </FormContainer>
   );
}

export default LoginScreen;