import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button,
  Image,
  TouchableOpacity,
  Dimensions
} from 'react-native';
import {connect} from 'react-redux'
import * as actions from '../../actions'
import HeaderRight from '../header/HeaderRight'
import Gallery from '../gallery/Gallery'

class FoodGallery extends Component<{}> {

  goMyGallery() {
    const {foodImage, images} = this.props
    this.props.getMyImageDetail(foodImage.id, images)
  }
  render() {
    const {foodImage} = this.props
    const url = `http://192.168.64.2/myrestau/images/food/${foodImage.link}`
  	return (
      <View>
        <TouchableOpacity onPress={() => this.goMyGallery()}>
          <Image source={{uri: url}} style={styles.image}/>
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
export default connect(mapStateToProps, actions)(FoodGallery)

const {height, width} = Dimensions.get('window');
const styles = StyleSheet.create({
image: {
   height: width/3,
   width: width/3,
   borderWidth: 0.5,
   borderColor: '#43a047'
 }
})
