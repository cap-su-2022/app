import React from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { ChatAlt2Icon } from 'react-native-heroicons/outline';
import { deviceWidth } from '../../../../utils/device';
import { FPT_ORANGE_COLOR, WHITE } from '@app/constants';
import { useAppNavigation } from '../../../../hooks/use-app-navigation.hook';
import { useAppDispatch } from '../../../../hooks/use-app-dispatch.hook';

const HomeScreenSectionResolveFeedback: React.FC<any> = () => {
  const navigate = useAppNavigation();

  const handleNavigateTrackBookingRoom = () => {
    navigate.navigate('TRACK_BOOKING_ROOM');
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => handleNavigateTrackBookingRoom()}
    >
      <View style={styles.wrapper}>
        <ChatAlt2Icon size={deviceWidth / 13} color={WHITE} />
        <Text style={styles.text}>Resolve feedbacks</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 100,
    width: deviceWidth / 2 - 30,
    backgroundColor: FPT_ORANGE_COLOR,
    margin: 5,
    borderRadius: 8,
  },
  wrapper: {
    margin: 10,
  },
  text: {
    marginTop: 10,
    fontSize: Platform.OS === 'android' ? 14 : 16,
    fontWeight: '600',
    color: WHITE,
  },
});

export default HomeScreenSectionResolveFeedback;
