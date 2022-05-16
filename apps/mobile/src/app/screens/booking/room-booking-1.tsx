import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {useNavigation} from "@react-navigation/native";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import ReadingTime from '../../../../../../assets/undraw/reading-time.svg';
import {deviceHeight, deviceWidth} from "../../utils/device";
import {FPT_ORANGE_COLOR} from "@app/constants";
import {WHITE} from "../../constants/colors";

const RoomBooking1: React.FC = () => {

  const navigate = useNavigation<NativeStackNavigationProp<any>>();

  const handleRequestBookingNow = () => {
    navigate.navigate("ROOM_BOOKING_NOW");
  };

  const handleRequestBookingLater = () => {
    navigate.navigate("ROOM_BOOKING_LATER");
  };

  return (
    <View style={styles.container}>
      <View>
        <ReadingTime height={deviceWidth / 1.25} width={deviceWidth / 1.25}/>
      </View>

      <View style={styles.body}>
        <TouchableOpacity style={styles.bookingNowContainer} onPress={() => handleRequestBookingNow()}>
          <Text style={styles.bookingNowButtonText}>Request a room booking now</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.bookingLaterContainer} onPress={() => handleRequestBookingLater()}>
          <Text style={styles.bookingLaterButtonText}>Schedule a room booking</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
    flexGrow: 1,
    backgroundColor: WHITE
  },
  body: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  bookingNowContainer: {
    width: 250,
    height: 50,
    borderWidth: 2,
    borderColor: FPT_ORANGE_COLOR,
    fontSize: 20,
    fontWeight: '600',
    borderRadius: 10,
    marginBottom: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bookingNowButtonText: {
    color: FPT_ORANGE_COLOR,
    fontSize: 20,
    fontWeight: '600',
  },
  bookingLaterContainer: {
    width: 250,
    height: 50,
    backgroundColor: FPT_ORANGE_COLOR,
    marginTop: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10
  },
  bookingLaterButtonText: {
    color: WHITE,
    fontWeight: '600',
    fontSize: 20,
  },
});

export default RoomBooking1;
