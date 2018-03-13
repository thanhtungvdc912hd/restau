import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button,
  Image,
  TouchableOpacity,
  FlatList
} from 'react-native';
import Restaurant from './Restaurant'

export default class Restaurants extends Component {
  static navigationOptions = ({navigation}) => ({
    title: "Branches"
  })
  render() {
    const {restaurants, navigation} = this.props
    const dataSource = restaurants ? restaurants : navigation.state.params.restaurants
    if(dataSource == null){
        return(
        <View><Text>Loading...</Text></View>
        )
    } else {
      return (
        <View style={styles.container}>
          <FlatList
            data={dataSource}
            renderItem={({item}) => (
              <Restaurant restaurant={item} key={item.id}/>
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#a5d6a7',
    margin: 2,
    shadowColor: '#2E272B',
    shadowOpacity: 1
  },
  title: {
    fontSize: 20,
    color: "#0c2461"
  },
  titleContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10
  }
})
