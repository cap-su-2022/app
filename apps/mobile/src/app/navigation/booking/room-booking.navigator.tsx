import React from "react";

import {useNavigation} from "@react-navigation/native";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import {StackNavigator, StackScreen} from '@app/utils';
import {StatusBar, Text, TouchableOpacity} from "react-native";
import RoomBooking1 from "../../screens/booking/room-booking-1";
import {XIcon} from "react-native-heroicons/outline";
import {BLACK} from "../../constants/colors";
import RoomBookingNow from "../../screens/booking/room-booking-now";
import RoomBookingLater from "../../screens/booking/room-booking-later";

const RoomBookingNavigator: React.FC = () => {
  const navigate = useNavigation<NativeStackNavigationProp<any>>();

  return (
    <>
      <StatusBar hidden/>
      <StackNavigator  initialRouteName={"ROOM_BOOKING_1"} screenOptions={{
        headerTitle: () => <Text style={{
          color: BLACK,
          fontSize: 20,
          fontWeight: '600'
        }}>Request for Room Booking</Text>,
        headerBackVisible: false,
        headerLeft: () => <TouchableOpacity onPress={() => navigate.pop()}>
          <XIcon color="#808080"/>
        </TouchableOpacity>
      }}>
        <StackScreen name={"ROOM_BOOKING_1"} options={{
        }} component={RoomBooking1}/>
        <StackScreen name={"ROOM_BOOKING_NOW"} component={RoomBookingNow}/>
        <StackScreen name={"ROOM_BOOKING_LATER"} component={RoomBookingLater}/>
      </StackNavigator>
    </>
  );
};

export default RoomBookingNavigator;
