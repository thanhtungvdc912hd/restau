import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image
} from 'react-native';

export default class MyHeaderMain extends Component<{}> {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.headerText}>
          <TouchableOpacity onPress={()=>{this.props.navigation.navigate('DrawerOpen')}}>
            <Image source={require("../images/menu2.png")} style={styles.icon}/>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>My Restaurant</Text>
          <Image source={require("../images/logo.png")} style={styles.icon}/>
        </View>
        <TextInput style={styles.textSearch}
          placeholder = "What do you want to eat?"
        />

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#43a047',
    flex: 0.1,
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
