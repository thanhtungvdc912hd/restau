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

class HeaderRight extends Component<{}> {
  goCart(foods) {
    this.props.goFoods(foods, false)
  }

  render() {
        return(
        <View>
          <View style={styles.headerText}>
              <Image source={require("../../images/cart_w.png")} style={styles.icon}/>
          </View>
        </View>
        )

  }
}

const mapStateToProps = (state) => {
  return {
  isLoading: state.api.isLoading,
  cartFoods: state.cart.foods,
}}
export default connect(mapStateToProps, actions)(HeaderLeft)

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
