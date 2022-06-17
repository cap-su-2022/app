import React from "react";
import { SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import { BLACK, FPT_ORANGE_COLOR, RED, WHITE } from "@app/constants";
import { deviceWidth } from "../../utils/device";
import { ChevronDoubleLeftIcon, TicketIcon } from "react-native-heroicons/outline";
import { useAppNavigation } from "../../hooks/use-app-navigation.hook";

export const RoomBooking3: React.FC = () => {
  const navigate = useAppNavigation();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{
        display: "flex",
        flexGrow: 1,
        flexDirection: "column",
        justifyContent: "space-between"
      }}>
        <View>
          <Text style={{
            fontWeight: "600",
            fontSize: deviceWidth / 17,
            color: BLACK
          }}>
            Here is your overview information for the booking
          </Text>
        </View>

        <View style={{
          height: 80,
          backgroundColor: WHITE,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "center"

        }}>
          <TouchableOpacity onPress={() => navigate.pop()} style={{
            display: "flex",
            justifyContent: "space-evenly",
            flexDirection: "row",
            alignItems: "center",
            borderRadius: 8,
            borderWidth: 2,
            borderColor: RED,
            width: deviceWidth / 2.2,
            height: 50
          }}>
            <ChevronDoubleLeftIcon color={RED} />
            <Text style={{
              fontSize: deviceWidth / 18,
              fontWeight: "600",
              color: RED
            }}>
              Review again
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigate.navigate("ROOM_BOOKING_SUCCESS")} style={{
            display: "flex",
            justifyContent: "space-evenly",
            alignItems: "center",
            borderRadius: 8,
            backgroundColor: FPT_ORANGE_COLOR,
            width: deviceWidth / 2.2,
            height: 50,
            flexDirection: "row"
          }}>
            <TicketIcon color={WHITE} />
            <Text style={{
              color: WHITE,
              fontSize: deviceWidth / 18,
              fontWeight: "600"
            }}>
              Book Now
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};
