import React, { Component } from 'react';
import { StackNavigator, DrawerNavigator, TabNavigator } from 'react-navigation';

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
import Orders from "../Orders"
import Foods from "../Foods"


const MyStack = StackNavigator({
  MyMain: { screen: Main},
  Authentication: { screen: Authentication },
  MyInfo: { screen: MyInfo },
  OrderHistories: { screen: OrderHistories },
  PromotionDetail: { screen: PromotionDetail },
  RestaurantDetail: { screen: RestaurantDetail },
  Restaurant: { screen: Restaurant},
  Restaurants: { screen: Restaurants},
  Foods: { screen: Foods},
},{
  initialRouteName: 'MyMain'
})

// Manifest of possible screens
const MyTabs = TabNavigator({
  Main: { screen: MyStack },
  Orders: { screen: Orders },
},
{
  // Default config for all screens
  tabBarOptions: {
    activeTintColor: '#e91e63',
    showLabel: false,
  },
  animationEnabled: true

})

const MyMenu = DrawerNavigator({
  Stack: { screen: MyStack },
  Tabs: { screen: MyTabs },
},{
  contentComponent: props =>
  <SlideMenu {...props}/>
})

export default class AppNavigator extends Component<{}> {
  render() {
    return <MyMenu/>
  }
}
