import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,

  USER_LOGOUT,

  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,

  USER_DETAIL_FAIL,
  USER_DETAIL_REQUEST,
  USER_DETAIL_SUCCESS,

  USER_RESET_DETAIL,

  USER_UPDATE_PROFILE_FAIL,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,

  USER_RESET_PROFILE,
}
  from "../constants/userConstant";


export const userLoginReducer = (state = { }, action) => {
  
    switch (action.type) { 
  
      case USER_LOGIN_REQUEST:
        return { loading: true }
      
      case USER_LOGIN_SUCCESS:
        return { loading: false, userInfo:action.payload }
      
      case USER_LOGIN_FAIL:
        return { loading: false, error: action.payload }
      
      case USER_LOGOUT:
        return {
            loading:false
          }
      
      default:
        return state
      
    }
}
  

export const userRegisterReducer = (state = { }, action) => {
  
  switch (action.type) { 

    case USER_REGISTER_REQUEST:
      return { loading: true }
    
    case USER_REGISTER_SUCCESS:
      return { loading: false, userInfo:action.payload }
    
    case USER_REGISTER_FAIL:
      return { loading: false, error: action.payload }
    
    case USER_LOGOUT:
      return {
          loading:false
        }
    
    default:
      return state
    
  }
}


export const userDetailReducer = (state = { user:{} }, action) => {
  
  switch (action.type) { 

    case USER_DETAIL_REQUEST:
      return {...state, loading: true }
    
    case USER_DETAIL_SUCCESS:
      return { loading: false, user:action.payload }
    
    case USER_DETAIL_FAIL:
      return { loading: false, error: action.payload }
    case USER_RESET_DETAIL:
      return {user:{}}
    
    default:
      return state
    
  }
}

export const userUpdateReducer = (state = {  }, action) => {
  
  switch (action.type) { 

    case USER_UPDATE_PROFILE_REQUEST:
      return {...state, loading: true }
    
    case USER_UPDATE_PROFILE_SUCCESS:
      return { loading: false,success:true, userInfo:action.payload }
    
    case USER_UPDATE_PROFILE_FAIL:
      return { loading: false, error: action.payload }
    case USER_RESET_PROFILE:
      return {}
    
    default:
      return state
    
  }
}