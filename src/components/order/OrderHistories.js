import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button,
  Image,
  FlatList,
  ScrollView
} from 'react-native';
import OrderHistory from './OrderHistory'
import {connect} from 'react-redux'
import * as actions from '../../actions'
class OrderHistories extends Component<{}> {
  static navigationOptions = ({navigation}) => ({
    title: "Order History"

  })
  componentDidMount() {
    this.props.getMyOrderHistory()
  }
  render() {
    const orderHistories = this.props.orderHistories ? this.props.orderHistories : []
    return (
      <View style={styles.container}>
        <FlatList
          data={orderHistories}
          renderItem={({item}) => (
            <OrderHistory orderHistory={item} key={item.id}/>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
  orderHistories: state.api.orderHistory
}}
export default connect(mapStateToProps, actions)(OrderHistories)
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#43a047',
    flex: 1,
  },
  headerText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 50,
    padding: 10
  },
  headerTitle: {
    color: '#fff',
    fontFamily: 'Avenir',
    fontSize: 20
  },
  icon: {
    width: 24,
    height: 24,
  },
})
