import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';

export default class Signin extends Component<{}> {
  render() {
    return (
        <View>
          <TextInput style={styles.input} placeholder='Enter your email'/>
          <TextInput style={styles.input} placeholder='Enter your password'/>
          <TouchableOpacity
          style={styles.signInNow}>
            <Text style={styles.headerTitle}>Sign In Now</Text>
          </TouchableOpacity>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  headerTitle: {
    color: '#fff',
    fontFamily: 'Avenir',
    fontWeight: 'bold',
    fontSize: 17
  },
  input: {
    height: 50,
    backgroundColor: '#fff',
    marginBottom:10,
    borderRadius: 75,
    paddingLeft: 20
  },
  signInNow: {
    height: 50,
    borderColor: '#fff',
    borderWidth: 1,
    borderRadius: 75,
    alignItems: 'center',
    justifyContent: 'center'
  }
})
