import React from 'react';
import { AppRegistry } from 'react-native';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

import AppReducer from './src/reducers';
import AppWithNavigationState from './src/navigators/AppNavigator';
import { middleware } from './src/utils/redux';
import thunk from 'redux-thunk'
const store = createStore(
  AppReducer,
  applyMiddleware(middleware, thunk),
);

class MyRestauApp extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <AppWithNavigationState />
      </Provider>
    );
  }
}

AppRegistry.registerComponent('MyRestau', () => MyRestauApp);

export default MyRestauApp;
