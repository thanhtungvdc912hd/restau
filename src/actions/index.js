import {INCREASE, DECREASE, HOME, BRANCHES,
  RESTAURANT_DETAIL,
  FOOD_DETAIL,
  FETCH_KO,
  FETCH_OK,
  FETCH_RESTAURANT,
  START_FETCH,
  FOODS,
  ADD_CART_FOODS,
  UPDATE_CART,
  DELETE_FROM_CART,
  LOGIN_OK,
  LOGIN_KO,
  LOGOUT,
  GO_MENU,
  CHANGE_INFO,
  GO_BACK,
  GO_MAP,
  GET_MAP,
  SEARCH_RESTAU,
  ORDER_HISTORY,
  GALLERY,
  IMAGE_COMMENT,
  SET_LANGUAGE,
  ADD_COMMENT,
  GET_COMMENT,
  FETCH_COMMENT,
  AUTHENTICATION
} from './type';
import {AsyncStorage} from 'react-native'
import getRestaurantDetail from '../utils/getRestaurantDetail'
import getRestaurants from '../utils/getRestaurants'
import getTopRestaurants from '../utils/getTopRestaurants'
import login from '../utils/login'
import checkLogin from '../utils/checkLogin'
import getToken from '../utils/getToken'
import saveToken from '../utils/saveToken'
import refreshToken from '../utils/refreshToken'
import changeInfo from '../utils/changeInfo'
import getMenu from '../utils/getMenu'
import searchRestaurant from '../utils/searchRestaurant'
import getOrderHistory from '../utils/getOrderHistory'
import sendOrder from '../utils/sendOrder'
import getMap from '../utils/getMap'
import getComment from '../utils/getComment'
import saveImageComment from '../utils/saveImageComment'
import moment from 'moment';


export const counterIncrease = () => ({type:INCREASE})
export const counterDecrease = () => ({type:DECREASE})
export const goHome = (name) => ({type:HOME, name})
export const goRestaurantDetail = (restaurant) => ({type:RESTAURANT_DETAIL,restaurant})
export const goFoodDetail = (food) => ({type:FOOD_DETAIL, food})
export const goMyGallery = (imageId, images) => ({type:GALLERY, imageId, images})
export const goBranches = (branches) => ({type:BRANCHES, branches})
export const goFoods = (foods, isFood) => ({type:FOODS, foods, isFood})
export const goToFoods = () => ({type:FOODS, isFood: true})
export const goMenu = (foods, page) => ({type:GO_MENU, foods, page})
export const addComment = (comment) => ({type:ADD_COMMENT, comment})
export const getMyComment = (comments) => ({type:GET_COMMENT, comments})

export const addFoodToCart = (food, quantity) => ({
  type:ADD_CART_FOODS,
  payload: {
      food,
      quantity
    }
})
export const updateCart = (food, quantity) => ({
  type:UPDATE_CART,
  payload: {
      food,
      quantity
    }
  })
export const deleteFromCart = (food) => ({
  type:DELETE_FROM_CART,
  payload: {
      food
    }
  })
export const startFetch = () => ({type:START_FETCH})
export const myChangeInfo = (user) => ({type:CHANGE_INFO, user})
export const fetchOK = (dataSource) => ({type:FETCH_OK, dataSource})
export const loginOK = (token) => {
  return {type:LOGIN_OK, token}
}
export const logout = () => ({type:LOGOUT})
export const fetchRestaurant = (dataSource) => ({type:FETCH_RESTAURANT, dataSource})
export const fetchKO = () => ({type:FETCH_KO})
export const fetchComment = () => ({type:FETCH_COMMENT})
export const loginKO = (error) => ({type:LOGIN_KO, error})
export const goBack = () => ({type:GO_BACK})
export const getMapInfo = (location) => ({type:GET_MAP, location})

export const goMap = (restaurantName) => ({type:GO_MAP, restaurantName})
export const goAuthentication = () => ({type:AUTHENTICATION})
export const myOrderHistory = (orderHistory) => ({type:ORDER_HISTORY, orderHistory})
export const goSearchResult = (searchResult) => ({type:SEARCH_RESTAU, searchResult})
export const saveCartThunk = (food, quantity) => {
  return dispatch => {
    dispatch(addFoodToCart(food, quantity))
  }
}

export const logoutMyRestau = () => {
  return dispatch => {
    saveToken('')
    dispatch(logout())
  }
}

export function setLanguage(language) {
    AsyncStorage.setItem('@myLang', language.languageKey)
    return {
        type: SET_LANGUAGE,
        language
    };
}

