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
import {connect} from 'react-redux'
import * as actions from '../../actions'

class Food extends Component<{}> {
  goFoodDetail(food) {
    this.props.goFoodDetail(food)
  }

  increaseFood(food) {
    let my_index = this.props.cartFoods.findIndex(f => f.food.id === food.id)
    if (my_index >= 0) {
      this.props.updateCart(food, this.props.cartFoods[my_index].quantity + 1)
    }
  }

  decreaseFood(food) {
    let my_index = this.props.cartFoods.findIndex(f => f.food.id === food.id)
    if (my_index >= 0) {
      this.props.updateCart(food, this.props.cartFoods[my_index].quantity - 1)
    }
  }

  deleteFood(food) {
    let my_index = this.props.cartFoods.findIndex(f => f.food.id === food.id)
    if (my_index >= 0) {
      this.props.deleteFromCart(food)
    }
  }
  render() {
    const {food} = this.props.food.food ? this.props.food : this.props
    const {quantity} = this.props.food.food ? this.props.food : this.props

    const  url = `http://192.168.64.2/myrestau/images/food/${food.image}`

    let hotJSX = null
    if (food.rate > 5) {
      hotJSX = (
        <Image source={require("../../images/hot.png")} style={styles.hot}/>
      )
    }

    let numberJSX = null
    if (quantity > 0) {
      numberJSX = (
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>

          <View style={{flexDirection: 'row', alignItems: 'center', width: 120, justifyContent: 'space-between'}}>
              <TouchableOpacity onPress={() => {this.increaseFood(food)}} disabled={quantity === 20}>
                <Image source={require("../../images/add.png")} style={styles.icon}/>
              </TouchableOpacity>
              <Text>{quantity}</Text>
              <TouchableOpacity onPress={() => {this.decreaseFood(food)}} disabled={quantity === 1}>
                <Image source={require("../../images/minus.png")} style={styles.icon}/>
              </TouchableOpacity>


          </View>

            <TouchableOpacity onPress={() => {this.deleteFood(food)}}>
              <Image source={require("../../images/minus.png")} style={styles.icon}/>
            </TouchableOpacity>


        </View>
      )
    }
    return (
      <View style={styles.container}>
          <View style={styles.restauStyle}>
            <View style={styles.restauImage}>
              <TouchableOpacity onPress={() => {this.goFoodDetail(food)}}>
                <Image source={{uri: url}} style={styles.image}/>
              </TouchableOpacity>
            </View>
            <View style={styles.restauInfo}>
              <View style={styles.restauInfoTool}>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <Text style={styles.txtRestauName}>{food.name}</Text>
                      {hotJSX}
                  </View>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <Image source={require("../../images/price.png")} style={styles.icon}/>
                      <Text style={{fontSize: 10}}>{food.price} VND</Text>
                  </View>
              </View>

              <Text  style={styles.txtAddress}>{food.description}</Text>
              <Text  style={styles.txtAddress} numberOfLines={1}>{food.info}</Text>
              {numberJSX}
            </View>
        </View>
      </View>
    );
  }
}


const mapStateToProps = (state) => {
  return {
  isLoading: state.api.isLoading,
  restaurants: state.api.restaurants,
  topPromotions: state.api.topPromotions,
  cartFoods: state.cart.foods,
}}
export default connect(mapStateToProps, actions)(Food)

const restauWidth= 100
const restauHeight= restauWidth * 640 /960
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#a5d6a7',
    justifyContent: 'space-around',
    paddingLeft: 5,
    flexWrap: 'wrap',
    paddingTop: 5,
    paddingBottom: 5,

    borderBottomWidth: 1,
    borderBottomColor: '#95a5a6',
  },
  title: {
    fontSize: 20,
    color: "#0c2461"
  },
  titleContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  restauStyle: {
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center'
  },
  image: {
    height: restauHeight,
    width: restauWidth
  },
  restauImage: {
    paddingRight : 10
  },
  restauInfo: {
    flex: 1,
    justifyContent: 'space-between'
  },
  restauInfoTool: {
    flexDirection: "row",
    justifyContent: 'space-between',
    paddingRight: 5,
    alignItems: 'center'
  },
  icon: {
    width: 20,
    height: 20,
  },
  hot: {
    width: 15,
    height: 15,
  },
  txtAddress: {
    color: '#7f8c8d',
    fontSize: 10,
    fontFamily: 'Avenir'
  },
  txtRestauName: {
    color: '#30336b',
    fontSize: 13,
    fontFamily: 'Avenir',
    fontWeight: 'bold'
  },

})
