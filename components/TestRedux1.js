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
import TestRedux2 from './TestRedux2'
import Header from './Header'
import Form from './Form'
import { connect } from 'react-redux'

class TestRedux1 extends Component<{}> {

  getTextStyle(statusName) {
    const {myFilter} = this.props
    if (myFilter === statusName) return {color: 'yellow', fontWeight: 'bold'}
  }
  setFilterStatus(actionType) {
    return this.props.dispatch({type: actionType})
  }

  words() {
    const {myFilter, myWords, myAdding} = this.props
    if (myFilter === 'SHOW_ALL') return myWords
    if (myFilter === 'SHOW_SAVED') return myWords.filter(e => e.saved)
    if (myFilter === 'SHOW_ISSHOW') return myWords.filter(e => e.isShow)
  }
  render() {
    return (
      <View style={styles.container}>
        <Header/>
        {this.props.myAdding ? <Form/> : null}
        <FlatList
          data={this.words()}
          renderItem={({item}) => (
            <TestRedux2 word={item}/>
          )}
          keyExtractor={(item, index) => index.toString()}
        />

        <View style={{backgroundColor: 'red', flexDirection: 'row',  justifyContent: 'space-around'}}>
          <TouchableOpacity onPress= {() => this.setFilterStatus('FILTER_SHOW_ALL')}>
            <Text style={this.getTextStyle('SHOW_ALL')}>SHOW ALL</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress= {() => this.setFilterStatus('FILTER_SHOW_SAVED')}>
            <Text style={this.getTextStyle('SHOW_SAVED')}>SHOW SAVED</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress= {() => this.setFilterStatus('FILTER_SHOW_ISSHOW')}>
            <Text style={this.getTextStyle('SHOW_ISSHOW')}>SHOW ISSHOW</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    flex: 1,
    backgroundColor: '#a5d6a7',
  },
})


const mapStateToProps = state => ({
  myFilter: state.filterShow,
  myWords: state.words,
  myAdding: state.isAdding
})

export default connect(mapStateToProps)(TestRedux1);
