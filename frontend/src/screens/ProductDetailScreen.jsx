import React from 'react';
import { Link,useParams,useNavigate } from 'react-router-dom'; 
import { Row, Col, Image, ListGroup, Button, Card, Form, ListGroupItem } from 'react-bootstrap';
import Rating from '../components/common/Rating';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { productDetail } from '../actions/productAction';
import Loader from '../components/common/Loader';
import Message from '../components/Message';


function ProductDetailScreen() {
  const [qty,setQuantity]=useState(1)
  const { id } = useParams()
  const {loading,error,product} = useSelector(state=> state.productDetail)
  const dispatch = useDispatch()
  
  const navigate = useNavigate()
  
  useEffect(() => {
    dispatch(productDetail(id))
    
  }, [dispatch])
  const  addToCartHandler = () => {
    
    navigate(`/cart/${id}?qty=${qty}`)
  }
  return ( 
    <div>
      <Link to="/" className="btn btn-dark my-3 ">Go Back</Link>
      {
          loading ? <Loader />
          : error ? <Message variant="danger">{error}</Message> 
          : 
      <Row>
        <Col md={6}>
          <Image src={product.image} alt={ product.name } fluid/>
        </Col>
        <Col md={3}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h3>{ product.name }</h3>
            </ListGroup.Item>
            <ListGroup.Item>
              <Rating value={product.rating} text={`${product.numReviews} reviews`} color={"#f8e825" } />
            </ListGroup.Item>
            <ListGroup.Item>
              Price: ${ product.price }
            </ListGroup.Item>
            <ListGroup.Item>
              { product.description }
            </ListGroup.Item>

          </ListGroup>
        </Col>
        <Col md={3}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <Row>
                  <Col>
                    Price: 
                  </Col>
                  <Col>
                    <strong>${ product.price }</strong>
                  </Col>
                </Row>
              </ListGroup.Item>
              
              <ListGroup.Item>
                <Row>
                  <Col>
                    Status: 
                  </Col>
                   <Col>
                    {product.countInStock>0 ? 'In Stock' :'Out Of Stock'}
                  </Col>
                </Row>
                    </ListGroup.Item>
                    {product.countInStock > 0 &&
                      <ListGroupItem>
                        <Row>
                          <Col>Qty</Col>
                          <Col xs="auto" className="my-1">
                            <Form.Control
                              as="select"
                              value={qty}
                              onChange={(e) => setQuantity(e.target.value)}>
                              { [...Array(product.countInStock).keys()].map((val) => <option key={val+1} value={ val + 1 }>{ val + 1 }</option>
                              )
                              
                              }
                              {
                                console.log([...Array(product.countInStock).keys()])
                              }
                            </Form.Control>
                          </Col>
                          </Row>
                      </ListGroupItem>
                    }
              
              <ListGroup.Item style={{display:'flex',justifyContent:'center'}}>
                <Button className="btn-block" disabled={product.countInStock === 0 ? 'true' : ''} type="button" onClick={addToCartHandler}>Add to Cart</Button>
              </ListGroup.Item>

            </ListGroup>
          </Card>
        </Col>
      </Row>
      }
    </div>
   );
}

export default ProductDetailScreen;