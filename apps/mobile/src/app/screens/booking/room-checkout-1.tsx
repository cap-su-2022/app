import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useAppDispatch } from "../../redux/hooks";

const RoomCheckout1: React.FC = () => {

  const navigate = useNavigation<NativeStackNavigationProp<any>>();
  const dispatch = useAppDispatch();


  return (
    <SafeAreaView>
      <ScrollView>
        <View>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({

});

export default RoomCheckout1;
