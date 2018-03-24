import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button,
  Image,
  TouchableOpacity,
  FlatList,
  RefreshControl
} from 'react-native';
import Food from './Food'
import HeaderRight from '../header/HeaderRight'
import {connect} from 'react-redux'
import * as actions from '../../actions'

class Foods extends Component<{}> {
  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
      page: 1
    };
  }

  onRefresh() {
    const {foods} = this.props
    const restaurantId = foods[0].restaurantId
    this.setState({refreshing: true});
    const newpage = this.state.page + 1
    this.setState({page: newpage})
    this.goMenu(restaurantId, newpage)
    this.setState({refreshing: false});
  }

  goMenu(restaurantId, page) {
    this.props.getMyMenu(restaurantId, page)
  }

  static navigationOptions = ({navigation}) => {
    return {
    title: "Menu",
    headerRight: <HeaderRight/>
  }}

  render() {
    const {foods} = this.props
    if(foods != null && foods.length == 0){
        return(
        <View><Text>There is no food</Text></View>
        )
    } else {
      const restaurantId = foods[0].restaurantId
      return (
        <View style={styles.container}>
          <FlatList
            data={foods}
            renderItem={({item}) => (
              <Food food={item} key={item.id}/>
            )}
            keyExtractor={(item, index) => index.toString()}

            refreshControl={
               <RefreshControl
                  refreshing={this.state.refreshing}
                  onRefresh={this.onRefresh.bind(this)}
                   title="Pull to refresh"
                   tintColor="#fff"
                   titleColor="#fff"
                />
            }
          />
        </View>
      );
    }
  }
}

const mapStateToProps = (state) => {
  return {
  isLoading: state.api.isLoading,
  foods: state.api.foods,
}}
export default connect(mapStateToProps, actions)(Foods)

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#43a047',
    flex: 1,
    justifyContent: 'space-between'
  },
  headerText: {
    paddingHorizontal: 10,
  },
  icon: {
    width: 20,
    height: 20,
    justifyContent: 'center'
  },
  badge: {
    position: 'absolute',
    bottom: 10,
    right: 1,
    height: 20,
    width: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'red'
  }
})
