import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {ChevronDoubleLeftIcon, ChevronDoubleRightIcon} from "react-native-heroicons/outline";
import {FPT_ORANGE_COLOR, WHITE} from "@app/constants";
import {deviceWidth} from "../../../utils/device";
import {useAppNavigation} from "../../../hooks/use-app-navigation.hook";

const ChooseRoomBookingFooter: React.FC<any> = () => {

  const navigate = useAppNavigation();

  return (
    <View style={styles.footerContainer}>
      <TouchableOpacity
        onPress={() => navigate.pop()}
        style={styles.returnBackButton}>
        <ChevronDoubleLeftIcon color={FPT_ORANGE_COLOR} size={deviceWidth / 18}/>
        <Text style={styles.returnBackButtonText}>
          Return back
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigate.navigate('ROOM_BOOKING_2')}
        style={styles.chooseDevicesButton}>
        <Text style={styles.chooseDevicesButtonText}>
          Choose devices
        </Text>
        <ChevronDoubleRightIcon color={WHITE} size={deviceWidth / 18}/>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  footerContainer: {
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: WHITE,
    height: 70,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  returnBackButton: {
    borderWidth: 2,
    borderColor: FPT_ORANGE_COLOR,
    height: 50,
    backgroundColor: WHITE,
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: 8,
    width: deviceWidth / 2.2
  },
  returnBackButtonText: {
    color: FPT_ORANGE_COLOR,
    fontSize: deviceWidth / 21,
    fontWeight: '600'
  },

  chooseDevicesButton: {
    width: deviceWidth / 2.2,
    height: 50,
    backgroundColor: FPT_ORANGE_COLOR,
    borderRadius: 8,
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexDirection: 'row',
  },
  chooseDevicesButtonText: {
    color: WHITE,
    fontSize: deviceWidth / 21,
    fontWeight: '600'
  }
});

export default ChooseRoomBookingFooter;
