import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  FlatList,
  Image,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  KeyboardAvoidingView,
  Animated, Keyboard
} from 'react-native';
import {connect} from 'react-redux'
import * as actions from '../../actions'
import Carousel, { ParallaxImage } from 'react-native-snap-carousel'
import ImageComment from './ImageComment'
class Gallery extends Component<{}> {
  state = {
    yourComment: "",
    height: 40,
    imageIndex: this.props.navigation.state.params.imageId,

  }
  static navigationOptions = ({navigation}) => {
    const currentIndex = navigation.state.params.index ? navigation.state.params.index + 1 : 1
    return {
    title: 'Photos ( ' + currentIndex + '/' + navigation.state.params.images.length+ ' )',
  }}

  constructor(props) {
    super(props);
    this.keyboardHeight = new Animated.Value(0);
  }

  componentWillReceiveProps(nextProps){
    this.setState({yourComment: nextProps.selectedComment ? nextProps.selectedComment.description : ""})
  }

  componentWillMount () {
    this.keyboardWillShowSub = Keyboard.addListener('keyboardWillShow', this.keyboardWillShow);
    this.keyboardWillHideSub = Keyboard.addListener('keyboardWillHide', this.keyboardWillHide);

  }

  componentWillUnmount() {
    this.keyboardWillShowSub.remove();
    this.keyboardWillHideSub.remove();
  }

  keyboardWillShow = (event) => {
    Animated.parallel([
      Animated.timing(this.keyboardHeight, {
        duration: event.duration,
        toValue: event.endCoordinates.height,
      }),
    ]).start();
  };

  keyboardWillHide = (event) => {
    Animated.parallel([
      Animated.timing(this.keyboardHeight, {
        duration: event.duration,
        toValue: 0,
      }),
    ]).start();
  };


  _renderItem ({item, index}, parallaxProps) {
    return (
        <View style={styles.slide}>
            <Animated.View style={styles.slideInnerContainer}>
              <ParallaxImage source={{uri: url + item.link}}
                containerStyle={styles.image}
                style={styles.image}
                parallaxFactor={0.2}
                {...parallaxProps}/>
            </Animated.View>
        </View>

    );
  }

  getCommentFromImage(imageId) {
    this.props.getImageComment(imageId)
  }

  saveCommentForImage(imageId) {
    const {user} = this.props
    this.state.yourComment ? this.props.saveMyImageComment(imageId, user.id, user.name, user.image,this.state.yourComment) : ''
    Keyboard.dismiss()
    this.setState({yourComment: ""})
  }

  goMyCommentBox() {
    this.props.goMyCommentBox(null)
  }

  render() {
    const {imageId, images} = this.props.navigation.state.params
    const image = images[0]
    const {comments} = this.props

    let imageCommentJSX = null
    if (!this.props.isLoading) {
      imageCommentJSX = (
        <ImageComment comments={this.props.comments}/>
      )
    } else {
      imageCommentJSX = (
        <Text>is Loading ...</Text>
      )
    }
  	return (
      <Animated.View style={[styles.container, { paddingBottom: this.keyboardHeight }]}>
          <View style={styles.restauImage}>
              <Carousel
                ref={(c) => { this._carousel = c; }}
                data={images}
                renderItem={this._renderItem}
                sliderWidth={sliderWidth}
                itemWidth={itemWidth}
                firstItem={images.findIndex(e => e.id === imageId)}
                containerCustomStyle={ {flexGrow: 0}}
                hasParallaxImages={true}
                onSnapToItem={(index) => {
                  let imageIndex = images[index].id
                  this.setState({imageIndex})
                  this.props.navigation.setParams({index})
                  this.getCommentFromImage(imageIndex)
                }}
              />
          </View>
          <View style={{ flex:1, margin: 5}}>
            {imageCommentJSX}
          </View>
          <View style={{flexDirection: 'row'}}>
            <TextInput
              {...this.props}
              multiline={true}
              onContentSizeChange={(event) => {
                let currentHeight = event.nativeEvent.contentSize.height
                currentHeight = currentHeight < 40 ? this.state.height : currentHeight
                  this.setState({ height: currentHeight })
              }}
              style={{height: this.state.height
                , backgroundColor: '#fff',
                borderColor: '#fff',
                width: 340,
                paddingHorizontal: 5
              }}
              value={this.state.yourComment}
              maxLength={255}
              onChangeText={yourComment => this.setState({yourComment})}
              placeholder='Enter your comment'>
            </TextInput>

            <View style={{justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff'}}>
              <TouchableOpacity onPress={() => this.goMyCommentBox()}>
                <Text style={styles.txtTitle}>Post</Text>
              </TouchableOpacity>
            </View>
          </View>
     </Animated.View>
  	);
  }
}

const mapStateToProps = (state) => {
  return {
  isLoading: state.comment.isLoading,
  comments: state.comment.comments,
  user: state.auth.user,
  selectedComment: state.comment.selectedComment
}}
export default connect(mapStateToProps, actions)(Gallery);

const restauWidth= 310
const restauHeight= restauWidth * 640 /960

const url = `http://192.168.64.2/myrestau/images/food/`
const horizontalMargin = 20;
const slideWidth = restauWidth;

const sliderWidth = Dimensions.get('window').width;
const itemWidth = slideWidth + horizontalMargin * 2;
const itemHeight = restauHeight;


const styles = StyleSheet.create({
  slide: {
        width: itemWidth,
        height: itemHeight,
        paddingHorizontal: horizontalMargin,
    },
    slideInnerContainer: {
        width: slideWidth,
        flex: 1,
    },

  container: {
    backgroundColor: '#43a047',
    flex: 1,
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
  },
  image: {
    height: restauHeight,
    width: restauWidth,
    borderRadius: 20,
  },
  detail: {
    flex:2,
    paddingHorizontal: 10,
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
  txtTitle: {
    fontSize: 15,
    fontFamily: 'Avenir',
    paddingRight: 10,
    color: '#7f8c8d',
    fontWeight: 'bold',
  },
  txtContent: {
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
    flexDirection: 'row',
    justifyContent: 'space-between',
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
  headerText: {
    paddingHorizontal: 10,
  },
  icon: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  icon2: {
    width: 20,
    height: 20,
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
