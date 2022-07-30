import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import { StackNavigator, StackScreen } from '@app/utils';
import AcceptBookingNavigator from './accept-booking';
import CalendarDateSelect from '../../../screens/track-booking-room/calendar-select';
import {ChatIcon} from 'react-native-heroicons/outline';
import { FPT_ORANGE_COLOR, WHITE } from '@app/constants';
import { deviceWidth } from '../../../utils/device';
import { useAppNavigation } from '../../../hooks/use-app-navigation.hook';
import BookingQRScan from '../../../screens/track-booking-room/booking-qr-scan';
import TrackFeedbackScreen from "../../../screens/track-feedback";
import {PlusCircleIcon} from "react-native-heroicons/solid";

const TrackFeedbackNavigator: React.FC<any> = () => {
  const navigate = useAppNavigation();
  return (
    <StackNavigator
      initialRouteName="TRACK_FEEDBACK_ROUTE"
      screenOptions={{
        title: 'Feedbacks',
        headerRight: () => (
          <TouchableOpacity
            onPress={() => navigate.navigate('BOOKING_QR_SCAN')}
            style={{
              height: 35,
              width: 35,
              borderRadius: 8,
              borderColor: FPT_ORANGE_COLOR,
              borderWidth: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <ChatIcon color={FPT_ORANGE_COLOR} size={deviceWidth / 14} />
              <PlusCircleIcon style={{
                backgroundColor: WHITE,
                borderRadius: 50,
                position: 'absolute',
                top: -15,
                left: -15,
              }} color={FPT_ORANGE_COLOR} size={deviceWidth  /14}/>
          </TouchableOpacity>

        ),
      }}
    >
      <StackScreen name="TRACK_FEEDBACK_ROUTE" component={TrackFeedbackScreen} />
      <StackScreen
        options={{
          headerShown: false,
        }}
        name="ACCEPT_ROOM_BOOKING"
        component={AcceptBookingNavigator}
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

export default TrackFeedbackNavigator;
