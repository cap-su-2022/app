import React from 'react';
import {StyleSheet} from "react-native";
import {useNavigation} from "@react-navigation/native";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import {AppDispatch} from "../redux/store";
import {useDispatch} from "react-redux";
import {StackNavigator, StackScreen} from '@app/utils';
import HomeScreen from "../screens/home.screen";
import RoomBookingNavigator from "./booking/room-booking.navigator";

const HomeNavigator: React.FC = () => {
  const navigate = useNavigation<NativeStackNavigationProp<any>>();
  const dispatch: AppDispatch = useDispatch();

  return (
    <StackNavigator initialRouteName={"HOME_SCREEN"}>
      <StackScreen name={"HOME_SCREEN"} component={HomeScreen}/>
      <StackScreen name={"ROOM_BOOKING"} options={{
        headerShown: false
      }} component={RoomBookingNavigator}/>
    </StackNavigator>
  )

};

const styles = StyleSheet.create({

});

export default HomeNavigator;
