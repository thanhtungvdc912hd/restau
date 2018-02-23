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

export default class OrderHistory extends Component<{}> {
  render() {
    return (
        <View style={styles.restauContainer}>
          <View style={styles.restauStyle}>
            <View style={styles.restauImage}>
              <TouchableOpacity onPress={()=>{this.props.navigate('RestaurantDetail')}}>
                <Image source={require("../images/r2.jpg")} style={styles.image}/>
              </TouchableOpacity>
            </View>
            <View style={styles.restauInfo}>
              <View style={styles.restauInfoTool}>
                  <View style={{justifyContent: 'center'}}>
                    <Text style={styles.txtRestauName}>BB' House Restaurant</Text>
                  </View>
                  <View style={styles.restauInfoTool}>
                    <View>
                      <TouchableOpacity onPress={()=>{this.props.navigate('RestaurantDetail')}}>
                        <Image source={require("../images/info.png")} style={styles.icon}/>
                      </TouchableOpacity>
                    </View>
                    <View>
                      <Image source={require("../images/reserve.png")} style={styles.icon}/>
                    </View>
                    <View>
                      <Image source={require("../images/order.png")} style={styles.icon}/>
                    </View>
                  </View>
              </View>

              <Text  style={styles.txtAddress}>376/42 Nguyen Dinh Chieu, Phuong 4, Quan 3, TP Ho Chi Minh</Text>
              <View style={{flexDirection: 'row'}}>
                <Image source={require("../images/time.png")} style={styles.icon}/>
                <View style={{justifyContent: 'center', paddingLeft:10 }}>
                  <Text style={{fontSize: 10, paddingRight: 20}}>01-01-2018 15:30</Text>
                </View>


                <Image source={require("../images/price.png")} style={styles.icon}/>
                <View style={{justifyContent: 'center', paddingLeft:10 }}>
                  <Text style={{fontSize: 10}}>9.000.000 VND</Text>
                </View>
              </View>

            </View>
          </View>
        </View>
    );
  }
}
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
    paddingRight : 10
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
  }
})
