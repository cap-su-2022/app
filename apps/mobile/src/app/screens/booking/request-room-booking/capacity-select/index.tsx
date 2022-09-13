import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {deviceWidth} from "../../../../utils/device";
import {BLACK, FPT_ORANGE_COLOR} from "@app/constants";
import React from "react";

const RequestRoomBookingCapacitySelect: React.FC<any> = () => {
  return (
    <View>
      <Text style={{
        fontSize: deviceWidth / 23,
        fontWeight: '600',
        color: BLACK
      }}>
        Capacity
      </Text>
      <TouchableOpacity style={{
        height: 50,
        width: deviceWidth / 1.5,
        backgroundColor: FPT_ORANGE_COLOR,
        borderRadius: 8
      }}>
        <Text>0</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({

});
