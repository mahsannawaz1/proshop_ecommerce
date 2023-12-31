import React,{useEffect} from 'react';
import { Link, useParams, useSearchParams,useNavigate } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Button, Card, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from './../components/Message';
import Loader from './../components/common/Loader';
import { addToCart,removeFromCart } from '../actions/cartActions';

function CartScreen() {
  const {id} = useParams()
  const [searchParams] = useSearchParams();
  
  const qty = searchParams.get('qty') ? searchParams.get('qty') : 1
  const dispatch = useDispatch()
  const cart = useSelector(state => state.cart)
  const { cartItems } = cart

  const userLogin = useSelector(state => state.userLogin)
  const {userInfo} = userLogin
  
  const navigate = useNavigate()
  useEffect(() => {
    if (id) {
      dispatch(addToCart(id, qty))
    }
  }, [dispatch, id, qty])
  
  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id))
    
  }
  const checkoutHandler = () => {
    if (userInfo) {
      navigate(`/shipping`)
    }
    else {
      navigate(`/login?redirect=shipping`)
    }
    
  }

  return ( 
    <Row>
      <Col md={8}>
        <h1>Shopping Cart</h1>
        {cartItems.length === 0 ?
          <Message variant="info">Shopping Cart is Empty <Link to="/">Go Back</Link></Message> :
          (<ListGroup variant="flush">
            {cartItems.map(item => (
              <ListGroup.Item key={item.product}>
                <Row>
                  <Col md={2}>
                    <Image src={item.image} alt={item.name} fluid rounded/>
                  </Col>
                  <Col md={3}>
                    <Link to={`/products/${item.product}`} >{ item.name }</Link>
                  </Col>
                  <Col md={2}>
                    ${item.price}
                  </Col>
                  <Col md={3}>

                  <Form.Control
                              as="select"
                              value={item.qty}
                              onChange={(e) => dispatch(addToCart(item.product,Number(e.target.value)))}>
                              { [...Array(item.countInStock).keys()].map((val) => <option key={val+1} value={ val + 1 }>{ val + 1 }</option>
                              )
                              
                              }
                              {
                                console.log([...Array(item.countInStock).keys()])
                              }
                            </Form.Control>

                  </Col>
                  <Col md={1}>
                    <Button onClick={()=> removeFromCartHandler(item.product)} type="button" variant="light">
                      <i className="fas fa-trash" ></i>
                    </Button>
                  </Col>
                    </Row>
                </ListGroup.Item>
              ))}
          </ListGroup>)
        }
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)}) items </h2>
              ${cartItems.reduce((acc,item)=>acc + item.qty * item.price ,0).toFixed(2)}
            </ListGroup.Item>
            
            <ListGroup.Item>
              <Button onClick={checkoutHandler} type="button" className="btn-block" disabled={cartItems.length===0}>Proceed to Checkout</Button>
            </ListGroup.Item>

          </ListGroup>
          
        </Card>
      </Col>
    </Row>
   );
}

export default CartScreen;
