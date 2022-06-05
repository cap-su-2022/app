import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useAppDispatch } from "../../redux/hooks";
import { FPT_ORANGE_COLOR, WHITE } from "@app/constants";
import { deviceWidth } from "../../utils/device";

const RoomInBookingDetail: React.FC = () => {
  const navigate = useNavigation<NativeStackNavigationProp<any>>();
  const dispatch = useAppDispatch();

  return (
    <SafeAreaView style={{ flex: 1}}>
      <View style={{
        display: 'flex',
        flexGrow: 1,
        justifyContent: 'space-between'
      }}>
        <ScrollView>

        </ScrollView>
        <View style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: WHITE,
          height: 70,
        }}>
          <TouchableOpacity style={{
            backgroundColor: FPT_ORANGE_COLOR,
            width: deviceWidth / 1.25,
            height: 50,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 8
          }}>
            <Text style={{
              color: WHITE,
              fontSize: deviceWidth / 22,
              fontWeight: '600'
            }}>Checkout this room now</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({

});

export default RoomInBookingDetail;
