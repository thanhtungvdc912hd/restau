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
  static navigationOptions = ({navigation}) => ({
    title: 'My Restaurant',
    headerTitleStyle: {
      fontFamily: 'Avenir',
      fontWeight: 'bold',
      fontSize: 17,
    },
    headerLeft: <View style={{paddingLeft: 10}}>
                  <TouchableOpacity onPress={()=>{navigation.navigate('DrawerOpen')}}>
                    <Image source={require("../../images/menu2.png")} style={styles.icon}/>
                  </TouchableOpacity>
                </View>,
    headerRight: <View style={{paddingRight: 10}}>
                  <TouchableOpacity onPress={()=>{navigation.navigate('Search')}}>
                    <Image source={require("../../images/search.png")} style={[styles.icon,{tintColor: 'white'}]}/>
                  </TouchableOpacity>
                </View>,
  })

  getRestaurants() {
    this.props.fetchTopRestaurants()
  }

  componentDidMount() {
    this.getRestaurants()

    if (!this.props.isLogged) {
      this.props.checkLoginMyRestau()
      setInterval(() => {
        this.props.refreshMyToken()
      }, 60 * 1000)
    }
  }

  render() {
    const {restaurants, topPromotions} = this.props
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
  restaurants: state.api.restaurants,
  topPromotions: state.api.topPromotions,
  isLogged: state.auth.isLogged
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
