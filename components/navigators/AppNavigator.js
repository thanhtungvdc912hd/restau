import React, { Component, Animated, Easing } from 'react';
import { StackNavigator, DrawerNavigator, TabNavigator, addNavigationHelpers } from 'react-navigation';
import { connect } from 'react-redux'
import { addListener } from '../utils/redux';

import Main from "../Main"
import Authentication from "../Authentication"
import OrderHistories from "../OrderHistories"
import MyInfo from "../MyInfo"
import SlideMenu from "../SlideMenu"
import MyHeader from "../MyHeader"
import RestaurantDetail from "../RestaurantDetail"
import PromotionDetail from "../PromotionDetail"
import Restaurant from "../Restaurant"
import Restaurants from "../Restaurants"
import TopRestaurants from "../TopRestaurants"
import Orders from "../Orders"
import Foods from "../Foods"
import TestRedux1 from "../TestRedux1"
import TestRedux2 from "../TestRedux2"


export const AppNavigator = StackNavigator({
  Com1: {screen: TestRedux1},
  Com2: {screen: TestRedux2},
  // MyMain: { screen: Main},
  // Authentication: { screen: Authentication },
  // MyInfo: { screen: MyInfo },
  // OrderHistories: { screen: OrderHistories },
  // PromotionDetail: { screen: PromotionDetail },
  // RestaurantDetail: { screen: RestaurantDetail },
  // Restaurant: { screen: Restaurant},
  // Restaurants: { screen: Restaurants},
  // TopRestaurants: { screen: TopRestaurants},
  // Foods: { screen: Foods},
},{
  initialRouteName: 'Com1',
})

// Manifest of possible screens
// const MyTabs = TabNavigator({
//   Main: { screen: MyStack },
//   Orders: { screen: Orders },
// },
// {
//   // Default config for all screens
//   tabBarOptions: {
//     activeTintColor: '#e91e63',
//     showLabel: false,
//   },
//   animationEnabled: true
//
// })
//
// export const AppNavigator = DrawerNavigator({
//   Stack: { screen: MyStack },
//   Tabs: { screen: MyTabs },
// },{
//   contentComponent: props =>
//   <SlideMenu {...props}/>
// })

class AppWithNavigationState extends Component<{}> {
  render() {
    return <AppNavigator navigation={addNavigationHelpers({
        dispatch: this.props.dispatch,
        state: this.props.navigation,
        addListener,
      })} />
  }
}

const mapStateToProps = state => ({
  navigation: state.navigation.value,
})

export default connect(mapStateToProps)(AppWithNavigationState);
