import React from "react";
import Logo from "./book-logo.svg";
import { StyleSheet, Text, View } from "react-native";
import { FPT_ORANGE_COLOR } from "@app/constants";
import { deviceWidth } from "../../utils/device";

const BookLogo: React.FC<any> = () => {
  return (
    <View style={styles.container}>
      <Logo />
      <Text style={styles.textContent}>
        FLRBMS
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column"
  },
  textContent: {
    fontSize: deviceWidth / 21,
    textTransform: "capitalize",
    fontWeight: "600",
    color: FPT_ORANGE_COLOR
  }
});

export default BookLogo;
