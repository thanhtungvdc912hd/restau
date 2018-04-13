import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  Modal
} from 'react-native';
import {connect} from 'react-redux'
import * as actions from '../../actions'

class ImageComment extends Component<{}> {
  state = {
    modalVisible : false
  }

  constructor () {
    super()
    this.springValue = new Animated.Value(0.3)
  }

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
  
  openModal() {
    this.setState({modalVisible:true});
  }

  closeModal() {
    this.setState({modalVisible:false});
  }

  getCommentFromImage(imageId) {
    this.props.getImageComment(imageId)
  }
  render() {
    const {images, comments} = this.props

  	return (
      <View style={styles.container}>
            <FlatList
              data={comments}
              renderItem={({item}) => (
                <View style={{
                    backgroundColor: '#fff',
                    borderTopLeftRadius: 10,
                    borderTopRightRadius: 10,
                    borderBottomLeftRadius: 10,
                    borderBottomRightRadius: 10,
                    marginTop: 5
                    }}>
                <TouchableOpacity onPress={() => this.openModal()}>

                  <View style={{flexDirection: 'row',borderBottomWidth: 1,borderBottomColor: '#43a047', padding: 5}}>
                    <View>
                      <Image source={{uri: url + item.userImage}} style={styles.icon}/>
                    </View>
                    <View style={{flexDirection: 'row', justifyContent:'space-between',alignItems: 'center', flex:1}}>
                      <View>
                        <Text style={styles.txtTitle}>{item.userName}</Text>
                        <Text style={styles.txtTitle}>{item.commentDate}</Text>
                      </View>
                      <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                        <Text style={styles.name}>{item.rate}</Text>
                        <Image source={require("../../images/point.png")} style={styles.icon2}/>
                      </View>
                    </View>
                  </View>
                  <View>
                    <Text style={styles.txtTitle}>{item.title}</Text>
                    <Text style={styles.txtContent}>{item.description}</Text>
                  </View>
                </TouchableOpacity>
                </View>
              )}
              keyExtractor={(item, index) => index.toString()}
            />
            <View>
              <Modal
                animationType="none"
                transparent={true}
                visible={this.state.modalVisible}

              >
                  <TouchableOpacity
                    style={styles.modalContainer}
                    activeOpacity={1}
                    onPress={() => {this.closeModal()}}
                  >
                    <View style={styles.innerContainer}>
                      <TouchableOpacity
                        onPress={() => {this.closeModal()}}
                      >
                      <Text>Close</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => {this.closeModal()}}
                      >
                      <Text>Close</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => {this.closeModal()}}
                      >
                      <Text>Close</Text>
                      </TouchableOpacity>
                    </View>


                  </TouchableOpacity>



              </Modal>
           </View>
      </View>
  	);
  }
}

const mapStateToProps = (state) => {
  return {
  isLoading: state.comment.isLoading,
  comments: state.comment.comments
}}
export default connect(mapStateToProps, actions)(ImageComment);

const url = `http://192.168.64.2/myrestau/images/user/`

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#43a047',
    flex: 1,
  },
  icon: {
    width: 40,
    height: 40,
    borderRadius: 20
  },
  txtTitle: {
    fontSize: 12,
    fontFamily: 'Avenir',
    paddingRight: 5,
    paddingLeft: 5,
    color: '#7f8c8d',
    justifyContent: 'center',
    fontWeight: 'bold'
  },
  txtContent: {
    fontSize: 10,
    fontFamily: 'Avenir',
    paddingRight: 5,
    paddingLeft: 5,
    color: '#7f8c8d',
    justifyContent: 'center'
  },
  icon2: {
    width: 20,
    height: 20,
  },
  name: {
    color: '#0c2461',
    fontFamily: 'Avenir',
    fontSize: 15
  },
  modalContainer: {
   flex: 1,
   justifyContent: 'center',
   backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  innerContainer: {
    justifyContent: 'center',
    backgroundColor: '#fff',
  }
})
