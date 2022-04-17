import {FPT_ORANGE_COLOR} from "../../constants/fpt-color";
import {ActivityIndicator, StyleSheet} from "react-native";
import React from "react";

export const Spinner = () => {
  return (
    <ActivityIndicator
      style={[styles.spinner]}
      size="large"
      color={FPT_ORANGE_COLOR} />
  );
};

const styles = StyleSheet.create({
  spinner: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    opacity: 0.5,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center'
  }
})
