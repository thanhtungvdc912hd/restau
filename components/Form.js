import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  FlatList,
  ScrollView
} from 'react-native';
import { connect } from 'react-redux'
import {isAddingAction, add} from './utils/actionCreator'

class Form extends Component<{}> {
  constructor(props) {
    super(props)
    this.state = {
      en: '',
      vn: ''
    }
  }

  onAdd() {
    const {en, vn} = this.state
    this.props.add(en,vn)
    this.props.isAddingAction()

  }
  render() {

    return (
      <View style={styles.container}>
        <TextInput style={styles.textInput} placeholder='English' value={this.state.en} onChangeText={text => this.setState({en: text})}></TextInput>
        <TextInput style={styles.textInput} placeholder='Vietnamese' value={this.state.vn} onChangeText={text => this.setState({vn: text})}></TextInput>
        <TouchableOpacity onPress={() => {
          this.onAdd()
        }}>
          <Text>Add</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const mapActionToProps = ({
  isAddingAction,
  add
})

export default connect(null,mapActionToProps)(Form);
const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInput: {
    height: 40,
    paddingHorizontal:10,
    margin: 10,
    backgroundColor: 'yellow',
    alignSelf: 'stretch'
  },
})
