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
import OrderHistory from './OrderHistory'
export default class OrderHistories extends Component<{}> {
  static navigationOptions = ({navigation}) => ({
    header: null

  })

  render() {
    const {goBack} = this.props.navigation
    const {navigate} = this.props.navigation

    return (
      <View style={styles.container}>
        <View style={styles.headerText}>
          <TouchableOpacity onPress={()=> goBack()}>
            <Image source={require("../../images/home_r.png")} style={styles.icon}/>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Order History</Text>
          <Image source={require("../../images/logo.png")} style={styles.icon}/>
        </View>
        <ScrollView>
        <OrderHistory navigate={navigate}/>
        <OrderHistory navigate={navigate}/>
        <OrderHistory navigate={navigate}/>
        <OrderHistory navigate={navigate}/>
        <OrderHistory navigate={navigate}/>
        <OrderHistory navigate={navigate}/>
        <OrderHistory navigate={navigate}/>
        </ScrollView>
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
})
