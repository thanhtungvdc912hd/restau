import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image
} from 'react-native';

export default class MyHeader extends Component<{}> {
  render() {

    return (
      <View style={styles.container}>
        <View style={styles.headerText}>
          <TouchableOpacity onPress={()=>{this.props.navigation.goBack()}}>
            <Image source={require("../../images/home_r.png")} style={styles.icon}/>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{this.props.title}</Text>
          <Image source={require("../../images/logo.png")} style={styles.icon}/>
        </View>
        <View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#43a047',
    padding: 10,
    justifyContent: 'space-around'
  },
  headerText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

  },
  headerTitle: {
    color: '#fff',
    fontFamily: 'Avenir',
    fontSize: 20
  },
  icon: {
    width: 24,
    height: 24,
  },
  textSearch: {
    paddingLeft: 10,
    marginTop: 15,
    height: 25,
    backgroundColor: 'white',
  },
})