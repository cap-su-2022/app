import React from "react";

import {useNavigation} from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackNavigator, StackScreen } from "@app/utils";
import { StatusBar, StyleSheet, Text, TouchableOpacity } from "react-native";
import RoomBooking1 from "../../screens/booking/room-booking-1";
import { HeartIcon, XIcon } from "react-native-heroicons/outline";
import RoomBookingNow from "../../screens/booking/room-booking-now";
import RoomBookingLater from "../../screens/booking/room-booking-later";
import { BLACK, PINK } from "@app/constants";
import { RoomBooking3 } from "../../screens/booking/room-booking-3";
import { RoomBookingSuccess } from "../../screens/booking/room-booking-success";
import { RoomBookingFail } from "../../screens/booking/room-booking-fail";
import RoomBookingStep2 from "./room-booking-step2.navigator";
import RoomBookingWishlistNavigator from "./room-booking-wishlist.navigator";
import RoomBookingAlreadyBook from "../../screens/booking/room-booking-already-book";
import RoomBookingChooseRoom from "../../screens/booking/room-booking-choose-room";
import ChooseRoomItemDetail from "../../screens/booking/ChooseRoom/choose-room-item-detail";
import RoomBookingReadyToCheckOut from "../../screens/booking/checkout/ready-to-checkout";

const RoomBookingNavigator: React.FC = () => {
  const navigate = useNavigation<NativeStackNavigationProp<any>>();

  return (
    <>
      <StatusBar hidden />
      <StackNavigator initialRouteName={"ROOM_BOOKING_ALREADY_BOOKED"} screenOptions={{
        headerTitle: () => <Text style={styles.headerText}>
          Request for Room Booking
        </Text>,
        headerBackVisible: false,
        headerLeft: () => <TouchableOpacity onPress={() => navigate.pop()}>
          <XIcon color="#808080" />
        </TouchableOpacity>,
        headerRight: () => <TouchableOpacity onPress={() => navigate.navigate("ROOM_BOOKING_WISHLIST")}>
          <HeartIcon color={PINK} />
        </TouchableOpacity>
      }}>
        <StackScreen name={"ROOM_BOOKING_ALREADY_BOOKED"} options={{
          headerTitle: ""
        }} component={RoomBookingAlreadyBook} />
        <StackScreen name={"ROOM_BOOKING_1"} options={{}} component={RoomBooking1} />
        <StackScreen name={"ROOM_BOOKING_2"} options={{
          headerShown: false
        }} component={RoomBookingStep2} />
        <StackScreen name={"ROOM_BOOKING_3"} options={{
          headerShown: false
        }} component={RoomBooking3} />
        <StackScreen name={"ROOM_BOOKING_SUCCESS"} options={{
          headerShown: false
        }} component={RoomBookingSuccess} />
        <StackScreen name={"ROOM_BOOKING_FAIL"} options={{
          headerShown: false
        }} component={RoomBookingFail} />
        <StackScreen name={"ROOM_BOOKING_NOW"} component={RoomBookingNow} />
        <StackScreen name={"ROOM_BOOKING_LATER"} component={RoomBookingLater} />
        <StackScreen name="ROOM_BOOKING_CHOOSE_ROOM" component={RoomBookingChooseRoom}/>
        <StackScreen name="ROOM_BOOKING_READY_TO_CHECKOUT" component={RoomBookingReadyToCheckOut}/>
        <StackScreen name="ROOM_BOOKING_VIEW_ROOM_DETAIL" component={ChooseRoomItemDetail}/>
        <StackScreen name={"ROOM_BOOKING_WISHLIST"} options={{
          headerShown: false
        }} component={RoomBookingWishlistNavigator} />
      </StackNavigator>
    </>
  );
};

const styles = StyleSheet.create({
  headerText: {
    color: BLACK,
    fontSize: 20,
    fontWeight: "600",
    marginLeft: 10
  }
});

export default RoomBookingNavigator;
