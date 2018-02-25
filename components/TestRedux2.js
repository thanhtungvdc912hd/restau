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

class TestRedux2 extends Component<{}> {
  render() {
    const {en, vn, saved} = this.props.word
    const textDecorationLine = saved ? 'line-through' : 'none'
    const saveText = saved ? 'Saved' : 'Save'
    return (
      <View style={styles.container}>
        <Text style={{textDecorationLine}}>{en}</Text>
        <Text style={{textDecorationLine}}>{vn}</Text>
        <TouchableOpacity onPress={() => {
          this.props.dispatch({type: 'SAVE', id: this.props.word.id})
        }}>
          <Text>{saveText}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  myFilter: state.filterShow,
})

export default connect(mapStateToProps)(TestRedux2);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    margin: 10,
    flexDirection: 'row',
    backgroundColor: 'yellow',
    justifyContent: 'space-between'
  },
})
