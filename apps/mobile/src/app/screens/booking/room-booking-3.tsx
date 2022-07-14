import React from 'react';
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { BLACK, FPT_ORANGE_COLOR, RED, WHITE } from '@app/constants';
import { deviceHeight, deviceWidth } from '../../utils/device';
import {
  CalendarIcon,
  ChevronDoubleLeftIcon,
  TicketIcon,
} from 'react-native-heroicons/outline';
import { useAppNavigation } from '../../hooks/use-app-navigation.hook';
import { useAppSelector } from '../../hooks/use-app-selector.hook';

export const RoomBooking3: React.FC = () => {
  const navigate = useAppNavigation();
  const roomBooking = useAppSelector(
    (state) => state.roomBooking.addRoomBooking
  );

  const InfoDetail = (title, detail) => {
    return (
      <View>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.bookingNowContainer}>
          <Text style={styles.bookingNowButtonText}>
            {detail ? detail : 'N/A'}
          </Text>
        </View>
      </View>
    );
  };

  const Device = ({ item, index }) => {
    return (
      <View style={styles.historyContainer}>
        <Text>{item}</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{
          display: 'flex',
          flexGrow: 1,
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <View>
          {InfoDetail('Start Day:', roomBooking.fromDay)}
          {InfoDetail('To Day:', roomBooking.toDay)}
          {InfoDetail('From Slot:', roomBooking.fromSlotName)}
          {InfoDetail('To Slot:', roomBooking.toSlotName)}
          {InfoDetail('Room Name:', roomBooking.roomName)}
          <FlatList
            data={roomBooking.deviceNames}
            renderItem={(device) => Device(device)}
          />
        </View>

        <View
          style={{
            height: 80,
            backgroundColor: WHITE,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
          }}
        >
          <TouchableOpacity
            onPress={() => navigate.pop()}
            style={{
              display: 'flex',
              justifyContent: 'space-evenly',
              flexDirection: 'row',
              alignItems: 'center',
              borderRadius: 8,
              borderWidth: 2,
              borderColor: RED,
              width: deviceWidth / 2.2,
              height: 50,
            }}
          >
            <ChevronDoubleLeftIcon color={RED} />
            <Text
              style={{
                fontSize: deviceWidth / 18,
                fontWeight: '600',
                color: RED,
              }}
            >
              Review again
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigate.navigate('ROOM_BOOKING_SUCCESS')}
            style={{
              display: 'flex',
              justifyContent: 'space-evenly',
              alignItems: 'center',
              borderRadius: 8,
              backgroundColor: FPT_ORANGE_COLOR,
              width: deviceWidth / 2.2,
              height: 50,
              flexDirection: 'row',
            }}
          >
            <TicketIcon color={WHITE} />
            <Text
              style={{
                color: WHITE,
                fontSize: deviceWidth / 18,
                fontWeight: '600',
              }}
            >
              Book Now
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    padding: 20,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    flexGrow: 1,
    backgroundColor: WHITE,
  },
  bookingNowContainer: {
    width: deviceWidth / 1.15,
    height: deviceHeight / 13,
    paddingHorizontal: 10,
    borderWidth: 2,
    borderColor: WHITE,
    fontSize: 20,
    fontWeight: '600',
    borderRadius: 10,
    marginBottom: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#EEF5FF',
  },
  bookingNowButtonText: {
    fontSize: deviceWidth / 23,
    fontWeight: '600',
  },
  title: {
    fontSize: deviceWidth / 23,
    fontWeight: '700',
    marginBottom: 5,
  },
  bookingLaterContainer: {
    width: 250,
    height: 50,
    backgroundColor: FPT_ORANGE_COLOR,
    marginTop: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  bookingLaterButtonText: {
    color: WHITE,
    fontWeight: '600',
    fontSize: deviceWidth / 20,
  },
  historyContainer: {
    backgroundColor: WHITE,
    marginHorizontal: 5,
    padding: 5,
  },
  historyText: {
    fontWeight: '700',
  },
});
