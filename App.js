import React, { Component } from 'react';
import AppWithNavigationState from "./components/navigators/AppNavigator"
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import logger from 'redux-logger'
import store from './components/reducers/store'
import AppReducer from './components/reducers'
import TestReduxAPI from './components/TestReduxAPI'

//const store = createStore(AppReducer, applyMiddleware(logger))

export default class App extends Component<{}> {
  render() {
    return (
      <Provider store={store}>
        <TestReduxAPI />
      </Provider>
    );
  }
}
