import React from 'react';
import { StyleSheet } from 'react-native';
import { StackNavigator, StackScreen } from '@app/utils';
import RoomCheckoutNavigator from './booking-room-checkout.navigator';
import { useAppDispatch } from '../../hooks/use-app-dispatch.hook';
import { useAppNavigation } from '../../hooks/use-app-navigation.hook';
import HomeScreen from '../../screens/home.screen';
import RoomBookingNavigator from '../room-booking';
import TrackBookingRoomNavigator from './track-booking-room';

const HomeNavigator: React.FC = () => {
  const navigate = useAppNavigation();
  const dispatch = useAppDispatch();

  return (
    <StackNavigator initialRouteName={'HOME_SCREEN'}>
      <StackScreen
        name={'HOME_SCREEN'}
        options={{
          headerShown: false,
        }}
        component={HomeScreen}
      />
      <StackScreen
        name={'ROOM_BOOKING'}
        options={{
          headerShown: false,
        }}
        component={RoomBookingNavigator}
      />
      <StackScreen
        name={'ROOM_CHECKOUT'}
        options={{
          headerShown: false,
        }}
        component={RoomCheckoutNavigator}
      />
      <StackScreen
        name="TRACK_BOOKING_ROOM"
        options={{
          headerShown: false,
        }}
        component={TrackBookingRoomNavigator}
      />
    </StackNavigator>
  );
};

const styles = StyleSheet.create({});

export default HomeNavigator;
