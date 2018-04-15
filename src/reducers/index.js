import { combineReducers } from 'redux';
import { NavigationActions } from 'react-navigation';
import { AppNavigator } from '../navigators/AppNavigator';
import saveCart from '../utils/saveCart'
import getCart from '../utils/getCart'
import saveToken from '../utils/saveToken'
import getToken from '../utils/getToken'
import checkLogin from '../utils/checkLogin'
import languageConfig from '../config/languages/index'

import {INCREASE, DECREASE, HOME,BRANCHES, RESTAURANT_DETAIL,
  FETCH_KO,
  FETCH_OK,
  FETCH_BRANCH,
  START_FETCH,
  FETCH_RESTAURANT,
  FOODS,
  FOOD_DETAIL,
  ADD_CART_FOODS,
  UPDATE_CART,
  DELETE_FROM_CART,
  LOGIN_OK,
  LOGIN_KO,
  LOGOUT,
  GO_MENU,
  CHANGE_INFO,
  SEARCH_RESTAU,
  GO_BACK,
  GO_MAP,
  GO_COMMENT,
  GET_MAP,
  ORDER_HISTORY,
  GALLERY,
  IMAGE_COMMENT,
  IMAGE_COMMENT_ADD,
  ADD_COMMENT,
  GET_COMMENT,
  FETCH_COMMENT,
  DELETE_COMMENT,
  UPDATE_COMMENT,
  AUTHENTICATION,
  SET_LANGUAGE
} from '../actions/type';

const initialRoute = 'MyMain';

const initialState = AppNavigator.router.getStateForAction(
    NavigationActions.navigate({
        routeName: initialRoute
    })
);

function nav(state = initialState, action) {
  let nextState
  switch (action.type) {
    case GO_BACK:
        nextState = AppNavigator.router.getStateForAction(
          NavigationActions.navigate({routeName: 'Main'}),
          state
        );
        break;
    case GO_COMMENT:
        nextState = AppNavigator.router.getStateForAction(
          NavigationActions.navigate({routeName: 'CommentBox'}),
          state
        );
        break;
    case AUTHENTICATION:
        nextState = AppNavigator.router.getStateForAction(
          NavigationActions.navigate({routeName: 'Authentication'}),
          state
        );
        break;
    case HOME:
        nextState = AppNavigator.router.getStateForAction(
          NavigationActions.navigate({routeName: 'Main', params:{someKey: action.name}}),
          state
        );
        break;
    case RESTAURANT_DETAIL:
        nextState = AppNavigator.router.getStateForAction(
          NavigationActions.navigate({ routeName: 'RestaurantDetail', params:{restaurant: action.restaurant}}),
          state
          );
        break;
    case FOOD_DETAIL:
        nextState = AppNavigator.router.getStateForAction(
          NavigationActions.navigate({ routeName: 'FoodDetail', params:{food: action.food}}),
          state
          );
        break;
    case GO_MAP:
        nextState = AppNavigator.router.getStateForAction(
          NavigationActions.navigate({ routeName: 'MapInfo', params:{name: action.restaurantName}}),
          state
          );
        break;
    case GALLERY:
        nextState = AppNavigator.router.getStateForAction(
              NavigationActions.navigate({ routeName: 'Gallery', params:{imageId: action.imageId, images: action.images}}),
              state
              );
            break;
    case BRANCHES:
        nextState = AppNavigator.router.getStateForAction(
          NavigationActions.navigate({ routeName: 'Restaurants', params:{restaurants: action.branches}}),
          state
          );
        break;
    case FOODS:
        const myRouteName = action.isFood ? 'Foods' : 'Orders'
        nextState = AppNavigator.router.getStateForAction(
          NavigationActions.navigate({ routeName: myRouteName, params:{foods: action.foods}}),
          state
          );
        break;

    default:
      nextState = AppNavigator.router.getStateForAction(action, state);
      break;
  }

  // Simply return the original `state` if `nextState` is null or undefined.
  return nextState || state;
}

const initialStateCart = {
  foods: [],
};

