import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button,
  Image,
  TouchableOpacity,
} from 'react-native';
import {connect} from 'react-redux'
import * as actions from '../../actions'
import HeaderRight from '../header/HeaderRight'


class FoodDetail extends Component<{}> {
  static navigationOptions = ({navigation}) => {
    return {
    title: navigation.state.params.food.name,
    headerRight: <HeaderRight/>
  }}

  addFoodToCart(food) {
    let my_index = this.props.cartFoods.findIndex(f => f.food.id === food.id)
    if (my_index < 0) {
      this.props.saveCartThunk(food, 1)
    }
  }

  render() {
    const {food} = this.props.navigation.state.params
    const url = `http://192.168.64.2/myrestau/images/food/${food.image}`

    return (
      <View style={styles.container}>
        <View style={styles.restauImage}>
          <Image source={{uri: url}} style={styles.image}/>
        </View>
        <View style={styles.detail}>
          <View>
            <View style={styles.nameInfo}>
              <Text style={styles.name}>{food.name}</Text>
              <View style={{flexDirection: 'row'}}>
                <Text style={styles.name}>{food.rate}</Text>
                <Image source={require("../../images/point.png")} style={styles.icon}/>
              </View>
              <TouchableOpacity onPress={() => {this.addFoodToCart(food)}}>
                <Image source={require("../../images/cart.png")} style={styles.icon}/>
              </TouchableOpacity>
            </View>
            <View style={styles.time}>
              <Image source={require("../../images/price-tag.png")} style={styles.icon}/>
              <Text style={styles.txtTime}>{food.price}đ</Text>
            </View>

            <View style={styles.time}>
              <Image source={require("../../images/type.png")} style={styles.icon}/>
              <Text style={styles.txtTime}>{food.description}</Text>
            </View>

            <View style={styles.time}>
              <Image source={require("../../images/foodInfo.png")} style={styles.icon}/>
              <Text style={styles.txtTime}>{food.info}</Text>
            </View>



            <View style={styles.time}>
              <TouchableOpacity style={{flex:1, flexDirection:'row'}} onPress = {() => {this.goFoods()}}>
                <Image source={require("../../images/menu.png")} style={styles.icon}/>
                <Text style={styles.txtTime}>Comments</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
  isLoading: state.api.isLoading,
  cartFoods: state.cart.foods,
}}
export default connect(mapStateToProps, actions)(FoodDetail)

const restauWidth= 350
const restauHeight= restauWidth * 640 /960
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#43a047',
    flex: 1,
    justifyContent: 'space-between'
  },
  headerText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10

  },
  headerTitle: {
    color: '#fff',
    fontFamily: 'Avenir',
    fontSize: 20
  },
  name: {
    color: '#0c2461',
    fontFamily: 'Avenir',
    fontSize: 15
  },
  icon: {
    width: 15,
    height: 15,
    justifyContent: 'center',
    alignItems: 'center',

  },
  openStatus: {
    width: 30,
    height: 30,
  },
  restauImage: {
    paddingTop: 10,
    alignItems: 'center'
  },
  image: {
    height: restauHeight,
    width: restauWidth,
    borderRadius: 20,
  },
  detail: {
    flex:2,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    shadowColor: '#2E272B',
    shadowOpacity: 1,
    margin:5,
  },
  time: {
    flexDirection: "row",
    alignItems: 'center',
    paddingTop: 3,
  },
  facility: {
    flexDirection: "row",
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  txtTime: {
    fontSize: 10,
    fontFamily: 'Avenir',
    paddingRight: 5,
    paddingLeft: 5,
    color: '#7f8c8d',
    justifyContent: 'center'

  },
  imageBenefit: {
    paddingRight: 5,
    paddingLeft: 5,
  },
  call: {
    flexDirection: "row",
    alignItems: 'center',
    paddingTop: 5,
  },
  nameInfo: {
    paddingBottom: 5,
    paddingTop: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#95a5a6',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  innerContainer: {
    alignItems: 'flex-start',
    padding: 10,
    margin: 10,
    marginTop: 150,
    justifyContent: 'center',
    backgroundColor: '#fff',
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
