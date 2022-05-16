import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from "react-native";
import {useDispatch} from "react-redux";
import {StackNavigator, StackScreen} from '@app/utils';
import HistoryScreen from "../../screens/history";
import {AppDispatch} from "../../redux/store";
import FeedbackHistoryNavigation from "./feedback/feedback.navigation";
import {ChevronLeftIcon, FilterIcon} from "react-native-heroicons/outline";
import {BLACK} from "../../constants/colors";
import {useNavigation} from "@react-navigation/native";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";


const HistoryNavigation: React.FC = () => {

  const dispatch: AppDispatch = useDispatch();

  const navigate = useNavigation<NativeStackNavigationProp<any>>();

  return (
    <StackNavigator initialRouteName={"HistoryBrowse"}  screenOptions={{
      headerShown: false,
      headerLeft: () => <TouchableOpacity>
        <ChevronLeftIcon color={BLACK} onPress={() => navigate.pop()}/>
      </TouchableOpacity>,
    }}>
      <StackScreen options={{
        headerShown: true,
        headerTitleAlign: 'center',
        headerBackVisible: false,
        headerTitle: () => <Text style={styles.headerTitle}>History</Text>
      }} name={"HistoryBrowse"} component={HistoryScreen}/>
      <StackScreen name={"FeedbackHistory"} component={FeedbackHistoryNavigation}/>

    </StackNavigator>
  );
}

export const styles = StyleSheet.create({
  headerTitle: {
    fontSize: 20,
    color: BLACK,
    fontWeight: '600'
  }
});

export default HistoryNavigation;
