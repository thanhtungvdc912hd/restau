import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button,
  Image,
  TouchableOpacity,
  FlatList
} from 'react-native';
import {connect} from 'react-redux'
import * as actions from '../../actions'
import Food from '../food/Food'
import { HeaderBackButton } from 'react-navigation';

class Orders extends Component<{}> {
  static navigationOptions = ({navigation}) => {
    return {
    title: "Ordered Menu",
    headerLeft: (
          <HeaderBackButton
            title="Back"
            onPress={() => navigation.goBack()}
            style={{color: '#fff'}}
          />
      ),
  }}

  sendOrder() {
    const foods = this.props.cartFoods
    const myFoods = foods.map(e => ({id: e.food.id, quantity: e.quantity}))
    this.props.sendMyOrder(myFoods)
  }
  render() {
    const foods = this.props.cartFoods
    const totalFoods = foods.map(e => e.food.price * e.quantity)
    const total = totalFoods.length > 0 ? totalFoods.reduce((a,b) => a + b) : 0
      return (
        <View style={styles.container}>
          <View>
          <FlatList
            data={foods}
            renderItem={({item}) => (
              <Food food={item} key={item.id}/>
            )}
            keyExtractor={(item, index) => index.toString()}
          />
          <View style={{flexDirection: 'row', alignItems: 'center', backgroundColor: '#a5d6a7', justifyContent: 'flex-end', paddingRight: 5}}>
              <Image source={require("../../images/price.png")} style={styles.icon}/>
              <Text style={{fontSize: 12, fontWeight: 'bold'}}>{total} VND</Text>
          </View>

          </View>
            <TouchableOpacity onPress={() => {this.sendOrder()}}>
              <View style={{backgroundColor: '#a5d6a7', alignItems: 'center', justifyContent: 'center', height: 50}}>
                <Text style={{color: '#fff'}}>PAY NOW</Text>
              </View>
            </TouchableOpacity>
        </View>
      );
    }

}

const mapStateToProps = (state) => {
  return {
  isLoading: state.api.isLoading,
  cartFoods: state.cart.foods,
}}
export default connect(mapStateToProps, actions)(Orders)

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#43a047',
    flex: 1,
    justifyContent: 'space-between'
  },
  headerText: {
    paddingHorizontal: 10,
  },
  icon: {
    width: 20,
    height: 20,
    justifyContent: 'center'
  },
  badge: {
    position: 'absolute',
    bottom: 10,
    right: 1,
    height: 20,
    width: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'red'
  }
})
