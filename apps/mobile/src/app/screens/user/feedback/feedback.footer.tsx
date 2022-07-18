import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { FPT_ORANGE_COLOR, LIGHT_GRAY, WHITE } from '@app/constants';
import { deviceWidth } from '../../../utils/device';

interface FeedbackFooterProps {
  handlePress(): void;
}

const FeedbackFooter: React.FC<FeedbackFooterProps> = (props) => {
  return (
    <View style={styles.footerContainer}>
      <TouchableOpacity
        style={styles.sendFeedbackButton}
        onPress={() => props.handlePress()}
      >
        <Text style={styles.sendFeedbackButtonText}>Send feedback!</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  footerContainer: {
    borderTopWidth: 1,
    borderTopColor: LIGHT_GRAY,
    height: 90,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendFeedbackButton: {
    backgroundColor: FPT_ORANGE_COLOR,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    width: deviceWidth / 1.35,
    height: 50,
  },
  sendFeedbackButtonText: {
    color: WHITE,
    fontWeight: '600',
    fontSize: deviceWidth / 21,
  },
});

export default FeedbackFooter;
