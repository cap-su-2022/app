import React from 'react';
import { StackNavigator, StackScreen } from '@app/utils';
import AcceptBooking from '../../../../screens/track-booking-room/accept-booking';
import ListDevice from '../../../../screens/track-booking-room/accept-booking/list-device';

const AcceptBookingNavigator: React.FC<any> = () => {
  return (
    <StackNavigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="ACCEPT_BOOKING"
    >
      <StackScreen name="ACCEPT_BOOKING" component={AcceptBooking} />
      <StackScreen name="ACCEPT_BOOKING_LIST_DEVICES" component={ListDevice} />
    </StackNavigator>
  );
};

export default AcceptBookingNavigator;
