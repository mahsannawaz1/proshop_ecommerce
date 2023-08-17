import React,{useState,useEffect} from 'react';

import { Link, redirect, useNavigate } from 'react-router-dom';
import {useDispatch,useSelector} from 'react-redux'
import { Row, Col, Form, Button } from 'react-bootstrap';
import Loader from '../components/common/Loader';
import Message from '../components/Message';
import { getUserDetail, updateUserDetail } from '../actions/userActions';
import { USER_RESET_PROFILE } from '../constants/userConstant';

function ProfileScreen() {
  const [name, SetName] = useState('')
  const [email, SetEmail] = useState('')
  const [password, SetPassword] = useState('')
  const [confirmPassword, SetConfirmPassword] = useState('')
  const [message, SetMessage] = useState('')

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin
  
  const userDetail = useSelector(state => state.userDetail)
  const { loading, user, error } = userDetail

  const userUpdateProfile = useSelector(state => state.userUpdateProfile)
  const { success } = userUpdateProfile

  const navigate = useNavigate()

  const dispatch = useDispatch()
  
  useEffect(() => {
    if (!userInfo) {
      navigate("/login")
    }
    else {
      if (!user || !user.name || success) {
        dispatch({type:USER_RESET_PROFILE})
        dispatch(getUserDetail('profile'))
      }
      else {
        SetEmail(user.email)
        SetName(user.name)
       
      }
    }
   
      
    
  }, [dispatch,user,userInfo])

  const submitHandler = (e) => {
    e.preventDefault()
    if (password != confirmPassword) {
      SetMessage('Passwords do not match')
    }
    else
    {
      dispatch(updateUserDetail(
        {
          'id': user._id,
          'name': name,
          'email': email,
          'password': password
        }
      ))
      SetMessage('')
    }
      
    
  }

  return (
    <Row>
      <Col md={3}>
        <h2>User Profile</h2>
        {message && <Message variant="danger">{message}</Message>}
      {error && <Message variant="danger">{error}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>

      <Form.Group controlId="name">
          <Form.Label>Name</Form.Label>
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
           
          onChange={(e) => SetPassword(e.target.value)}
          ></Form.Control>   
        </Form.Group>

        <Form.Group controlId="passwordConfirm">
        <Form.Label>ConfirmPassword</Form.Label>
        <Form.Control type="password"
          placeholder="Confirm Password"
            value={confirmPassword}
            
          onChange={(e) => SetConfirmPassword(e.target.value)}
          ></Form.Control>   
        </Form.Group>

        <Button type="submit" variant="primary" >Update</Button>
      </Form>
      </Col>
      
      <Col md={9}>
        <h2>My Orders</h2>
    </Col>
    </Row>
  );
}

export default ProfileScreen;