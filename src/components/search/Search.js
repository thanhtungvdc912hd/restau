import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button,
  Image,
  TouchableOpacity,
  Animated,
  FlatList
} from 'react-native';

import SearchHeader from "../search/SearchHeader"
import Restaurant from "../home/Restaurant"
import {connect} from 'react-redux'
import * as actions from '../../actions'

class Search extends Component<{}> {
  constructor () {
    super()
    this.springValue = new Animated.Value(0.3)
  }

  spring () {
    this.springValue.setValue(0.3)
    Animated.spring(
      this.springValue,
      {
        toValue: 1,
        friction: 1
      }
    ).start()
  }

  componentDidMount() {
    this.spring()
  }
  static navigationOptions = ({navigation}) => {
    return {
    title: 'Search Restaurant',
    headerTitle: <SearchHeader/>,
    headerTitleStyle: {
      fontFamily: 'Avenir',
      fontWeight: 'bold',
      fontSize: 17,
    },
  }}

  render() {
    const {searchResult} = this.props
    const dataSource = searchResult ? searchResult : []
    return (
      <Animated.View style={styles.container}>
        <FlatList
          data={dataSource}
          renderItem={({item}) => (
            <Restaurant restaurant={item} key={item.id}/>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </Animated.View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
  searchResult: state.api.searchResult,
  isLogged: state.auth.isLogged
}}
export default connect(mapStateToProps, actions)(Search)

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#43a047',
    flex: 1,
    justifyContent: 'space-between',
    padding: 2,

  },
  icon: {
    width: 15,
    height: 15,
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
})
