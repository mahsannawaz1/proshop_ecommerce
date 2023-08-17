import {
  ADD_CART_ITEM,
  DELETE_CART_ITEM,
  CART_SAVE_SHIPPING_ADDRESS,
  CART_SAVE_PAYMENT_METHOD,
} from "../constants/cartConstant";


export const cartReducer = (state = { cartItems: [],shippingAddress:{} }, action) => {
  
  switch (action.type) {
    case ADD_CART_ITEM:
      const item = action.payload
      console.log(item)
      const existItem = state.cartItems.find(i => i.product == item.product)
      console.log(window.location.href)
      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map(x => {
            if (x.product === existItem.product) {
           
            
              let qty = Number(x.qty) + Number(item.qty)
              if (qty > x.countInStock) {
                qty=x.countInStock
              }
              x.qty=qty
              return x
            }
            else {
              return x
            }
          })
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
    case CART_SAVE_SHIPPING_ADDRESS:
      return {
        ...state,
        shippingAddress:action.payload
      }
    case CART_SAVE_PAYMENT_METHOD:
        return {
          ...state,
          paymentMethod:action.payload
        }
    
      
  
    default:
      return state;
  }
}