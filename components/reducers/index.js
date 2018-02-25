import { AppNavigator } from '../navigators/AppNavigator'
import { NavigationActions } from 'react-navigation'
import { combineReducers } from 'redux'

//const initialAction = { type: NavigationActions.Init }
const initialWords = [
    {id: 1, en: "action", vn: "hanh dong", saved: true, isShow: false},
    {id: 2, en: "love", vn: "tinh yeu", saved: true, isShow: true},
    {id: 3, en: "horror", vn: "kinh di", saved: false, isShow: true},
    {id: 4, en: "horror1", vn: "kinh di", saved: false, isShow: true},
    {id: 5, en: "horror2", vn: "kinh di", saved: false, isShow: false},
    {id: 6, en: "horror3", vn: "kinh di", saved: false, isShow: true},
    {id: 7, en: "horror4", vn: "kinh di", saved: true, isShow: false},
    {id: 8, en: "horror5", vn: "kinh di", saved: false, isShow: true},
    {id: 9, en: "horror6", vn: "kinh di", saved: false, isShow: true},
    {id: 10, en: "horror7", vn: "kinh di", saved: false, isShow: false},
    {id: 11, en: "horror8", vn: "kinh di", saved: false, isShow: true},
  ]
//AppNavigator.router.getStateForAction(initialAction)
// const AppReducer = (state = initialState, action) => {
//   //let nextState = AppNavigator.router.getStateForAction(action, state)

//   // Simply return `state` if `nextState` is null or undefined
//   return state//nextState || state;
// }

const isAddingReducer = (state = false, action) => {
  if(action.type === 'ADDING') return !state
  return state
}

const filterStatusReducer = (state = 'SHOW_ALL', action) => {
  switch (action.type) {
      case "FILTER_SHOW_ALL":
        return 'SHOW_ALL'

      case "FILTER_SHOW_SAVED":
        return 'SHOW_SAVED'

      case "FILTER_SHOW_ISSHOW":
        return 'SHOW_ISSHOW'

      default:
        return state
  }
}

const wordsReducer =(state = initialWords, action) => {
  switch (action.type) {
      case "SAVE":
        return state.map(e => {
            if(e.id !== action.id) return e
            return {...e, saved: !e.saved}
        })

      case "ADD":
          return [{id: state.length + 1, en: action.en, vn: action.vn, saved: false, isShow: true}].concat(state)

      default:
          return state
  }
}
const AppReducer = combineReducers({
   isAdding: isAddingReducer,
   filterShow: filterStatusReducer,
   words: wordsReducer
 });

export default AppReducer;
