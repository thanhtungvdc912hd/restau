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
    title: "Order History"

  })

  render() {
    const {navigate} = this.props.navigation

    return (
      <View style={styles.container}>
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
