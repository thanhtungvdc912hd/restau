import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button,
  Image,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
  ScrollView
} from 'react-native';
import moment from 'moment'
import BenefitImage from '../benefit/BenefitImage'
import {connect} from 'react-redux'
import * as actions from '../../actions'

class RestaurantDetail extends Component<{}> {
  static navigationOptions = ({navigation}) => ({
    title: navigation.state.params.restaurant.name,
  })

  state = {
    modalVisible: false,
  };

  openModal() {
    this.setState({modalVisible:true});
  }

  closeModal() {
    this.setState({modalVisible:false});
  }

  goBranches() {
    this.props.goBranches(this.props.navigation.state.params.restaurant.branches)
  }

  goFoods(foods) {
    this.props.goFoods(foods, true)
  }
  render() {
    const {restaurant} = this.props.navigation.state.params
    const {branches, benefits, promotions, foods} = restaurant

    const url = `http://192.168.64.2/myrestau/images/restaurant/${restaurant.image}`
    const urlBenefit = `http://192.168.64.2/myrestau/images/icons/`

    let branchesJSX = null
    if (branches != null && branches.length > 1) {
      branchesJSX = (
        <TouchableOpacity style={styles.time} onPress={() => {this.goBranches()}}>
          <Image source={require("../../images/branches.png")} style={styles.icon}/>
          <Text style={styles.txtTime}>{branches.length} chi nhánh</Text>
        </TouchableOpacity>
      )
    }

    let benefitJSX = null
    if (benefits != null && benefits.length > 0) {
      benefitJSX = (
        <TouchableOpacity style={{flex:1, flexDirection:'row'}} onPress={()=> this.openModal()}>
          <Image source={require("../../images/benefit.png")} style={styles.icon}/>
          {benefits.map(benefit => (
            <View style={styles.imageBenefit}  key={benefit.id}>
              <Image source={{uri: urlBenefit+benefit.image}} style={styles.icon}/>
            </View>
          ))}
        </TouchableOpacity>
      )
    }

    let modalJSX = null
    if (benefits != null) {
      modalJSX = (
        <View>
          <Modal
            animationType="fade"
            transparent={true}
            visible={this.state.modalVisible}
            onRequestClose={() => {this.closeModal()}}
          >
            <TouchableOpacity
              style={styles.modalContainer}
              activeOpacity={1}
              onPressOut={() => {this.closeModal()}}
            >
              <ScrollView>
                <TouchableWithoutFeedback>
                  <View style={styles.innerContainer}>
                    {restaurant.benefits.map(benefit => (
                      <BenefitImage benefit={benefit} key={benefit.id}/>
                    ))}
                  </View>
                </TouchableWithoutFeedback>
              </ScrollView>
            </TouchableOpacity>
          </Modal>
       </View>
      )
    }

    let openStatus = null
    var openTime = moment(restaurant.openTime, "hh:mm:ss").format()
    var closeTime = moment(restaurant.closeTime, "hh:mm:ss").format()
    var nowTime = moment().format()
    var openDate = new Date(openTime).getTime()
    var now = new Date(nowTime).getTime()
    var closeDate = new Date(closeTime).getTime()

    if (openDate <= now && now <= closeDate) {
      openStatus = (
        <Image source={require("../../images/open.png")} style={styles.openStatus}/>
      )
    } else {
      openStatus = (
        <Image source={require("../../images/closed.png")} style={styles.openStatus}/>
      )
    }


    return (
      <View style={styles.container}>
        {modalJSX}
        <View style={styles.restauImage}>
          <Image source={{uri: url}} style={styles.image}/>
        </View>
        <View style={styles.detail}>
          <View>
            <View style={styles.nameInfo}>
              <Text style={styles.name}>{restaurant.name}</Text>
              <View style={styles.time}>
                <Image source={require("../../images/address.png")} style={styles.icon}/>
                <Text style={styles.txtTime}>{restaurant.address}</Text>
              </View>

            </View>
            {branchesJSX}
            <View style={styles.time}>
              <Image source={require("../../images/time.png")} style={styles.icon}/>
              <Text style={styles.txtTime}>{restaurant.openTime}</Text>
              <Text style={styles.txtTime}>-</Text>
              <Text style={styles.txtTime}>{restaurant.closeTime}</Text>
              {openStatus}
            </View>
            <View style={styles.time}>
              <Image source={require("../../images/price-tag.png")} style={styles.icon}/>
              <Text style={styles.txtTime}>{restaurant.priceMin}đ</Text>
              <Text style={styles.txtTime}>-</Text>
              <Text style={styles.txtTime}>{restaurant.priceMax}đ</Text>
            </View>

            <View style={styles.time}>
            <TouchableOpacity style={styles.call}>
              <Image source={require("../../images/call.png")} style={styles.icon}/>
              <Text style={styles.txtTime}>{restaurant.tel}</Text>
            </TouchableOpacity>
            </View>

            <View style={styles.time}>
              <Image source={require("../../images/type.png")} style={styles.icon}/>
              <Text style={styles.txtTime}>Nhà hàng Việt Nam</Text>
            </View>

            <View style={styles.time}>
                {benefitJSX}
            </View>

            <View style={styles.time}>
              <TouchableOpacity style={{flex:1, flexDirection:'row'}} onPress = {() => {this.goFoods(foods)}}>
                <Image source={require("../../images/menu.png")} style={styles.icon}/>
                <Text style={styles.txtTime}>Menu</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

      </View>
    );
  }
}


const mapStateToProps = (state) => {
  return {
  isLoading: state.api.isLoading,
  restaurants: state.api.restaurants,
  topPromotions: state.api.topPromotions
}}
export default connect(mapStateToProps, actions)(RestaurantDetail)

const restauWidth= 350
const restauHeight= restauWidth * 640 /960
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#43a047',
    flex: 1,
    justifyContent: 'space-between'
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
    fontSize: 20
  },
  name: {
    color: '#0c2461',
    fontFamily: 'Avenir',
    fontSize: 15
  },
  icon: {
    width: 15,
    height: 15,
    justifyContent: 'center',
    alignItems: 'center',

  },
  openStatus: {
    width: 30,
    height: 30,
  },
  restauImage: {
    paddingTop: 10,
    alignItems: 'center'
  },
  image: {
    height: restauHeight,
    width: restauWidth,
    borderRadius: 20,
  },
  detail: {
    flex:2,
    paddingLeft: 10,
    backgroundColor: '#fff',
    shadowColor: '#2E272B',
    shadowOpacity: 1,
    margin:5,
  },
  time: {
    flexDirection: "row",
    alignItems: 'center',
    paddingTop: 3,
  },
  facility: {
    flexDirection: "row",
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  txtTime: {
    fontSize: 10,
    fontFamily: 'Avenir',
    paddingRight: 5,
    paddingLeft: 5,
    color: '#7f8c8d',
    justifyContent: 'center'

  },
  imageBenefit: {
    paddingRight: 5,
    paddingLeft: 5,
  },
  call: {
    flexDirection: "row",
    alignItems: 'center',
    paddingTop: 5,
  },
  nameInfo: {
    paddingBottom: 5,
    paddingTop: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#95a5a6',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  innerContainer: {
    alignItems: 'flex-start',
    padding: 10,
    margin: 10,
    marginTop: 150,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
})
