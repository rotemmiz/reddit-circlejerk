import React, { Component, PropTypes } from 'react';

import {
  View,
  Text,
  Button,
  ScrollView,
  ActivityIndicator,
  StyleSheet,
  Animated,
  Dimensions,
} from 'react-native';

import { connect } from 'react-redux';
import autoBind from 'auto-bind';

import * as gamesActions from '../reducers/game/actions';

import Comment from '../components/comment';
import Post from '../components/post';
import Score from '../components/score';

import {
  getComments, getCurrentPost, getScoreInfo, getSettings, getLoading
} from '../reducers/game/reducer';

const window = Dimensions.get('window');

const HEADER_MAX_HEIGHT = window.height;
const INITIAL_SCROLL = 300;

class GameScreen extends Component {

  static navigatorStyle = {
    drawUnderNavBar: false,
    navBarTranslucent: false,
    navBarButtonColor: '#00adf5',
    tabBarHidden: true
  };

  static propTypes = {
    loading: PropTypes.bool,
    showAnswer: PropTypes.bool,
    showPost: PropTypes.bool,
    comments: PropTypes.array,
    post: PropTypes.shape({
      title: PropTypes.string,
    }),
    scoreInfo: PropTypes.object,
  };

  constructor() {
    super();
    autoBind(this);

    this.state = {
      scrollY: new Animated.Value(INITIAL_SCROLL),
    };
  }

  onPressComment(commentId) {
    this.props.dispatch(gamesActions.onClickComment(commentId));
  }

  render() {

    const headerHeight = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_MAX_HEIGHT],
      outputRange: [HEADER_MAX_HEIGHT, 0],
    });

    const {
      scoreInfo, loading, comments, showPost, post, showAnswer,
    } = this.props;

    if (comments.length === 0) {
      return (
        <ActivityIndicator
          animating={ loading }
          style={ styles.indicator }
        />
      );
    }

    return (
      <View testID='container' style={ styles.container }>
        <Score { ...scoreInfo } />
        { loading &&
          <ActivityIndicator
            animating={ loading }
            style={ styles.indicator }
          />
        }
        <View style={ styles.container }>
          <ScrollView
            scrollEventThrottle={ 16 }
            showsVerticalScrollIndicator={ false }
            contentOffset={ { y: INITIAL_SCROLL } }
            onScroll={
              Animated.event([
                { nativeEvent: { contentOffset: { y: this.state.scrollY } } }
              ])
            }
            style={ styles.container }
          >
            <View style={ styles.scrollContainer }>
              { !loading &&
              comments.map(comment =>
                <Comment
                  { ...comment }
                  key={ comment.id }
                  showAnswer={ showAnswer }
                  onPress={ this.onPressComment }
                />
              )
              }
            </View>
          </ScrollView>
          { showPost &&
            <Post { ...post } height={headerHeight} />
          }
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f3f3f3',
    flex: 1,
  },
  scrollContainer: {
    backgroundColor: '#f3f3f3',
    marginTop: HEADER_MAX_HEIGHT,
    paddingTop: 5,
  },
  indicator: {
    marginTop: 20,
  },
});

const mapStateToProps = state => {
  return {
    scoreInfo: getScoreInfo(state),
    ...getSettings(state),
    loading: getLoading(state),
    comments: getComments(state),
    post: getCurrentPost(state),
  };
};

export default connect(mapStateToProps)(GameScreen);
