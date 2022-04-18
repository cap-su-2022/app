import {StyleSheet, View} from "react-native";
import {QrcodeIcon} from "react-native-heroicons/solid";
import React from "react";

const QRScanButton = () => {
  return (
    <View style={[styles.container]}>
      <QrcodeIcon color="black" size={50}/>
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f06e28',
    borderRadius: 50,
    width: 65,
    height: 65,
    borderColor: 'rgba(209, 209, 209, 1)',
    borderWidth: 1,
  }
});

export default QRScanButton;
