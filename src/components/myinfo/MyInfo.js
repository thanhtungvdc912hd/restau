import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image
} from 'react-native';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { NavigationActions } from 'react-navigation';
class MyInfo extends Component<{}> {
  static navigationOptions = ({ navigation }) => ({
    title: 'My Info',
    drawerIcon: ({ tintColor }) => (
      <Image
        source={require('../../images/profile_o.png')}
        style={[styles.icon, {tintColor: tintColor}]}
      />
    ),
  });

  handleIncrease = () => {
        this.props.counterIncrease();
    };

    handleDecrease = () => {
        this.props.counterDecrease();
    };

    goHome = () => {
        this.props.goHome("tung")
    };



  render() {
    const { navigate } = this.props.navigation
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this.handleIncrease}>
          <Text>Click ME</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.goHome}>
          <Text>Go HOME</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default connect(null, actions)(MyInfo);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e17055',
  },
  icon: {
    width: 24,
    height: 24,
  },
})
