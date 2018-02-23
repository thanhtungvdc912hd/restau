import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button,
  Image,
  TouchableOpacity,
  ScrollView
} from 'react-native';
import Food from './Food'
export default class Orders extends Component<{}> {
  static navigationOptions = ({navigation}) => ({
    header: null,
    tabBarIcon: ({ tintColor }) => (
      <Image
        source={require('../images/menu.png')}
        style={[styles.icon,{tintColor: tintColor}]}
      />
    )
  })

  render() {
    const {goBack} = this.props.navigation
    const {navigate} = this.props.navigation

    return (
      <View style={styles.container}>
        <View style={styles.headerText}>
          <TouchableOpacity onPress={()=> goBack()}>
            <Image source={require("../images/home_r.png")} style={styles.icon}/>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Ordered Menu</Text>
          <Image source={require("../images/logo.png")} style={styles.icon}/>
        </View>
        <ScrollView>
          <Food navigate={navigate}/>
          <Food navigate={navigate}/>
          <Food navigate={navigate}/>
        </ScrollView>
        <TouchableOpacity style={styles.checkOut} onPress={()=> goBack()}>
          <Text style={styles.headerTitle}>Total Menu 1000.000 VND</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#43a047',
    flex: 1,
  },
  headerText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 50,
    padding: 10
  },
  headerTitle: {
    color: '#fff',
    fontFamily: 'Avenir',
    fontSize: 20
  },
  icon: {
    width: 24,
    height: 24,
  },
  checkOut: {
    alignItems: 'flex-end',
    height: 50,
    justifyContent: 'center'
  },
})
