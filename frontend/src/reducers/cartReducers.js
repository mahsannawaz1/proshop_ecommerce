import { ADD_CART_ITEM, DELETE_CART_ITEM } from "../constants/cartConstant";


export const cartReducer = (state = { cartItems: [] }, action) => {
  
  switch (action.type) {
    case ADD_CART_ITEM:
      const item = action.payload
      const existItem = state.cartItems.find(i => i.product == item.product)
      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map(x=>
            x.product === existItem.product ? item : x)
        }
      }
      else {
        return {
          ...state,
          cartItems:[...state.cartItems,item] 
        }
      }
    case DELETE_CART_ITEM:
      return {
        ...state,
        cartItems:state.cartItems.filter(item => item.product !== action.payload)
      }
    
      
  
    default:
      return state;
  }
}