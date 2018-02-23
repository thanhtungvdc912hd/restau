import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button,
  Image,
  TouchableOpacity,
  FlatList
} from 'react-native';
import Food from './Food'

export default class Foods extends Component<{}> {
  static navigationOptions = ({navigation}) => ({
    header: null,
  })
  render() {
    const {navigate} = this.props.navigation
    const {goBack} = this.props.navigation
    const {foods} = this.props.navigation.state.params
    if(foods.length == 0){
        return(
        <View><Text>Loading...</Text></View>
        )
    } else {
      return (
        <View style={styles.container}>
          <View style={styles.headerText}>
            <TouchableOpacity onPress={()=> goBack()}>
              <Image source={require("../images/home_r.png")} style={styles.icon}/>
            </TouchableOpacity>
            <Text style={styles.headerTitle}>My Foods</Text>
            <Image source={require("../images/logo.png")} style={styles.icon}/>
          </View>
          <FlatList
            data={foods}
            renderItem={({item}) => (
              <Food navigate={navigate} food={item} key={item.id}/>
            )}
            keyExtractor={(item, index) => index}
          />
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#43a047',
    flex: 1,
    justifyContent: 'space-between'
  },
  title: {
    fontSize: 20,
    color: "#0c2461"
  },
  titleContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10
  },
  headerText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingBottom: 10

  },
  headerTitle: {
    color: '#fff',
    fontFamily: 'Avenir',
    fontSize: 20
  },
  icon: {
    width: 15,
    height: 15,
    justifyContent: 'center'
  },
})
