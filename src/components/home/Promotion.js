import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity
} from 'react-native'
import Swiper from 'react-native-swiper'
export default class Promotion extends Component<{}> {
  render() {
    const {promotion} = this.props
    const {restaurant} = this.props
    const {navigate} = this.props
    const url = `http://192.168.64.2/myrestau/images/voucher/${promotion.image}`

    return (
      <View style={styles.slide}>
        <TouchableOpacity onPress={() => navigate('RestaurantDetail', {restaurant})}>
            <Image source={{uri: url}} style={styles.voucher}/>
        </TouchableOpacity>
      </View>
    );
  }
}
const restauWidth= 360
const restauHeight= restauWidth * 460 /1104
const styles = StyleSheet.create({
  voucher: {
    height: restauHeight,
    width: restauWidth
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
