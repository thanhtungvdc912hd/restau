import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import register from "../../utils/register"
export default class Signup extends Component<{}> {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      email : '',
      password: '',
      repassword: ''
    }
  }

  resgisterUser() {
    const {name, email, password} = this.state
    register(email, name, password)
    .then(res => {
      if (res === 'THANH_CONG') return this.onSuccess()
      this.onFail()
    })
  }

  onSuccess() {
    Alert.alert(
      'Notice',
      'Sign up successfully',
      [
        {text: "OK", onPress: () => this.props.gotoSignIn()}
      ],
      {cancelable: false}
    )
  }

  onFail() {
    Alert.alert(
      'Notice',
      'Email has been used.',
      [
        {text: "OK", onPress: () => this.setState({email: ''})}
      ],
      {cancelable: false}
    )
  }
  render() {
    return (
        <View>
          <TextInput style={styles.input}
          value={this.state.name}
          onChangeText={name => this.setState({name})}
          placeholder='Enter your name'/>
          <TextInput style={styles.input}
          value={this.state.email}
          onChangeText={email => this.setState({email})}
          placeholder='Enter your email'/>
          <TextInput style={styles.input}
          value={this.state.password}
          onChangeText={password => this.setState({password})}
          secureTextEntry
          placeholder='Enter your password'/>
          <TextInput style={styles.input}
          value={this.state.repassword}
          onChangeText={repassword => this.setState({repassword})}
          secureTextEntry
          placeholder='Re-enter your password'/>
          <TouchableOpacity
          onPress={() => this.resgisterUser()}
          style={styles.signInNow}>
            <Text style={styles.headerTitle}>Sign Up Now</Text>
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
