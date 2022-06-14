import React from "react";

import {useNavigation} from "@react-navigation/native";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import {StackNavigator, StackScreen} from '@app/utils';
import {StatusBar, Text, TouchableOpacity} from "react-native";
import RoomBooking1 from "../../screens/booking/room-booking-1";
import { HeartIcon, XIcon } from "react-native-heroicons/outline";
import RoomBookingNow from "../../screens/booking/room-booking-now";
import RoomBookingLater from "../../screens/booking/room-booking-later";
import { BLACK, PINK } from "@app/constants";
import RoomBookingWishlist from "../../screens/booking/room-booking-wishlist";
import RoomBooking2 from "../../screens/booking/room-booking-2";

const RoomBookingNavigator: React.FC = () => {
  const navigate = useNavigation<NativeStackNavigationProp<any>>();

  return (
    <>
      <StatusBar hidden/>
      <StackNavigator  initialRouteName={"ROOM_BOOKING_1"} screenOptions={{
        headerTitle: () => <Text style={{
          color: BLACK,
          fontSize: 20,
          fontWeight: '600',
          marginLeft: 10
        }}>Request for Room Booking</Text>,
        headerBackVisible: false,
        headerLeft: () => <TouchableOpacity onPress={() => navigate.pop()}>
          <XIcon color="#808080"/>
        </TouchableOpacity>,
        headerRight: () => <TouchableOpacity onPress={() => navigate.navigate("ROOM_BOOKING_WISHLIST")}>
          <HeartIcon color={PINK}/>
        </TouchableOpacity>
      }}>
        <StackScreen name={"ROOM_BOOKING_1"} options={{
        }} component={RoomBooking1}/>
        <StackScreen name={"ROOM_BOOKING_2"} options={{
          headerShown: false
        }} component={RoomBookingStep2}/>
        <StackScreen name={"ROOM_BOOKING_NOW"} component={RoomBookingNow}/>
        <StackScreen name={"ROOM_BOOKING_LATER"} component={RoomBookingLater}/>
        <StackScreen name={"ROOM_BOOKING_WISHLIST"} options={{
    headerShown: false
        }} component={RoomBookingWishlistNavigator}/>
      </StackNavigator>
    </>
  );
};


const RoomBookingStep2 = () => {
  return (
    <StackNavigator screenOptions={{
      headerTitle: () => <Text style={{
        color: BLACK,
        fontSize: 20,
        fontWeight: '600',
      }}>Select your devices</Text>,
      headerRight: () => null,
    }} initialRouteName={"BOOKING_ROOM_STEP2"}>
      <StackScreen name={"BOOKING_ROOM_STEP2"} component={RoomBooking2}/>
    </StackNavigator>
  )
}

const RoomBookingWishlistNavigator = () => {
  return (
    <StackNavigator screenOptions={{
      headerTitle: () => <Text style={{
        color: BLACK,
        fontSize: 20,
        fontWeight: '600',
      }}>Booking Wishlist</Text>,
      headerRight: () => null,
    }} initialRouteName={"BOOKING_WISHLIST"}>
      <StackScreen name={"BOOKING_WISHLIST"} component={RoomBookingWishlist}/>
    </StackNavigator>
  );
}

export default RoomBookingNavigator;
