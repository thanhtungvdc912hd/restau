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

export default class Notifications extends Component<{}> {
  render() {
    return (
      <View style={styles.container}>
        <Text>My Notifications</Text>
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
