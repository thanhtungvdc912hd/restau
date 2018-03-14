import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import Signin from "./Signin"
import Signup from "./Signup"

export default class Authentication extends Component<{}> {
  constructor(props) {
    super(props)
    this.state = {
      isSignin : true
    }
  }

  signInClick = () => {
    this.setState({isSignin: true})
  }

  signUpClick = () => {
    this.setState({isSignin: false})
  }

  static navigationOptions = ({navigation}) => ({
  })

  render() {
    const { navigate } = this.props.navigation
    const { goBack } = this.props.navigation

    const {isSignin} = this.state
    const mainJSX = isSignin ? <Signin/> : <Signup/>

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
            <Text style={isSignin ? styles.active : styles.inactive}>SIGN IN</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.signUpClick}
          style={styles.signUp}>
            <Text style={!isSignin ? styles.active : styles.inactive}>SIGN UP</Text>
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
    paddingTop: 30,
    paddingBottom: 30,
    justifyContent: 'space-between',
    paddingHorizontal: 10
  },
  headerText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

  },
  headerTitle: {
    color: '#fff',
    fontFamily: 'Avenir',
    fontWeight: 'bold',
    fontSize: 17
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
