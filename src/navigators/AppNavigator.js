import React, { Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import { addNavigationHelpers, StackNavigator, TabNavigator, DrawerNavigator } from 'react-navigation';
import { addListener } from '../utils/redux';
import { BackHandler } from 'react-native';

import Main from '../components/home/Main'
import MyInfo from '../components/myinfo/MyInfo'
import RestaurantDetail from '../components/detail/RestaurantDetail'
import FoodDetail from '../components/detail/FoodDetail'
import Restaurant from '../components/home/Restaurant'
import Restaurants from '../components/home/Restaurants'
import Foods from '../components/food/Foods'
import Food from '../components/food/Food'
import HeaderRight from '../components/header/HeaderRight'
import Orders from '../components/order/Orders'


const stackNavigatorConfiguration = {
  headerMode: 'float',
  navigationOptions : {
    headerStyle: {
      backgroundColor: '#43a047',
      //borderBottomWidth:0
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  }
};
export const HomePage = StackNavigator({
  Main: { screen: Main },
  Restaurant: { screen: Restaurant },
  Restaurants: { screen: Restaurants },
  RestaurantDetail: { screen: RestaurantDetail },
  Foods: { screen: Foods },
  Food: { screen: Food },
  FoodDetail: { screen: FoodDetail },
  Orders: { screen: Orders },
},stackNavigatorConfiguration)

export const AppNavigator = DrawerNavigator({
  Home: { screen: HomePage },
  Info: { screen: MyInfo },
  //Language: { screen: MyInfo },
  //Info: { screen: MyInfo },
  //Logout: { screen: MyInfo },
});



class AppWithNavigationState extends Component {
  constructor(props) {
    super(props);
    BackHandler.addEventListener('hardwareBackPress', this.backAction);
  }

  backAction = () => this.navigator.props.navigation.goBack();

  render() {
    const { dispatch, nav } = this.props;
    return (
      <AppNavigator
        navigation={addNavigationHelpers({
          dispatch,
          state: nav,
          addListener,
        })}
      />
    );
  }
}

const mapStateToProps = state => ({
  nav: state.nav,
});

export default connect(mapStateToProps)(AppWithNavigationState);
