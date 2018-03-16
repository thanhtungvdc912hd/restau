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
  GO_BACK,
} from './type';
import getRestaurantDetail from '../utils/getRestaurantDetail'
import getRestaurants from '../utils/getRestaurants'
import getTopRestaurants from '../utils/getTopRestaurants'
import login from '../utils/login'

export const counterIncrease = () => ({type:INCREASE})
export const counterDecrease = () => ({type:DECREASE})
export const goHome = (name) => ({type:HOME, name})
export const goRestaurantDetail = (restaurant) => ({type:RESTAURANT_DETAIL, restaurant})
export const goFoodDetail = (food) => ({type:FOOD_DETAIL, food})
export const goBranches = (branches) => ({type:BRANCHES, branches})
export const goFoods = (foods, isFood) => ({type:FOODS, foods, isFood})
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
export const fetchOK = (dataSource) => ({type:FETCH_OK, dataSource})
export const loginOK = (token) => ({type:LOGIN_OK, token})
export const fetchRestaurant = (dataSource) => ({type:FETCH_RESTAURANT, dataSource})
export const fetchKO = () => ({type:FETCH_KO})
export const goBack = () => ({type:GO_BACK})
export const saveCartThunk = (food, quantity) => {
  return dispatch => {
    dispatch(addFoodToCart(food, quantity))

  }
}

export const loginMyRestau = (email, password) => {
  return dispatch => {
    login(email, password)
    .then(res => {
      dispatch(loginOK(res))
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
