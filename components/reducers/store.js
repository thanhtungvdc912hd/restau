import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

const defaultState = {
  cityName: null,
  temp: null,
  isLoading: false,
  error: false
}

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'START_FETCH':
      return {
        ...state,
        isLoading: true
      }
    case 'FETCH_OK':
      return {
        ...state,
        isLoading: false,
        temp: action.temp,
        cityName: action.cityName
      }
    case 'FETCH_KO':
      return {
        ...state,
        error: true
      }
    default:
      return state
  }
}

const store = createStore(reducer, applyMiddleware(thunk))

export default store
