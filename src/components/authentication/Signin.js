import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  AsyncStorage
} from 'react-native';
import {connect} from 'react-redux'
import * as actions from '../../actions'
class Signin extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: ''
    }
  }

  onSignIn() {
    const {email, password} = this.state
    this.props.loginMyRestau(email, password)
  }
  render() {
    return (
        <View>
          <TextInput style={styles.input}
            value={this.state.email}
            onChangeText={email => this.setState({email})}
            placeholder='Enter your email'/>
          <TextInput style={styles.input}
            value={this.state.password}
            onChangeText={password => this.setState({password})}
            secureTextEntry
            placeholder='Enter your password'/>
          <TouchableOpacity
            onPress={this.onSignIn.bind(this)}
            style={styles.signInNow}>
            <Text style={styles.headerTitle}>Sign In Now</Text>
          </TouchableOpacity>
        </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
  isLogged: state.auth.isLogged,
}}
export default connect(mapStateToProps, actions)(Signin)

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
