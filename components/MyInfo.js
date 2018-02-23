import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button,
  Image
} from 'react-native';

export default class MyInfo extends Component<{}> {
  static navigationOptions = ({ navigation }) => ({
    title: `Hello, ${navigation.state.params.username}`,
  });
  render() {
    const { navigate } = this.props.navigation
    return (
      <View style={styles.container}>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e17055',
  },
  icon: {
    width: 24,
    height: 24,
  },
})
