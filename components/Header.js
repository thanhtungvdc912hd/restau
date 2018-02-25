import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button,
  Image,
  TouchableOpacity,
  FlatList,
  ScrollView
} from 'react-native';
import { connect } from 'react-redux'
import {isAddingAction} from './utils/actionCreator'
class Header extends Component<{}> {
  render() {
    const textAdd = this.props.myAdding ? '-' : '+'
    return (
      <View style={styles.container}>
        <Text/>
        <Text>MY WORD</Text>
        <TouchableOpacity onPress={() => {
          this.props.isAddingAction()
        }}>
          <Text style={{fontSize: 20}}>{textAdd}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  myAdding: state.isAdding
})
const mapActionToProps = ({
  isAddingAction
})
export default connect(mapStateToProps,mapActionToProps)(Header);
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,

    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
})
