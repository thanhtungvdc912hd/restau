import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button,
  Image,
  TouchableOpacity,
  StatusBar
} from 'react-native';

export default class PromotionDetail extends Component<{}> {
  static navigationOptions = ({navigation}) => ({
    header: null,
  })
  render() {
    const {goBack} = this.props.navigation
    return (
      <View style={styles.container}>
        <View style={styles.headerText}>
          <TouchableOpacity onPress={()=> goBack()}>
            <Image source={require("../images/home_r.png")} style={styles.icon}/>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>My Restaurant</Text>
          <Image source={require("../images/logo.png")} style={styles.icon}/>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#43a047',
    flex: 1,
    padding: 10,
    justifyContent: 'space-between',

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
})
