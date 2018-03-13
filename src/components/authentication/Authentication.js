import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
} from 'react-native';
import MyHeader from "./MyHeader"

export default class Authentication extends Component<{}> {
  constructor(props) {
    super(props)
    this.state = {
      isLoggedIn : false
    }
  }

  signInClick = () => {
    this.setState({isLoggedIn: false})
  }

  signUpClick = () => {
    this.setState({isLoggedIn: true})
  }

  static navigationOptions = ({navigation}) => ({
    header: null,//<MyHeader navigation = {navigation}/>,
})

  render() {
    const { navigate } = this.props.navigation
    const { goBack } = this.props.navigation
    const signInJSX = (
      <View>
        <TextInput
        <TextInput style={styles.input} placeholder='Enter your email'/>
        <TextInput style={styles.input} placeholder='Enter your password'/>
        <TouchableOpacity onPress={()=>{navigate()}}
        style={styles.signInNow}>
          <Text style={styles.headerTitle}>Sign In Now</Text>
        </TouchableOpacity>
      </View>
    )
    const signUpJSX = (
      <View>
        <TextInput style={styles.input} placeholder='Enter your name'/>
        <TextInput style={styles.input} placeholder='Enter your email'/>
        <TextInput style={styles.input} placeholder='Enter your password'/>
        <TextInput style={styles.input} placeholder='Re-enter your password'/>
        <TouchableOpacity onPress={()=>{this.props.navigation.navigate('Main')}}
        style={styles.signInNow}>
          <Text style={styles.headerTitle}>Sign Up Now</Text>
        </TouchableOpacity>
      </View>
    )
    const {isLoggedIn} = this.state
    const mainJSX = isLoggedIn ? signUpJSX : signInJSX

    return (
      <View style={styles.container}>
        <View style={styles.headerText}>
          <TouchableOpacity onPress={()=>{goBack()}}>
            <Image source={require("../../images/home_r.png")} style={styles.icon}/>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>My Restaurant</Text>
          <Image source={require("../../images/logo.png")} style={styles.icon}/>
        </View>
        {mainJSX}
        <View style={styles.controller}>
          <TouchableOpacity onPress={this.signInClick}
          style={styles.signIn}>
            <Text style={!isLoggedIn ? styles.active : styles.inactive}>SIGN IN</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.signUpClick}
          style={styles.signUp}>
            <Text style={isLoggedIn ? styles.active : styles.inactive}>SIGN UP</Text>
          </TouchableOpacity>
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
  controller: {
    flexDirection: 'row',
    alignSelf: 'stretch'
  },
  signIn: {
    flex:1,
    alignItems: 'center',
    paddingVertical: 15,
    borderTopLeftRadius: 75,
    borderBottomLeftRadius: 75,
    backgroundColor: '#fff',
    marginRight: 2
  },
  signUp: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 15,
    borderTopRightRadius: 75,
    borderBottomRightRadius: 75,
    backgroundColor: '#fff'

  },
  active: {
    color: '#27ae60'
  },
  inactive: {
    color: '#bdc3c7'
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
