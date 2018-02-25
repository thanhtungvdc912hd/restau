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
import TestRedux2 from './TestRedux2'
import Header from './Header'
import Form from './Form'
import { connect } from 'react-redux'
import getTemp from './utils/getTemp'
import {fetchThunk} from './utils/actionCreator'
class TestReduxAPI extends Component<{}> {
  constructor(props) {
    super(props)
    this.state = {
      cityName: '',
      temp: ''
    }
  }

  myGetTemp(){
    const {cityName} =this.state
    this.props.fetchThunk(cityName)
  }

  weatherMessage() {
    const {error, cityName, temp, isLoading} = this.props
    if(isLoading) return '...loading'
    if(error) return 'Please try again'
    if(!cityName) return 'Please enter a city name'
    return `${cityName} is ${temp} oC`
  }
  render() {
    return (
      <View style={styles.container}>
        <Text>{this.weatherMessage()}</Text>
        <TextInput style={{height: 40, margin: 10,backgroundColor: 'white', alignSelf: 'stretch', justifyContent: 'center'}}
        placeholder='English'
        value={this.state.cityName}
        onChangeText={text => this.setState({cityName: text})}
        ></TextInput>
        <Text style={styles.textInput}>{this.state.temp}</Text>
        <TouchableOpacity onPress={()=> this.myGetTemp()}>
          <Text>Get</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#a5d6a7',
    justifyContent: 'center',
    alignSelf: 'stretch',
    alignItems: 'center'
  },
  textInput: {
    height: 40,
    paddingHorizontal:10,
    margin: 10,
    backgroundColor: 'yellow',
    alignSelf: 'stretch'
  },
})


const mapStateToProps = state => ({
  cityName: state.cityName,
  temp: state.temp,
  error: state.error,
  isLoading: state.isLoading
})

const mapActionToProps = ({
  fetchThunk
})
export default connect(mapStateToProps, mapActionToProps)(TestReduxAPI);
