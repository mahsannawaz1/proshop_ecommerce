import React, { useEffect, useState } from 'react';
import { Link, redirect, useNavigate } from 'react-router-dom';
import {useDispatch,useSelector} from 'react-redux'
import { Row, Col, Form, Button, Container } from 'react-bootstrap';
import Loader from '../components/common/Loader';
import Message from '../components/Message';
import { register } from './../actions/userActions';
import FormContainer from '../components/common/FormContainer';

export default function RegisterScreen() {
  const [name, SetName] = useState('')
  const [email, SetEmail] = useState('')
  const [password, SetPassword] = useState('')
  const [confirmPassword, SetConfirmPassword] = useState('')
  const [message, SetMessage] = useState('')

  const userRegister = useSelector(state => state.userRegister)
  const { loading, userInfo, error } = userRegister

  const navigate = useNavigate()

  const dispatch = useDispatch()
  
  useEffect(() => {
    if (userInfo) {
      navigate("/")
    }
   
      
    
  }, [userInfo,redirect])

  const submitHandler = (e) => {
    e.preventDefault()
    if (password != confirmPassword) {
      SetMessage('Passwords do not match')
    }
    else
    {
      dispatch(register(name,email, password))
    }
      
    
  }

  return (
    <Container>
      <h1>Sign Up</h1>
      {message && <Message variant="danger">{message}</Message>}
      {error && <Message variant="danger">{error}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>

      <Form.Group controlId="name">
          <Form.Label>Email Name</Form.Label>
          <Form.Control type="text"
            placeholder="Enter Name"
            value={name}
            required
            onChange={(e) => SetName(e.target.value)}
          ></Form.Control>
        </Form.Group>
        
      <Form.Group controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control type="email"
            placeholder="Enter Email"
            value={email}
            required
            onChange={(e) => SetEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="password">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password"
          placeholder="Enter Password"
            value={password}
            required
          onChange={(e) => SetPassword(e.target.value)}
          ></Form.Control>   
        </Form.Group>

        <Form.Group controlId="passwordConfirm">
        <Form.Label>ConfirmPassword</Form.Label>
        <Form.Control type="password"
          placeholder="Confirm Password"
            value={confirmPassword}
            required
          onChange={(e) => SetConfirmPassword(e.target.value)}
          ></Form.Control>   
        </Form.Group>

        <Button type="submit" variant="primary" >Sign Up</Button>
      </Form>

      <Row className="py-3">
        Have an account? <Link to={
          redirect ? `/login?redirect=${redirect}` : `/login`
        }>Login</Link>
      </Row>

    </Container>
  )
}
