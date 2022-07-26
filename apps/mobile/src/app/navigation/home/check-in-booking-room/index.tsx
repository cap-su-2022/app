import React from 'react';
import { StyleSheet } from 'react-native';
import { StackNavigator, StackScreen } from '@app/utils';
import CheckinBookingRoom from '../../../screens/booking/check-in-booking-room';
import CheckinBookingRoomNotFound from '../../../screens/booking/check-in-booking-room/not-found';

const CheckinBookingRoomNavigator: React.FC<any> = () => {
  return (
    <StackNavigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="CHECK_IN_NOT_FOUND"
    >
      <StackScreen
        name="CHECK_IN_BOOKING_ROOM"
        component={CheckinBookingRoom}
      />
      <StackScreen
        name="CHECK_IN_NOT_FOUND"
        component={CheckinBookingRoomNotFound}
      />
    </StackNavigator>
  );
};

const styles = StyleSheet.create({});

export default CheckinBookingRoomNavigator;
