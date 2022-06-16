import React from "react";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { SafeAreaView, StyleSheet, View } from "react-native";

export const RoomBookingFail: React.FC = () => {

  const navigate = useNavigation<NativeStackNavigationProp<any>>();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}>

      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});
