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

import MyHeaderMain from "./MyHeaderMain"
import TopRestaurants from "./TopRestaurants"
import Promotions from "./Promotions"

const MenuButton = (props) => (
  <TouchableOpacity onPress={()=>{props.navigation.navigate('DrawerOpen')}}>
    <Image source={require("../images/menu.png")} style={styles.icon}/>
  </TouchableOpacity>
)

export default class Main extends Component<{}> {
  constructor(props) {
    super(props)
    this.state = {
      restaurants: [],
      promotions: [],
    }
  }
  static navigationOptions = ({navigation}) => ({
    header: <MyHeaderMain navigation = {navigation}/>,
    headerLeft:<MenuButton navigation = {navigation}/>,
    tabBarIcon: ({ tintColor }) => (
      <Image
        source={require('../images/home_r.png')}
        style={[styles.icon,{tintColor: tintColor}]}
      />
    )
  })
  componentDidMount() {
    fetch('http://192.168.64.2/myrestau/')
    .then(res => res.json())
    .then(resJSON => {
        const {restaurants, promotions} = resJSON
        this.setState({restaurants, promotions})
    });
  }
  render() {
    const { navigate } = this.props.navigation
    const {restaurants} = this.state
    const {promotions} = this.state
    return (
      <ScrollView style={styles.container}>
        <StatusBar hidden={true}/>
        <Promotions navigate={navigate} promotions={promotions} restaurants={restaurants}/>
        <TopRestaurants navigate={navigate} restaurants={restaurants}/>
      </ScrollView>
    );
  }
}

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
