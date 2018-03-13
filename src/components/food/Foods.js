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
import HeaderRight from '../header/HeaderRight'
import {connect} from 'react-redux'
import * as actions from '../../actions'

class Foods extends Component<{}> {
  static navigationOptions = ({navigation}) => {
    return {
    title: "Menu",
    headerRight: <HeaderRight/>
  }}

  render() {
    const {foods} = this.props.navigation.state.params
    if(foods != null && foods.length == 0){
        return(
        <View><Text>Loading...</Text></View>
        )
    } else {
      return (
        <View style={styles.container}>
          <FlatList
            data={foods}
            renderItem={({item}) => (
              <Food food={item} key={item.id}/>
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      );
    }
  }
}

const mapStateToProps = (state) => {
  return {
  isLoading: state.api.isLoading,
}}
export default connect(mapStateToProps, actions)(Foods)

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#43a047',
    flex: 1,
    justifyContent: 'space-between'
  },
  headerText: {
    paddingHorizontal: 10,
  },
  icon: {
    width: 20,
    height: 20,
    justifyContent: 'center'
  },
  badge: {
    position: 'absolute',
    bottom: 10,
    right: 1,
    height: 20,
    width: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'red'
  }
})
