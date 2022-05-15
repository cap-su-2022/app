import React, {useRef} from 'react';
import {StackNavigator, StackScreen} from '@app/utils';
import FeedbackHistory from "../../../screens/history/feedback.history";
import {ChevronLeftIcon, FilterIcon} from "react-native-heroicons/outline";
import FeedbackHistoryFilter from "../../../screens/history/feedback-history-filter";
import {TouchableOpacity} from "react-native";
import {BLACK} from "../../../constants/colors";
import {useNavigation} from "@react-navigation/native";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";

const FeedbackHistoryNavigation: React.FC = () => {

  const navigate = useNavigation<NativeStackNavigationProp<any>>();


  return (
    <StackNavigator screenOptions={{

      headerShown: true,
      headerTitle: 'Feedback History',

      headerLeft: () => <TouchableOpacity>
        <ChevronLeftIcon color={BLACK} onPress={() => navigate.pop()}/>
      </TouchableOpacity>,
      headerRight: () => <TouchableOpacity onPress={() => navigate.navigate('FEEDBACK_HISTORY_FILTER')}>
        <FilterIcon size={30} color={BLACK}/>
      </TouchableOpacity>
    }} initialRouteName={"FeedbackHistoryHome"}>
      <StackScreen name={"FeedbackHistoryHome"} component={FeedbackHistory}/>

      <StackScreen name={"FEEDBACK_HISTORY_FILTER"} options={{
        headerShown: false
      }} component={FeedbackHistoryFilter}/>
    </StackNavigator>
  );
}

export default FeedbackHistoryNavigation;
