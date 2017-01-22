import React, {
  PropTypes,
} from 'react';

import { View, Text, StyleSheet } from 'react-native';

const Score = ({ currentLevel, totalLevels, score, lives }) => {
  return (
    <View style={ styles.infoBlock }>
      <Text style={ styles.score }>
        Level: { currentLevel }/{ totalLevels }
      </Text>
      <Text style={ styles.score }>
        Score: { score }
      </Text>
      <Text>
        Lives: { lives }
      </Text>
    </View>
  );
};

Score.propTypes = {
  currentLevel: PropTypes.number,
  totalLevels: PropTypes.number,
  score: PropTypes.number,
  lives: PropTypes.number,
};

const styles = StyleSheet.create({
  infoBlock: {
    justifyContent: 'flex-end',
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingTop: 5,
    paddingBottom: 5,
  },
  score: {
    marginRight: 10,
  }
});


export default Score;