function cart(state = initialStateCart, action) {

  switch (action.type) {
    case ADD_CART_FOODS:
    const myFoodsAdd = [...state.foods, action.payload]
    saveCart(myFoodsAdd)
      return {
        ...state,
        foods: myFoodsAdd
      }
    case UPDATE_CART:
    const myFoodsUpdate = state.foods.map(item => item.food.id === action.payload.food.id ? action.payload : item)
    saveCart(myFoodsUpdate)
      return {
        ...state,
        foods: myFoodsUpdate
      }
    case DELETE_FROM_CART:
    const myFoods = state.foods.filter(item => item.food.id !== action.payload.food.id)
    saveCart(myFoods)
      return {
        ...state,
        foods: myFoods
      }
    default:
      getCart()
      .then(cart => state.foods = cart)
      return state
  }
}

const initialStateComment = {
  isLoading: false,
  comments: [],
  selectedComment: null
};

function comment(state = initialStateComment, action) {
  switch (action.type) {
    case FETCH_COMMENT:
      return {
        ...state,
        isLoading: true,
      }
    case GET_COMMENT:
      return {
        ...state,
        isLoading: false,
        comments: action.comments
      }
    case ADD_COMMENT:
      const myComments = state.comments.concat(action.comment)
      return {
        ...state,
        comments: myComments
      }
    case UPDATE_COMMENT:
      const found = state.comments.find(item => item.id === action.commentId)
      return {
        ...state,
        isLoading: false,
        selectedComment: found
      }
    case DELETE_COMMENT:
      return {
        ...state,
        isLoading: false,
        comments: state.comments.filter(item => item.id !== action.commentId)
      }
    default:
      return state
  }
}

const initialStateDatabase = {
  isLoading: false,
  restaurants: null,
  topPromotions: null,
  myRestauBranch: null,
  error: false,
  foods: [],
  searchResult: [],
  orderHistory: [],
  comments: []
}

function api(state = initialStateDatabase, action) {
  switch (action.type) {
    case START_FETCH:
        return  {
          ...state,
          isLoading: true
        }
    case FETCH_OK:
        return {
          ...state,
          isLoading: false,
          restaurants: action.dataSource.restaurants,
          topPromotions: action.dataSource.topPromotions
        }
    case FETCH_RESTAURANT:
        return {
          ...state,
          isLoading: false,
          myRestauBranch: action.dataSource
        }
    case GO_MENU:
        const myFoods = action.page === 1 ? action.foods : action.foods.concat(state.foods)
        return {
          ...state,
          foods: myFoods
        }
    case ORDER_HISTORY:
        return {
          ...state,
          orderHistory: action.orderHistory
        }
    case SEARCH_RESTAU:
        return {
          ...state,
          searchResult: action.searchResult
        }
    case IMAGE_COMMENT:
        return {
          ...state,
          isLoading: false,
          comments: action.comments
        }
    case IMAGE_COMMENT_ADD:
        const myComments = action.comments.concat(state.comment)
        return {
          ...state,
          isLoading: false,
          comments: myComments
        }
    case FETCH_KO:
        return {
          ...state,
          error: true
        }
    default:
      return state
  }
}

const initialStateMap = {
  location: {
    lat: 0,
    lng:0
  },
  isReady: false
}

function map(state = initialStateMap, action) {
  switch (action.type) {
    case GET_MAP:
        return  {
          location: action.location,
          isReady: true
        }
    default:
      return state
  }
}

const initialStateAuth = {
  user: null,
  token: null,
  isLogged: false,
  error: null
}

function auth(state = initialStateAuth, action) {
  switch (action.type) {
    case LOGIN_OK:
        return {
          ...state,
          isLogged: action.token ? true : false,
          user: action.token ? action.token.user : null,
          token: action.token ? action.token.token : null
        }
    case LOGIN_KO:
        return {
          ...state,
          error: action.error
        }
    case LOGOUT:
        return {
          ...state,
          user: null,
          token: null,
          isLogged: false,
        }
    case CHANGE_INFO:
        return {
          ...state,
          user: action.user,
        }
    default:
      return state
  }
}

const initialStateLanguage = {
  language: languageConfig[1]
}

function language(state = initialStateMap, action) {
  switch (action.type) {
    case SET_LANGUAGE:
        return  {
          language: action.language
        }
    default:
      return state
  }
}

const AppReducer = combineReducers({
  nav,
  cart,
  api,
  auth,
  map,
  language,
  comment
});

export default AppReducer;
