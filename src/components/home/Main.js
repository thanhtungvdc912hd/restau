import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button,
  Image,
  TouchableOpacity,
  StatusBar,
  ScrollView
} from 'react-native';

import Restaurants from "./Restaurants"
import Promotions from "./Promotions"
import {connect} from 'react-redux'
import * as actions from '../../actions'

class Main extends Component<{}> {
  // state = {
  //   topRestaurants: [],
  //   topPromotions: [],
  // }

  static navigationOptions = ({navigation}) => ({
    title: 'My Restaurant',
    drawerLabel: 'Home',
    drawerIcon: ({ tintColor }) => (
      <Image
        source={require('../../images/home_r.png')}
        style={[styles.icon, {tintColor: tintColor}]}
      />
    ),
    headerLeft: <View style={{paddingLeft: 10}}>
                  <TouchableOpacity onPress={()=>{navigation.navigate('DrawerOpen')}}>
                    <Image source={require("../../images/menu2.png")} style={styles.icon}/>
                  </TouchableOpacity>
                </View>,
  })

  getRestaurants() {
    this.props.fetchTopRestaurants()
  }

  componentDidMount() {
    this.getRestaurants()
  }

  render() {
    const {restaurants, topPromotions, isLoading} = this.props
    if (topPromotions == null || restaurants == null) {
      return (
        <View style={{marginTop: 10}}>
          <Text>...Loading</Text>
        </View>
      )
    }
    return (
      <ScrollView style={styles.container}>
        <StatusBar hidden={true}/>
        <View style={{marginTop: 10}}>
          <Promotions promotions={topPromotions} restaurants={restaurants}/>
        </View>
        <Restaurants restaurants={restaurants}/>
      </ScrollView>
    );
  }
}

const mapStateToProps = (state) => {
  return {
  isLoading: state.api.isLoading,
  restaurants: state.api.restaurants,
  topPromotions: state.api.topPromotions,
}}
export default connect(mapStateToProps, actions)(Main)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#43a047',
  },
  icon: {
    width: 24,
    height: 24,
  },
})
