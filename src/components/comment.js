import React, { Component, PropTypes } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import autoBind from 'auto-bind';
import Markdown from 'react-native-simple-markdown';

const getResultStyles = (style, showAnswer, correct) => ([
  style,
  showAnswer && correct && styles.correctText,
  showAnswer && !correct && styles.incorrectText,
]);

class Comment extends Component {

  static propTypes = {
    body: PropTypes.string,
    score: PropTypes.number,
    id: PropTypes.string,
    onPress: PropTypes.func,
    correct: PropTypes.bool,
    showAnswer: PropTypes.bool,
  };

  constructor() {
    super();
    autoBind(this);
  }

  onPress() {
    this.props.onPress(this.props.id);
  }

  render() {

    const { correct, showAnswer, body, score } = this.props;

    const containerStyles = [
      styles.container,
      showAnswer && correct && styles.correct,
      showAnswer && !correct && styles.incorrect,
    ];
    const bodyStyles = getResultStyles(styles.body, showAnswer, correct);
    const scoreStyles = getResultStyles(styles.score, showAnswer, correct);

    return (
      <TouchableOpacity onPress={ this.onPress } style={ containerStyles }>
        <Markdown styles={ bodyStyles }>{ body }</Markdown>
        { showAnswer &&
          <Text style={ scoreStyles }>{ score }</Text>
        }
      </TouchableOpacity>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    marginLeft: 5,
    marginRight: 5,
    marginBottom: 10,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 5,
    paddingRight: 5,
    borderWidth: 1,
    borderColor: '#d9d9d9',
  },
  body: {
    fontSize: 16,
  },
  correctText: {
    color: '#3c763d',
  },
  correct: {
    backgroundColor: '#dff0d8',
    borderColor: '#d0e9c6',
  },
  incorrect: {
    backgroundColor: '#f2dede',
    borderColor: '#ebcccc',
  },
  incorrectText: {
    color: '#a94442',
  },
  score: {
    position: 'absolute',
    bottom: 3,
    right: 5,
  }
});

export default Comment;
