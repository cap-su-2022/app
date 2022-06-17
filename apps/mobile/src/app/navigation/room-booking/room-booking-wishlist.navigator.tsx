import { StackNavigator, StackScreen } from "@app/utils";
import { StyleSheet, Text } from "react-native";
import { BLACK } from "@app/constants";
import RoomBookingWishlist from "../../screens/booking/room-booking-wishlist";
import React from "react";

const RoomBookingWishlistNavigator = () => {
  return (
    <StackNavigator screenOptions={{
      headerTitle: () => <Text style={styles.headerText}>
        Booking Wishlist
      </Text>,
      headerRight: () => null
    }} initialRouteName={"BOOKING_WISHLIST"}>
      <StackScreen name={"BOOKING_WISHLIST"} component={RoomBookingWishlist} />
    </StackNavigator>
  );
};

const styles = StyleSheet.create({
  headerText: {
    color: BLACK,
    fontSize: 20,
    fontWeight: "600"
  }
});

export default RoomBookingWishlistNavigator;
