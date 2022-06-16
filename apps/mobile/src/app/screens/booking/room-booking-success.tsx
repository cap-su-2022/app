import React from "react";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Success from "../../components/success.svg";
import { deviceWidth } from "../../utils/device";
import { BLACK, FPT_ORANGE_COLOR, WHITE } from "@app/constants";

export const RoomBookingSuccess: React.FC = () => {
  const navigate = useNavigation<NativeStackNavigationProp<any>>();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexGrow: 1
      }}>
        <View style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          flexGrow: 0.7
        }}>
          <Success height={deviceWidth / 2.2}
                   width={deviceWidth / 2.2}></Success>
          <Text style={{
            fontWeight: "600",
            fontSize: deviceWidth / 19,
            color: BLACK,
            textAlign: "center"
          }}> Your library room has successfully been booked!</Text>
          <Text style={{
            color: BLACK,
            fontWeight: "400",
            fontSize: deviceWidth / 23
          }}>Please check-in your library in time</Text>
        </View>
        <TouchableOpacity style={{
          borderRadius: 8,
          backgroundColor: FPT_ORANGE_COLOR,
          width: deviceWidth / 1.25,
          height: 50,
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}>
          <Text style={{
            color: WHITE,
            fontWeight: "600",
            fontSize: deviceWidth / 19
          }}>Go to home</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});
