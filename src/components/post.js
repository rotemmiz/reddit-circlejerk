import React, { PropTypes } from 'react';
import {
  View,
  Animated,
  Text,
  StyleSheet,
  Image,
} from 'react-native';

const Post = ({ height, thumbnail, url, subreddit, title, num_comments, ups }) => {

  return (
    <Animated.View style={ [styles.container, { height }] }>
      <View style={ styles.flexContainer }>
        { thumbnail !== 'self' &&
        <Image
          source={ { uri: url } }
          resizeMode='cover'
          style={{
              width: null,
              flex: 1,
              height: null,
          }}
        />
        }
      </View>
      {/*<View style={ styles.flexContainer }>*/}
        {/*<Text style={ styles.body }>{ title }</Text>*/}
        {/*<View style={ styles.infoContainer }>*/}
          {/*<Text style={ styles.subreddit }>Subreddit: { subreddit }</Text>*/}
          {/*<View style={ styles.moreInfo}>*/}
            {/*<Text style={ styles.comments }>Comments: { num_comments }</Text>*/}
            {/*<Text>Score: { ups }</Text>*/}
          {/*</View>*/}
        {/*</View>*/}
      {/*</View>*/}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    overflow: 'hidden',
  },
  body: {
    fontSize: 20,
  },
  infoContainer: {
    marginTop: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  moreInfo: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  comments: {
    marginRight: 10,
  },
  flexContainer: {
    alignItems: 'stretch',
    flex: 1,
  }
});

Post.propTypes = {
  title: PropTypes.string,
  subreddit: PropTypes.string,
  comments: PropTypes.number,
  ups: PropTypes.number,
  thumbnail: PropTypes.string,
  url: PropTypes.string,
};

export default Post;
