import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
} from 'react-native';

export default class BenefitImage extends Component {
  render() {
    const {benefit} = this.props
    const url = `http://192.168.64.2/myrestau/images/icons/${benefit.image}`
    return (
      <View style={styles.facility}>
        <Image source={{uri: url}} style={styles.openStatus}/>
        <Text style={styles.txtTime}>{benefit.name}</Text>
      </View>
    );
  }
}

const restauWidth= 350
const restauHeight= restauWidth * 640 /960
const styles = StyleSheet.create({
  openStatus: {
    width: 25,
    height: 25,
  },
  facility: {
    flexDirection: "row",
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 3
  },
  txtTime: {
    fontSize: 10,
    fontFamily: 'Avenir',
    paddingRight: 5,
    paddingLeft: 5,
    color: '#7f8c8d',

  }
})
