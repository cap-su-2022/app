import React from "react";

import { StackNavigator, StackScreen } from "@app/utils";
import RoomCheckout1 from "../../screens/booking/room-checkout-1";
import RoomInBookingDetailNavigator from "./booking-room-booking-detail.navigator";

const RoomCheckoutNavigator = () => {
  return (
    <StackNavigator initialRouteName={"ROOM_INBOOKING_DETAIL"} screenOptions={{
      headerShown: false
    }}>
      <StackScreen name={"ROOM_CHECKOUT_1"} component={RoomCheckout1} />
      <StackScreen name={"ROOM_INBOOKING_DETAIL"} component={RoomInBookingDetailNavigator} />
    </StackNavigator>
  );
};

export default RoomCheckoutNavigator;
