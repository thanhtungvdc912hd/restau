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

class CartTab extends Component<{}> {
  render() {
    const foods = this.props.cartFoods ? this.props.cartFoods : null
    const foodCount = foods != null ? foods.length : 0
    if(foods != null && foods.length > 0){
      return (
          <View style={styles.headerText}>
            <View style={styles.badge}>
              <Text style={{fontSize: 10, color: 'white'}} numberOfLines = {1}>{foodCount}</Text>
            </View>
          </View>
      );
    } else {
      return <View></View>
    }
  }
}

const mapStateToProps = (state) => {
  return {
  isLoading: state.api.isLoading,
  cartFoods: state.cart.foods,
}}
export default connect(mapStateToProps, actions)(CartTab)

const styles = StyleSheet.create({
  headerText: {
    paddingHorizontal: 10,
  },
  icon: {
    width: 20,
    height: 20,
  },
  badge: {
    position: 'absolute',
    bottom: 3,
    right: 1,
    height: 20,
    width: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'tomato'
  }
})
