import React from "react";

import { StackNavigator, StackScreen } from "@app/utils";
import RoomCheckout1 from "../../screens/booking/room-checkout-1";
import RoomInBookingDetailNavigator from "./booking-room-booking-detail.navigator";
import NoRoomBookingCheckOut from "../../screens/booking/checkout/no-room-booking";
import ReadyToCheckout from "../../screens/booking/checkout/ready-to-checkout";
import CheckoutSuccessfully from "../../screens/booking/checkout/checkout-successful";

const RoomCheckoutNavigator = () => {
  return (
    <StackNavigator initialRouteName={"READY_CHECKOUT"} screenOptions={{
      headerShown: false
    }}>
      <StackScreen name={"ROOM_CHECKOUT_1"} component={RoomCheckout1} />
      <StackScreen name={"ROOM_INBOOKING_DETAIL"} component={RoomInBookingDetailNavigator} />
      <StackScreen name="NO_ROOM_CHECKOUT" component={NoRoomBookingCheckOut} />
      <StackScreen name="READY_CHECKOUT" component={ReadyToCheckout} options={{
        headerShown: true,
        headerTitle: "Are you ready to checkout?"
      }} />
      <StackScreen name="CHECKOUT_SUCCESSFULLY" component={CheckoutSuccessfully} />
    </StackNavigator>
  );
};

export default RoomCheckoutNavigator;
