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

import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import * as actions from '../../actions'
class Restaurant extends Component<{}> {

  goRestaurantDetail() {
    const myRestaurant = this.props.restaurants.find((element) => {return element.id === this.props.restaurant.id})
    if (myRestaurant != null) {
      this.props.goRestaurantDetail(myRestaurant)
    } else {
      this.props.fetchRestaurantDetail(this.props.restaurant.id)
    }

  }
  render() {

    const {restaurant} = this.props

    const url = `http://192.168.64.2/myrestau/images/restaurant/${restaurant.image}`
    let mainOfficeJSX = null
    if (restaurant.id == restaurant.mainOfficeId) {
      mainOfficeJSX = (
        <Image source={require("../../images/home_r.png")} style={styles.base}/>
      )
    }
    return (
        <View style={styles.restauContainer}>
          <View style={styles.restauStyle}>
            <View style={styles.restauImage}>
              <TouchableOpacity onPress={()=> {this.goRestaurantDetail()}}>
                <Image source={{uri: url}} style={styles.image}/>
              </TouchableOpacity>
              <Text>{this.props.isLoading}</Text>
            </View>
            <View style={styles.restauInfo}>
              <View style={styles.restauInfoTool}>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Text style={styles.txtRestauName}>{restaurant.name}</Text>
                    {mainOfficeJSX}
                  </View>
                  <View style={styles.restauInfoTool}>
                    <View>
                      <TouchableOpacity onPress={()=>{navigation.navigate('RestaurantDetail',{restaurant})}}>
                        <Image source={require("../../images/info.png")} style={styles.icon}/>
                      </TouchableOpacity>
                    </View>
                    <View>
                      <Image source={require("../../images/reserve.png")} style={styles.icon}/>
                    </View>
                    <View>
                      <Image source={require("../../images/order.png")} style={styles.icon}/>
                    </View>
                  </View>
              </View>

              <Text style={styles.txtAddress}>{restaurant.address}</Text>
              <View style={styles.time}>
                <Image source={require("../../images/time.png")} style={styles.icon}/>
                <Text style={styles.txtTime}>{restaurant.openTime}</Text>
                <Text style={styles.txtTime}>-</Text>
                <Text style={styles.txtTime}>{restaurant.closeTime}</Text>
              </View>
            </View>
          </View>
        </View>
    );
  }
}


Restaurant.propTypes = {
  restaurant: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
  isLoading: state.api.isLoading,
  restaurants: state.api.restaurants,
  topPromotions: state.api.topPromotions
}}
export default connect(mapStateToProps, actions)(Restaurant)

const restauWidth= 100
const restauHeight= restauWidth * 640 /960
const styles = StyleSheet.create({
  restauContainer: {
    flex:1,
    paddingLeft: 5,
    flexWrap: 'wrap',
    backgroundColor: '#a5d6a7',
    borderTopWidth: 1,
    borderTopColor: '#95a5a6',
  },
  restauStyle: {
    marginBottom: 10,
    flexDirection: 'row',
    marginTop:10
  },
  image: {
    height: restauHeight,
    width: restauWidth
  },
  restauImage: {
    paddingRight : 10,
  },
  restauInfo: {
    flex: 1,
    justifyContent: 'space-between'
  },
  restauInfoTool: {
    flexDirection: "row",
    justifyContent: 'space-between',
    paddingRight: 5
  },
  icon: {
    width: 20,
    height: 20,
  },
  base: {
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
  time: {
    flexDirection: "row",
    alignItems: 'center'
  },
  txtTime: {
    fontSize: 10,
    fontFamily: 'Avenir',
    paddingRight: 10
  }
})
