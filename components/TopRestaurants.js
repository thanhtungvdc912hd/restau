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
import Restaurant from './Restaurant'

export default class TopRestaurants extends Component<{}> {
  render() {
    const {restaurants} = this.props
    const {navigate} = this.props
    if(restaurants.length == 0){
        return(
        <View><Text>Loading...</Text></View>
        )
    } else {
      return (
        <View style={styles.container}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Top Restaurants</Text>
          </View>
          <FlatList
            data={restaurants}
            renderItem={({item}) => (
              <Restaurant navigate={navigate} restaurant={item} key={item.id}/>
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
