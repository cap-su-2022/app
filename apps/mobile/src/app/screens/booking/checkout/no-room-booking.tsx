import React from "react";
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import EmptyCheckOut from "../../../components/empty-checkout.svg";
import { deviceWidth } from "../../../utils/device";
import { BLACK, FPT_ORANGE_COLOR, WHITE } from "@app/constants";
import { useAppNavigation } from "../../../hooks/use-app-navigation.hook";


const NoRoomBookingCheckOut: React.FC<any> = () => {

  const navigate = useAppNavigation();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.body}>
          <EmptyCheckOut
            width={deviceWidth / 1.3}
            height={deviceWidth / 1.3}
          />
          <Text style={styles.bodyTextContent}>
            Your booking rooms are already checked out or not check in!
          </Text>

        </View>
        <View style={styles.footer}>
          <TouchableOpacity
            onPress={() => navigate.replace("ROOM_BOOKING")}
            style={styles.checkInButton}>
            <Text style={styles.checkInButtonText}>
              Start booking a room
            </Text>
          </TouchableOpacity>
        </View>
      </View>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "space-between",
    flexGrow: 1
  },
  body: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    flexGrow: 1
  },
  bodyTextContent: {
    color: BLACK,
    fontSize: deviceWidth / 18,
    fontWeight: "600",
    textAlign: "center"
  },
  footer: {
    height: 90,
    backgroundColor: WHITE,
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  checkInButton: {
    backgroundColor: FPT_ORANGE_COLOR,
    borderRadius: 8,
    height: 50,
    width: deviceWidth / 1.25,
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  checkInButtonText: {
    color: WHITE,
    fontSize: deviceWidth / 18,
    fontWeight: "600"
  }
});

export default NoRoomBookingCheckOut;
