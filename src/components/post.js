import React, { PropTypes } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
} from 'react-native';

const Comments = ({ thumbnail, url, subreddit, title, num_comments, ups }) => {

  console.log(url);

  return (
    <View style={ styles.container }>
      <View style={ styles.flexContainer }>
        { thumbnail !== 'self' &&
        <Image
          source={ { uri: url } }
          style={{
              width: 150,
              height: 100,
            }}
        />
        }
      </View>
      <View style={ styles.flexContainer }>
        <Text style={ styles.body }>{ title }</Text>
        <View style={ styles.infoContainer }>
          <Text style={ styles.subreddit }>Subreddit: { subreddit }</Text>
          <View style={ styles.moreInfo}>
            <Text style={ styles.comments }>Comments: { num_comments }</Text>
            <Text>Score: { ups }</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 10,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 5,
    paddingRight: 5,
    borderRadius: 3,
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
    flex: 1,
  }
});

Comments.propTypes = {
  title: PropTypes.string,
  subreddit: PropTypes.string,
  comments: PropTypes.number,
  ups: PropTypes.number,
  thumbnail: PropTypes.string,
  url: PropTypes.string,
};

export default Comments;
