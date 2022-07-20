import React, { useState } from 'react';
import {
  FlatList,
  SafeAreaView, ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { FPT_ORANGE_COLOR, RED, WHITE } from '@app/constants';
import { deviceHeight, deviceWidth } from '../../utils/device';
import {
  ChevronDoubleLeftIcon,
  TicketIcon,
} from 'react-native-heroicons/outline';
import { useAppNavigation } from '../../hooks/use-app-navigation.hook';
import { useAppSelector } from '../../hooks/use-app-selector.hook';
import { useAppDispatch } from '../../hooks/use-app-dispatch.hook';
import { addNewRequestBooking } from '../../redux/features/room-booking/thunk/add-new-request-booking';

export const RoomBooking3: React.FC = () => {
  const navigate = useAppNavigation();
  const dispatch = useAppDispatch();
  const roomBooking = useAppSelector(
    (state) => state.roomBooking.addRoomBooking
  );

  const handleNextStep = () => {
    dispatch(
      addNewRequestBooking({
        bookingReasonId: '38e47b6b-fde7-4d18-834d-ad8fd01e2fbd',
        checkinDate: roomBooking.fromDay,
        checkinSlot: roomBooking.fromSlot,
        checkoutSlot: roomBooking.fromSlot,
        description: 'Ahuhu',
        listDevice: roomBooking.devices,
        roomId: roomBooking.roomId,
      })
    )
      .unwrap()
      .then((e) => console.log(e));
    navigate.navigate("ROOM_BOOKING_SUCCESS")
  };

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

  const Device = ({ item }) => {
    return (
      <View style={styles.historyContainer}>
        <View style={styles.bookingNowContainer}>
          <Text style={styles.bookingNowButtonText}>
            {item ? item.label : 'N/A'}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
        <View style={styles.container}>
          <View>
            {InfoDetail('Start Day:', roomBooking.fromDay)}
            {InfoDetail(
              roomBooking.toSlotNum !== 1 ? 'From Slot:' : 'Slot',
              `Slot ${roomBooking.toSlotNum}`
            )}
            {roomBooking.toSlotNum !== 1
              ? InfoDetail('To Slot:', roomBooking.toSlotName)
              : null}
            {InfoDetail('Room Name:', roomBooking.roomName)}
            <Text style={styles.title}>List Device</Text>
            <FlatList
              data={roomBooking.devices}
              renderItem={(device) => Device(device)}
            />
            {InfoDetail('Booking Reason:', 'Other')}
            {InfoDetail('Description', 'Chua co')}
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
              onPress={() => handleNextStep()}
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
      </ScrollView>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    padding: 20,
    flexDirection: 'column',
    justifyContent: 'space-between',

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
    backgroundColor: 'rgba(240, 110, 40, 0.2)',
  },
  bookingNowButtonText: {
    fontSize: deviceWidth / 25,
    fontWeight: '500',
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
  slotStart: {
    display: 'flex',
    flexDirection: 'row',
  },
  durationButton: {
    margin: 5,
    backgroundColor: 'rgba(240, 110, 40, 0.2)',
    height: 50,
    width: deviceWidth / 1.5,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
  durationButtonText: {
    fontSize: 24,
    fontWeight: '600',
  },
  title: {
    fontSize: deviceWidth / 23,
    fontWeight: '700',
    marginBottom: 5,
  },
  slotContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  checkBox: {
    alignSelf: 'center',
    borderWidth: 3,
    borderColor: FPT_ORANGE_COLOR,
    borderRadius: 8,
  },
});
