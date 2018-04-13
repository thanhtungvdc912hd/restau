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
import MapView from 'react-native-maps';
class MapInfo extends Component<{}> {
  static navigationOptions = ({ navigation }) => {
    return {
    title: navigation.state.params.name,
  }};

  render() {
    return (
      <View style={styles.container}>
        <MapView style={styles.map}
          initialRegion={{
            latitude: this.props.location.lat,
            longitude: this.props.location.lng,
            latitudeDelta: 0.002,
            longitudeDelta: 0.002
          }}>
            <MapView.Marker coordinate={{latitude: this.props.location.lat, longitude: this.props.location.lng}}>
              <MapView.Callout>
                <View>
                  <Text>This is a plain view</Text>
                </View>
              </MapView.Callout>
            </MapView.Marker>
        </MapView>

      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
  location: state.map.location,
  isMapReady: state.map.isReady,
}}
export default connect(mapStateToProps, actions)(MapInfo);

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#43a047',
    flex: 1,
  },
  map: {
    flex: 1
  }
})
