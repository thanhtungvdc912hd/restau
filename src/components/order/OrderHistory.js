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
    const {orderHistory} = this.props

    return (
        <View style={styles.restauContainer}>
          <View style={styles.restauStyle}>
            <View style={styles.restauInfo}>
              <View style={styles.restauInfoTool}>
                  <View style={{justifyContent: 'center'}}>
                    <Text style={styles.txtRestauName}>{orderHistory.name}</Text>
                  </View>
              </View>

              <Text  style={styles.txtAddress}>{orderHistory.address}</Text>
              <View style={{flexDirection: 'row', justifyContent:'space-between'}}>
                <View style={{flexDirection: 'row', justifyContent:'space-around'}}>
                  <Image source={require("../../images/time.png")} style={styles.icon}/>
                  <View style={{justifyContent: 'center', paddingLeft:5 }}>
                    <Text style={{fontSize: 10}}>{orderHistory.orderDate}</Text>
                  </View>
                </View>
                <View style={{flexDirection: 'row', justifyContent:'space-around'}}>
                  <Image source={require("../../images/orderStatus.png")} style={styles.icon}/>
                  <View style={{justifyContent: 'center', paddingLeft:10 }}>
                    <Text style={{fontSize: 10}}>{orderHistory.status ? "Completed" : "Pending"}</Text>
                  </View>
                </View>

                <View style={{flexDirection: 'row', justifyContent:'space-around'}}>
                  <Image source={require("../../images/price.png")} style={styles.icon}/>
                  <View style={{justifyContent: 'center', paddingLeft:10 }}>
                    <Text style={{fontSize: 10}}>{orderHistory.total} VND</Text>
                  </View>
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
