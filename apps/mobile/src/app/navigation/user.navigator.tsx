import SettingsScreen from "../screens/settings.screen";
import EditProfile from "../screens/edit-profile.screen";
import React, {useRef} from "react";
import {StackNavigator, StackScreen} from '@app/utils';
import {StyleSheet, Text, TouchableOpacity} from "react-native";
import {useNavigation} from "@react-navigation/native";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import EditDetailProfile from "../screens/edit-detail-profile.screen";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../redux/store";
import {FormikProps} from "formik";
import HistoryNavigation from "./history/history.navigation";
import { PencilIcon, XIcon } from "react-native-heroicons/solid";
import { BLACK, FPT_ORANGE_COLOR, WHITE } from "@app/constants";
import { deviceWidth } from "../utils/device";
import { SaveIcon } from "react-native-heroicons/outline";

const UserNavigator = () => {

  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  const userState = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  const formikRef = useRef<FormikProps<any>>();


  const handleEditProfile = () => {
    navigation.navigate("EditProfile");
  };

  const EditProfileScreenProps = () => {
    return <EditDetailProfile formikRef={formikRef}/>;
  }

  return (
    <StackNavigator initialRouteName="UserProfile" screenOptions={{
      headerShown: false
    }}>
      <StackScreen name="UserProfile" component={SettingsScreen}/>
      <StackScreen options={{
        headerShown: true,
        headerTitle: 'Edit Profile',
        headerLeft: () => <TouchableOpacity onPress={() => navigation.pop()}>
          <XIcon color={BLACK}/>
        </TouchableOpacity>
      }} name="EditDetailProfile" component={EditDetailProfile}/>
      <StackScreen name="EditUserProfile"
                   options={{
                     headerShown: true,
                     title: 'My Profile',
                     headerRight: () => <TouchableOpacity
                       onPress={() => handleEditProfile()}
                       style={[styles.editButton]}>
                         <PencilIcon color={FPT_ORANGE_COLOR}/>
                     </TouchableOpacity>
                   }}
                   component={EditProfile}/>
      <StackScreen name={"EditProfile"} options={{
        headerShown: true,
        title: 'Update Profile',
      }} component={EditProfileScreenProps}/>
      <StackScreen name={"History"} options={{
        headerTitle: 'Feedback History',
      }} component={HistoryNavigation}/>

    </StackNavigator>
  );
};



const styles = StyleSheet.create({
  editButton: {
  },
});

export default UserNavigator;