export const loginMyRestau = (email, password) => {
  return dispatch => {
    login(email, password)
    .then(res => {
      if (res === "SAI_THONG_TIN_DANG_NHAP") {
        dispatch(loginKO(res))
      } else {
        dispatch(loginOK(res))
        saveToken(res.token)
        dispatch(goBack())
      }
    })
    .catch(err => console.log(err))
  }
}

export const checkLoginMyRestau = () => {
  return dispatch => {
    getToken()
    .then(res => {
      checkLogin(res)
      .then(res => dispatch(loginOK(res)))
    })
    .catch(err => console.log(err))
  }
}

export const getMyMenu = (restaurantId, page) => {
  return dispatch => {
    getMenu(restaurantId, page)
    .then(foods => foods ? dispatch(goMenu(foods, page)) : '')
    .then(page === 1 ? dispatch(goToFoods()) : '')
  }
}

export const getMyImageDetail = (imageId, images) => {
  return dispatch => {
    dispatch(startFetch())
    getToken()
    .then(res => {
      if (res != 'TOKEN_KHONG_HOP_LE') {
        dispatch(getImageComment(imageId))
        dispatch(goMyGallery(imageId, images))
      } else {
        dispatch(goAuthentication())
      }
    })
    .catch(err => console.log(err))
  }
}

export const getImageComment = (imageId) => {
  return dispatch => {
    dispatch(fetchComment())
    getComment(imageId)
    .then(comments => dispatch(getMyComment(comments)))
    .catch(err => console.log(err))
  }
}

export const saveMyImageComment = (imageId, userName, userImage, description) => {
  return dispatch => {
    getToken()
    .then(token => {
      const date = moment(new Date()).format("YYYY-MM-DD hh:mm:ss")
        saveImageComment(token, imageId, description, date)
        .then(res => {
          if (res === 'THANH_CONG') {
            dispatch(addComment({description: description, userName: userName, userImage: userImage, rate: 5, commentDate: date}))
          }
        })

    })
    .catch(err => console.log(err))
  }
}

export const refreshMyToken = () => {
  return dispatch => {
    getToken()
    .then(res => refreshToken(res))
    .catch(err => console.log(err))
  }
}

export const sendMyOrder = (orderDetail) => {
  return dispatch => {
    getToken()
    .then(res => sendOrder(res, orderDetail))
    .catch(err => console.log(err))
  }
}

export const getMyMap = (restaurant) => {
  return dispatch => {
    getMap(restaurant.address)
    .then(result => {
      dispatch(getMapInfo(result.results[0].geometry.location))
      dispatch(goMap(restaurant.name))
    })
    .catch(err => console.log(err))
  }
}

export const changeMyInfo = (name, tel, address, birthday) => {
  return dispatch => {
    getToken()
    .then(res => changeInfo(res, name, tel, address, birthday))
    .then(user => {
      dispatch(myChangeInfo(user))
      dispatch(goBack())
    })
    .catch(err => console.log(err))
  }
}

export const getMyOrderHistory = () => {
  return dispatch => {
    getToken()
    .then(res => getOrderHistory(res))
    .then(orderHistory => dispatch(myOrderHistory(orderHistory)))
    .catch(err => console.log(err))
  }
}

export const fetchRestaurantDetail = (restaurantId) => {
  return dispatch => {
    dispatch(startFetch())
    getRestaurantDetail(restaurantId)
    .then(restaurant => {
      dispatch(goRestaurantDetail(restaurant))
    })
    .catch(err => console.log(err))
  }
}

export const goMyRestaurantDetail = (restaurantId) => {
  return dispatch => {
    dispatch(startFetch())
    getRestaurantDetail(restaurantId)
    .then(restaurant => {
      dispatch(goRestaurantDetail(restaurant))
    })
    .catch(err => console.log(err))
  }
}

export const fetchRestaurants = (restaurantIds, isTop) => {
  return dispatch => {
    dispatch(startFetch())
    getRestaurants(restaurantIds, isTop)
    .then(dataSource => {
      dispatch(fetchOK(dataSource))

    })
    .catch(err => console.log(err))
  }
}

export const mySearchRestaurant = (restaurantName) => {
  return dispatch => {
    searchRestaurant(restaurantName)
    .then(searchResult => {
      dispatch(goSearchResult(searchResult))
    })
    .catch(err => console.log(err))
  }
}

export const fetchTopRestaurants = () => {
  return dispatch => {
    dispatch(startFetch())
    getTopRestaurants()
    .then(dataSource => {
      dispatch(fetchOK(dataSource))
    })
    .catch(err => console.log(err))
  }
}
