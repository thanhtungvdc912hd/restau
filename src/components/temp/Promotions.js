import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  Text
} from 'react-native'
import Swiper from 'react-native-swiper'
import Promotion from './Promotion'

export default class Promotions extends Component<{}> {
  render() {
    const {promotions} = this.props
    const {restaurants} = this.props
    const {navigate} = this.props
    if(this.props.promotions.length == 0){
        return(
        <View><Text>Loading...</Text></View>
        )
    } else {
      return (
        <View style={styles.container}>
          <Swiper autoplay={true}>
          {promotions.map(p => (
            <Promotion navigate={navigate} promotion={p} restaurant={restaurants.find((element) => {return element.id === p.restaurantId})} key={p.id}/>
          ))}
          </Swiper>
        </View>
      );
    }
  }
}
const restauWidth= 360
const restauHeight= restauWidth * 460 /1104
const styles = StyleSheet.create({
  container: {
    height: restauHeight,
    marginBottom: 10
  },
  voucher: {
    height: restauHeight,
    width: restauWidth
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
