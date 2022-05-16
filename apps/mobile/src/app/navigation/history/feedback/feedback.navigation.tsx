import React, {useRef} from 'react';
import {StackNavigator, StackScreen} from '@app/utils';
import FeedbackHistory from "../../../screens/history/feedback.history";
import {ChevronLeftIcon, FilterIcon, XIcon} from "react-native-heroicons/outline";
import FeedbackHistoryFilter from "../../../screens/history/feedback-history-filter";
import {Animated, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {BLACK} from "../../../constants/colors";
import {useNavigation} from "@react-navigation/native";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";

const FeedbackHistoryNavigation: React.FC = () => {

  const navigate = useNavigation<NativeStackNavigationProp<any>>();


  return (
    <StackNavigator screenOptions={{

      headerRight: () => <TouchableOpacity onPress={() => navigate.navigate('FEEDBACK_HISTORY_FILTER')}>
        <FilterIcon size={30} color={BLACK}/>
      </TouchableOpacity>,
    }} initialRouteName={"FeedbackHistoryHome"}>
      <StackScreen name={"FeedbackHistoryHome"}
                   options={{
                     headerTitle: 'Feedback History',
                     headerBackVisible: false,
                     headerLeft: () => <TouchableOpacity onPress={() => navigate.pop()}>
                       <ChevronLeftIcon color={BLACK}/>
                     </TouchableOpacity>
                   }}
                   component={FeedbackHistory}/>

      <StackScreen name={"FEEDBACK_HISTORY_FILTER"} options={{
        headerShown: true,
        headerTitleAlign: 'center',
        headerTitle: () =>
          <Text style={styles.headerTitle}>Feedback History Filter</Text>,
        headerBackVisible: false,
        headerRight: () => null,
        headerLeft: () => <TouchableOpacity onPress={() => navigate.pop()}>
          <XIcon color="#808080"/></TouchableOpacity>,
      }} component={FeedbackHistoryFilter}/>
    </StackNavigator>
  );
}

const styles = StyleSheet.create({
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: BLACK,
  },
})

export default FeedbackHistoryNavigation;
