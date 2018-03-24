import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button,
  Image,
  TouchableOpacity,
  StatusBar,
  TextInput,
  LayoutAnimation,
  NativeModules,
  Animated,
  Easing
} from 'react-native';
import {connect} from 'react-redux'
import * as actions from '../../actions'

class SearchHeader extends Component<{}> {
  constructor () {
    super()
    this.springValue = new Animated.Value(0.3)
  }
  state = {
      onFocusText: false,
      txtSearch : ""
  }

  handleFocus = () => this.setState({ onFocusText: true });
  handleBlur = () => this.setState({ onFocusText: false });

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

  onSearchRestaurant() {
    this.props.mySearchRestaurant(this.state.txtSearch)
  }
  render() {
    const cancelButtonJSX = (
      <View style={{marginLeft: 10}}>
        <TouchableOpacity onPress={() => {
            this.refs.input.blur();
            this.handleBlur()
          }}>
          <Animated.Text style={{color: '#fff', transform: [{scale: this.springValue}]}}>Cancel</Animated.Text>
        </TouchableOpacity>
      </View>
    )

    const placeJSX = (
      <View>
        <TouchableOpacity style={styles.placeButton}>
          <Text>in HCM </Text>
        </TouchableOpacity>
      </View>
    )

    const cancelButton = this.state.onFocusText ? cancelButtonJSX : <View></View>
    const place = this.state.onFocusText ? <View></View> : placeJSX

      return (
        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingLeft:120}}>
        <View style={{height: 30, backgroundColor: '#fff',paddingHorizontal: 5,alignItems: 'center', justifyContent: 'center',   borderBottomLeftRadius: 5,
          borderTopLeftRadius: 5,}}>
          <Image source={require("../../images/search.png")} style={[styles.icon,{tintColor: 'tomato'}]}/>
        </View>
        <View style={{alignItems: 'center', justifyContent: 'center'}}>

        <TextInput
          placeholder="search"
          onFocus={() => {
            this.spring()
            this.handleFocus()
          }}
          onChangeText={txtSearch => this.setState({txtSearch})}
          onSubmitEditting={this.onSearchRestaurant()}
          ref="input"
          style={{
            height: 30,
            width: 250,
            borderColor: 'white',
            backgroundColor : '#fff',
          }} />
          </View >
          {place}
          {cancelButton}
        </View>
      )

  }
}

const mapStateToProps = (state) => {
  return {
  isLogged: state.auth.isLogged,
}}
export default connect(mapStateToProps, actions)(SearchHeader)

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#43a047',
    flex: 1,
    paddingTop: 30,
    paddingBottom: 30,
    justifyContent: 'space-between',
    paddingHorizontal: 10
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
  placeButton: {
    height: 30,
    borderBottomRightRadius: 5,
    borderTopRightRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff'
  }
})
