import React, { Component, PropTypes } from 'react';
import R from 'ramda';

import {
  View,
  Text,
  Button,
  ScrollView,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';

import { connect } from 'react-redux';
import autoBind from 'auto-bind';

import * as gamesActions from '../reducers/game/actions';

import Comment from '../components/comment';
import Post from '../components/post';
import Score from '../components/score';

import { getComments, getCurrentPost, getCurrentLevel, getTotalLevels } from '../reducers/game/reducer';

class GameScreen extends Component {

  static propTypes = {
    lives: PropTypes.number,
    score: PropTypes.number,
    loading: PropTypes.bool,
    showAnswer: PropTypes.bool,
    showTitle: PropTypes.bool,
    comments: PropTypes.array,
    post: PropTypes.shape({
      title: PropTypes.string,
    }),
    currentLevel: PropTypes.number,
    totalLevels: PropTypes.number,
  };

  constructor() {
    super();
    autoBind(this);
  }

  onPressComment(commentId) {
    this.props.dispatch(gamesActions.onClickComment(commentId));
  }

  render() {

    const {
      lives, score, currentLevel, totalLevels,
      loading, comments, showTitle, post, showAnswer,
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
      <View style={ styles.container }>
        <Score
          currentLevel={ currentLevel }
          totalLevels={ totalLevels }
          score={ score }
          lives={ lives }
        />
        { loading &&
          <ActivityIndicator
            animating={ loading }
            style={ styles.indicator }
          />
        }
        { showTitle &&
          <Post { ...post } />
        }
        <ScrollView style={ styles.container }>
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
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f3f3f3',
    flex: 1,
  },
  indicator: {
    marginTop: 20,
  },
});

const mapStateToProps = state => {
  return {
    ...R.pick(['showTitle', 'loading', 'lives', 'score', 'showAnswer'], state.game),
    comments: getComments(state.game),
    post: getCurrentPost(state.game),
    currentLevel: getCurrentLevel(state.game),
    totalLevels: getTotalLevels(state.game),
  };
};

export default connect(mapStateToProps)(GameScreen);
