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
  Modal,
  Animated
} from 'react-native';
import {connect} from 'react-redux'
import * as actions from '../../actions'

var deviceWidth = Dimensions.get('window').width

class ImageComment extends Component<{}> {
  state = {
    modalVisible : false,
    heightValue : new Animated.Value(-100),
    commentId : null
  }

  openModal(userId, commentId) {
    if (this.props.user.id === userId) {
      this.setState({modalVisible:true});
      Animated.timing(this.state.heightValue, {
          duration: 300,
          toValue: 200
       }).start(() => {this.setState({commentId})})
    }
  }

  closeModal() {
    Animated.timing(this.state.heightValue, {
        duration: 300,
        toValue: -100
     }).start(() => {this.setState({ modalVisible: false })})
  }

  getCommentFromImage(imageId) {
    this.props.getImageComment(imageId)
  }

  deleteMyComment() {
    if (this.state.commentId !== null) {
      this.props.deleteMyComment(this.state.commentId)
    }
  }

  goMyCommentBox() {
    this.props.goMyCommentBox(this.state.commentId)
    this.closeModal()
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
                <TouchableOpacity onPress={() => {this.openModal(item.userId, item.id)}}>
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
                    <Animated.View style={[styles.innerContainer,{height: this.state.heightValue}]}>
                      <TouchableOpacity onPress={() => {this.goMyCommentBox()}}
                      style={{alignItems: 'center', justifyContent: 'center',
                        borderBottomWidth: 1,
                        borderBottomColor: '#43a047',
                        width: deviceWidth,
                      height: 50}}
                      >
                        <Text style={[styles.txtTitle,{color: '#43a047'}]}>EDIT</Text>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => {this.deleteMyComment()}}
                        style={{alignItems: 'center', justifyContent: 'center',
                          width: deviceWidth,
                        height: 50}}>

                        <Text style={[styles.txtTitle,{color: 'tomato'}]}>DELETE</Text>
                      </TouchableOpacity>

                      <View>
                      </View>
                    </Animated.View>
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
  comments: state.comment.comments,
  user: state.auth.user
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
   backgroundColor: 'rgba(0, 0, 0, 0.1)',
   alignItems: 'center'
  },
  innerContainer: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    alignItems: 'center',
    backgroundColor: '#fff',
    width: deviceWidth - 10,
    position: 'absolute',
    bottom:-100,
  },
})
