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
  SEARCH_RESTAU,
} from './type';
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

export const counterIncrease = () => ({type:INCREASE})
export const counterDecrease = () => ({type:DECREASE})
export const goHome = (name) => ({type:HOME, name})
export const goRestaurantDetail = (restaurant) => {
return {
  type:RESTAURANT_DETAIL,
  restaurant
}}
export const goFoodDetail = (food) => ({type:FOOD_DETAIL, food})
export const goBranches = (branches) => ({type:BRANCHES, branches})
export const goFoods = (foods, isFood) => ({type:FOODS, foods, isFood})
export const goToFoods = () => ({type:FOODS, isFood: true})
export const goMenu = (foods, page) => ({type:GO_MENU, foods, page})
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
export const loginKO = (error) => ({type:LOGIN_KO, error})
export const goBack = () => ({type:GO_BACK})
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

export const refreshMyToken = () => {
  return dispatch => {
    getToken()
    .then(res => refreshToken(res))
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
