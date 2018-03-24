import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image
} from 'react-native';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { NavigationActions } from 'react-navigation';
class MyInfo extends Component<{}> {
  constructor(props) {
    super(props)
    this.state = {
      name: null,
      email: null,
      birthday: null,
      tel: null,
      address: null
    }
  }
  static navigationOptions = ({ navigation }) => ({
    title: 'My Info',
  });

  changeInfo = () => {
      const {name, birthday, tel, address} = this.state
      this.props.changeMyInfo(name, tel, address, birthday);
    };

    handleDecrease = () => {
        this.props.counterDecrease();
    };

    goHome = () => {
        this.props.goHome("tung")
    };

  componentDidMount() {
    const {user} = this.props
    if (user != null) {
    this.setState({
      name: user.name,
      email: user.email,
      birthday: user.birthday,
      tel: user.tel,
      address: user.address,
    })
  }
  }

  render() {
    const { navigate } = this.props.navigation
    const {user} = this.props
    return (
      <View style={styles.container}>
        <View style={styles.containerProfileImage}>
          <Image
            source={require('../../images/profile_o.png')}
            style={styles.image}
          />
          <TextInput
            style={styles.headerTitle}
            value={this.state.name}
            numberOfLines={1}
            onChangeText={name => this.setState({name})}
            placeholder='Enter your name'>

          </TextInput>
        </View>

        <View style={styles.detail}>
          <View style={styles.line}>
            <Image source={require("../../images/mail.png")} style={styles.icon}/>
              <Text
                style={styles.txtLine}
                >{this.state.email}
            </Text>
          </View>
          <View style={styles.line}>
            <Image source={require("../../images/birthday.png")} style={styles.icon}/>
              <TextInput
                style={styles.txtLine}
                value={this.state.birthday}
                onChangeText={birthday => this.setState({birthday})}
                placeholder='Enter your birthday'>
            </TextInput>
          </View>
          <View style={styles.line}>
            <Image source={require("../../images/tel.png")} style={styles.icon}/>
            <TextInput
              style={styles.txtLine}
              value={this.state.tel}
              onChangeText={tel => this.setState({tel})}
              placeholder='Enter your phone'>
          </TextInput>
          </View>
          <View style={styles.line}>
            <Image source={require("../../images/addressHome.png")} style={styles.icon}/>
              <TextInput
                style={styles.txtLine}
                value={this.state.address}
                onChangeText={address => this.setState({address})}
                placeholder='Enter your address'>
            </TextInput>
          </View>

        </View>
        <View style={{marginHorizontal: 5}}>
          <TouchableOpacity
            onPress={this.changeInfo}
            style={styles.signInNow}>
            <Text style={styles.headerTitle}>CHANGE INFO</Text>
          </TouchableOpacity>
        </View>


      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
  isLogged: state.auth.isLogged,
  user: state.auth.user
}}
export default connect(mapStateToProps, actions)(MyInfo);

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#43a047',
    flex: 1,
  },
  image: {
    marginTop: 20,
    height: 150,
    width: 150,
    marginVertical: 10
  },
  containerProfileImage: {
    alignItems: 'center',
  },
  detail: {
    flex:1,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    marginHorizontal:5,
    borderRadius: 10
  },
  icon: {
    width: 15,
    height: 15,
  },
  line: {
    flexDirection: "row",
    alignItems: 'center',
    paddingTop: 3,
  },
  txtLine: {
    fontSize: 13,
    fontFamily: 'Avenir',
    paddingRight: 5,
    paddingLeft: 5,
    color: '#7f8c8d',
    justifyContent: 'center',
    flex: 1
  },
  headerText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10
  },
  headerTitle: {
    color: '#fff',
    fontFamily: 'Avenir',
    fontWeight: 'bold',
    fontSize: 17,
    textAlign: 'center',
    width: 300
  },
  signInNow: {
    height: 50,
    borderColor: '#fff',
    backgroundColor: '#43a047',
    borderWidth: 1,
    borderRadius: 75,
    alignItems: 'center',
    justifyContent: 'center'
  }
})
