import React, { Component, PropTypes } from 'react';

import {
  View,
  Text,
  Button
} from 'react-native';

import { connect } from 'react-redux';
import autoBind from 'auto-bind';

import * as searchActions from '../reducers/search/actions';

class MainScreen extends Component {

  constructor() {
    super();
    autoBind(this);
  }

  componentWillMount() {
    this.props.dispatch(searchActions.onClickRandom());
    this.props.navigator.push({
      screen: 'reci.GameScreen',
      title: 'Game'
    });
  }

  onPressRandom() {
    this.props.dispatch(searchActions.onClickRandom());
    this.props.navigator.push({
      screen: 'reci.GameScreen',
      title: 'Game'
    })
  }

  render() {
    return (
      <View>
        <Button
          onPress={ this.onPressRandom }
          title="Random"
          accessibilityLabel="Select random subreddit"
        />
      </View>
    );
  }
}

MainScreen.propTypes = {
  search: PropTypes.shape({
    name: PropTypes.string,
  }),
};

const mapStateToProps = state => ({
  search: state.search
});

export default connect(mapStateToProps)(MainScreen);
