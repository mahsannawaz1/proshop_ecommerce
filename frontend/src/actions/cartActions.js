import { ADD_CART_ITEM, DELETE_CART_ITEM } from "../constants/cartConstant";
import axios from 'axios';

export const addToCart= (productId, qty) => async(dispatch,getState) => {
  const { data } = await axios.get(`http://127.0.0.1:8000/api/products/${productId}/`)
  dispatch({
    type: ADD_CART_ITEM,
    payload: {
      product: data._id,
      name: data.name,
      image: data.image,
      price: data.price,
      countInStock: data.countInStock,
      qty
    }
  })
  localStorage.setItem('cartItems',JSON.stringify(getState().cart.cartItems))
}

export const removeFromCart= (productId) => async(dispatch,getState) => {
  dispatch({
    type: DELETE_CART_ITEM,
    payload: productId
  })
  localStorage.setItem('cartItems',JSON.stringify(getState().cart.cartItems))
}