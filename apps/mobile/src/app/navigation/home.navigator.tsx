import React from 'react';
import { StyleSheet, Text } from "react-native";
import {useNavigation} from "@react-navigation/native";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import {AppDispatch} from "../redux/store";
import {useDispatch} from "react-redux";
import {StackNavigator, StackScreen} from '@app/utils';
import HomeScreen from "../screens/home.screen";
import RoomBookingNavigator from "./booking/room-booking.navigator";
import { BLACK } from "@app/constants";
import RoomInBookingDetail from "../screens/booking/room-inbooking-detail";
import RoomCheckout1 from "../screens/booking/room-checkout-1";

const HomeNavigator: React.FC = () => {
  const navigate = useNavigation<NativeStackNavigationProp<any>>();
  const dispatch: AppDispatch = useDispatch();

  return (
    <StackNavigator initialRouteName={"HOME_SCREEN"}>
      <StackScreen name={"HOME_SCREEN"} component={HomeScreen}/>
      <StackScreen name={"ROOM_BOOKING"} options={{
        headerShown: false
      }} component={RoomBookingNavigator}/>
      <StackScreen name={"ROOM_CHECKOUT"} options={{
        headerShown: false
      }} component={RoomCheckoutNavigator}/>
    </StackNavigator>
  )

};

const RoomCheckoutNavigator = () => {
  return (
    <StackNavigator initialRouteName={"ROOM_INBOOKING_DETAIL"} screenOptions={{
      headerShown: false
    }}>
      <StackScreen name={"ROOM_CHECKOUT_1"} component={RoomCheckout1}/>
      <StackScreen name={"ROOM_INBOOKING_DETAIL"} component={RoomInBookingDetailNavigator}/>
    </StackNavigator>
  );
}

const RoomInBookingDetailNavigator = () => {
  return (
    <StackNavigator screenOptions={{
      headerTitle: () => <Text style={{
        color: BLACK,
        fontSize: 20,
        fontWeight: '600',
      }}>Room Booking Detail</Text>,
      headerRight: () => null,
    }} initialRouteName={"ROOM_INBOOKING_DETAIL"}>
      <StackScreen name={"ROOM_INBOOKING_DETAIL"} component={RoomInBookingDetail}/>
    </StackNavigator>
  )
}


const styles = StyleSheet.create({

});

export default HomeNavigator;
