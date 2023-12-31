
import {
  CREATE_ORDER_FAIL,
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,

  CREATE_ORDER_RESET,
}
  from './../constants/orderConstant';

export const createOrderReducer = (state={},action) => {
  switch (action.type) {
    case CREATE_ORDER_REQUEST:
      return {
        loading: true
      }
    case CREATE_ORDER_SUCCESS:
      return {
        loading: false,
        success: true,
        order:action.payload
      }
    case CREATE_ORDER_FAIL:
        return {
          loading: false,
          error:action.payload
      }
      case CREATE_ORDER_RESET:
        return { }
    default:
      return state

  }
}
