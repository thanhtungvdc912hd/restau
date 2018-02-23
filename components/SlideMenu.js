import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity
} from 'react-native';

export default class SlideMenu extends Component<{}> {
  constructor(props) {
    super(props)
    this.state = {
      isLoggedIn : true
    }
  }
  render() {
    const { navigate } = this.props.navigation

    const logInJSX = (
      <View>
        <TouchableOpacity style={styles.btnStyle}
        onPress={() => navigate('Authentication')}>
          <Text style={styles.btnText}>Sign In</Text>
        </TouchableOpacity>
      </View>
    )

    const logOutJSX = (
      <View style={styles.logInContainter}>
        <Text style={styles.username}>Dao Thanh Tung</Text>
        <View style={styles.logInController}>
          <TouchableOpacity style={styles.btnStyleSignIn}
            onPress={() => navigate('OrderHistories')}>
            <Text style={styles.btnText}>Order History</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnStyleSignIn}
            onPress={() => navigate('MyInfo',{username: 'Tung'})}>
            <Text style={styles.btnText}>Your Info</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnStyleSignIn}>
            <Text style={styles.btnText}>Sign out</Text>
          </TouchableOpacity>
        </View>
      </View>
    )

    const myMenu = this.state.isLoggedIn ? logOutJSX : logInJSX
    return (
      <View style={styles.container}>
      <Image
        source={require('../images/profile_o.png')}
        style={styles.image}
      />
      {myMenu}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#43a047',
    borderRightWidth: 1,
    borderColor: '#fff',
    alignItems: 'center'
  },
  image: {
    marginTop: 20,
    height: 150,
    width: 150,
    marginVertical: 30
  },
  btnStyle: {
    height: 40,
    width:250,
    backgroundColor: '#fff',
    justifyContent: 'center',
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 5

  },
  btnStyleSignIn: {
    height: 40,
    width:250,
    backgroundColor: '#fff',
    justifyContent: 'center',
    borderRadius: 10,
    paddingLeft: 10,
    marginVertical: 5

  },
  btnText: {
    color: '#43a047',
    fontSize: 15
  },
  username: {
    color: '#fff'
  },
  logInContainter: {
    alignItems: 'center',
  },
  logInController: {
    flex: 0.5,
    justifyContent: 'space-between'
  }
})
