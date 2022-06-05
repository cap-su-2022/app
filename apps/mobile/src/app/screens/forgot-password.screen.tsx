import React from 'react';
import { useAppDispatch } from "../redux/hooks";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { SafeAreaView, ScrollView, StyleSheet, View } from "react-native";

const ForgotPassword: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigation<NativeStackNavigationProp<any>>();
  return (
    <SafeAreaView>
      <ScrollView>
        <View>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({

});

export default ForgotPassword;
