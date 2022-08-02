import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { StackNavigator, StackScreen } from '@app/utils';
import AcceptFeedbackNavigator from './accept-feedback';
import CalendarDateSelect from '../../../screens/track-feedback/calendar-select';
import { ChatIcon } from 'react-native-heroicons/outline';
import { FPT_ORANGE_COLOR, WHITE } from '@app/constants';
import { deviceWidth } from '../../../utils/device';
import { useAppNavigation } from '../../../hooks/use-app-navigation.hook';
import BookingQRScan from '../../../screens/track-booking-room/booking-qr-scan';
import TrackFeedbackScreen from '../../../screens/track-feedback';
import { PlusCircleIcon } from 'react-native-heroicons/solid';
import FeedbackNavigator from '../../user/feedback';
import { useAppSelector } from '../../../hooks/use-app-selector.hook';

const TrackRoomBookingFeedbackNavigator: React.FC<any> = () => {
  const navigate = useAppNavigation();

  return (
    <StackNavigator initialRouteName="TRACK_ROOM_BOOKING_FEEDBACK_ROUTE">
      <StackScreen
        options={{
          headerTitle: 'Room Booking Feedbacks',
        }}
        name="TRACK_FEEDBACK_ROUTE"
        component={TrackFeedbackScreen}
      />
      <StackScreen
        options={{
          headerShown: false,
        }}
        name="ACCEPT_FEEDBACK_ROUTE"
        component={AcceptFeedbackNavigator}
      />
      <StackScreen
        options={{
          headerShown: false,
        }}
        name="ADD_FEEDBACK"
        component={FeedbackNavigator}
      />

      <StackScreen name="BOOKING_QR_SCAN" component={BookingQRScan} />
      <StackScreen
        name="CALENDAR_SELECT"
        options={{
          headerShown: false,
        }}
        component={CalendarDateSelect}
      />
    </StackNavigator>
  );
};

const styles = StyleSheet.create({});

export default TrackRoomBookingFeedbackNavigator;
