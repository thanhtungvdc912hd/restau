import { combineReducers } from 'redux';
import { NavigationActions } from 'react-navigation';
import { AppNavigator } from '../navigators/AppNavigator';
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
  DELETE_FROM_CART
} from '../actions/type';
// Start with two routes: The Main screen, with the Login screen on top.
//const firstAction = AppNavigator.router.getActionForPathAndParams('MyMain');
//const tempNavState = AppNavigator.router.getStateForAction(firstAction);
const initialRoute = 'MyMain';

const initialState = AppNavigator.router.getStateForAction(
    NavigationActions.navigate({
        routeName: initialRoute
    })
);

function nav(state = initialState, action) {
  let nextState
  switch (action.type) {
    case 'GO_BACK':
        nextState = AppNavigator.router.getStateForAction(
          NavigationActions.goBack(),
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
      return {
        ...state,
        foods: [...state.foods, action.payload]
      }
    case UPDATE_CART:
      return {
        ...state,
        foods: state.foods.map(item => item.food.id === action.payload.food.id ? action.payload : item)
      }
    case DELETE_FROM_CART:
      return {
        ...state,
        foods: state.foods.filter(item => item.food.id !== action.payload.food.id)
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
  error: false
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
    case FETCH_KO:
        return {
          ...state,
          error: true
        }
    default:
      return state
  }
}

const AppReducer = combineReducers({
  nav,
  cart,
  api
});

export default AppReducer;