
import {
  CREATE_ORDER_FAIL,
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS
}
  from './../constants/orderConstant';
import axios from 'axios';
import { CART_CLEAR_ITEMS } from '../constants/cartConstant';


export const createOrder = (order) => async (dispatch,getState) => { 
  try {
    dispatch({
      type:CREATE_ORDER_REQUEST
    })
    const { userLogin:{userInfo} } = getState()
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization':`Bearer ${userInfo.token}`
      }
    }
    console.log(order)
    const { data } = await axios.post(
      `http://127.0.0.1:8000/api/orders/add/`,
      order,
      config 
    )

    dispatch({
      type:CREATE_ORDER_SUCCESS,
      payload:data
    })
    dispatch({
      type: CART_CLEAR_ITEMS,
      payload:data
      
    })
    

    localStorage.removeItem('cartItems')
    localStorage.setItem('userInfo', JSON.stringify(data))

  } catch (error) {
     dispatch({
      type: CREATE_ORDER_FAIL,
      payload:error.response && error.response.data.detail ? error.response.data.detail : error.message 
    })
  }
}

