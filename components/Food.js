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

export default class Food extends Component<{}> {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.restauContainer}>
          <View style={styles.restauStyle}>
            <View style={styles.restauImage}>
              <TouchableOpacity onPress={()=>{this.props.navigate('RestaurantDetail')}}>
                <Image source={require("../images/m1.png")} style={styles.image}/>
              </TouchableOpacity>
            </View>
            <View style={styles.restauInfo}>
              <View style={styles.restauInfoTool}>
                  <View style={{justifyContent: 'center'}}>
                    <Text style={styles.txtRestauName}>Suon Op la</Text>
                    <Text>4</Text>
                  </View>

                  <View style={styles.restauInfoTool}>
                    <View>
                      <TouchableOpacity onPress={()=>{this.props.navigate('RestaurantDetail')}}>
                        <Image source={require("../images/info.png")} style={styles.icon}/>
                      </TouchableOpacity>
                    </View>
                    <View>
                      <Image source={require("../images/minus.png")} style={styles.icon}/>
                    </View>
                    <View>
                      <Image source={require("../images/add.png")} style={styles.icon}/>
                    </View>
                  </View>
              </View>

              <Text  style={styles.txtAddress}>Suon, Opla, Rau, Hanh</Text>
              <View style={{flexDirection: 'row'}}>
                <Image source={require("../images/price.png")} style={styles.icon}/>
                <View style={{justifyContent: 'center', paddingLeft:10 }}>
                  <Text style={{fontSize: 10}}>20.000 VND</Text>
                </View>
              </View>

            </View>
          </View>

          <View style={styles.restauStyle}>
            <View style={styles.restauImage}>
              <TouchableOpacity onPress={()=>{this.props.navigate('RestaurantDetail')}}>
                <Image source={require("../images/m2.png")} style={styles.image}/>
              </TouchableOpacity>
            </View>
            <View style={styles.restauInfo}>
              <View style={styles.restauInfoTool}>
                  <View style={{justifyContent: 'center'}}>
                    <Text style={styles.txtRestauName}>Tom Cang Chien Xu</Text>
                    <Text>3</Text>
                  </View>
                  <View style={styles.restauInfoTool}>
                    <View>
                      <TouchableOpacity onPress={()=>{this.props.navigate('RestaurantDetail')}}>
                        <Image source={require("../images/info.png")} style={styles.icon}/>
                      </TouchableOpacity>
                    </View>
                    <View>
                      <Image source={require("../images/minus.png")} style={styles.icon}/>
                    </View>
                    <View>
                      <Image source={require("../images/add.png")} style={styles.icon}/>
                    </View>
                  </View>
              </View>

              <Text  style={styles.txtAddress}>Tom, Trung, Rau, Bap</Text>
              <View style={{flexDirection: 'row'}}>
                <Image source={require("../images/price.png")} style={styles.icon}/>
                <View style={{justifyContent: 'center', paddingLeft:10 }}>
                  <Text style={{fontSize: 10}}>60.000 VND</Text>
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
  container: {
    flex: 1,
    backgroundColor: '#a5d6a7',
  },
  title: {
    fontSize: 20,
    color: "#0c2461"
  },
  titleContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  restauContainer: {
    flex:1,
    justifyContent: 'space-around',
    paddingLeft: 5,
    flexWrap: 'wrap'

  },
  restauStyle: {
    marginBottom: 15,
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#95a5a6',
    paddingTop: 10
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
  },

})
