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
      <StackScreen name="EditUserProfile"
                   options={{
                     title: 'My Profile',
                     headerRight: () => <TouchableOpacity
                       onPress={() => handleEditProfile()}
                       style={[styles.editButton]}>
                       <Text style={[styles.editButtonText]}>Sửa</Text>
                     </TouchableOpacity>
                   }}
                   component={EditProfile}/>
      <StackScreen name={"EditProfile"} options={{
        title: 'Tài khoản của tôi',
        headerRight: () => <TouchableOpacity
          onPress={() => {
            if (formikRef.current) {
              formikRef.current.handleSubmit();
            }
          }}
          style={[styles.editButton]}>
          <Text style={[styles.editButtonText]}>Lưu</Text>
        </TouchableOpacity>
      }} component={EditProfileScreenProps}/>
      <StackScreen name={"History"} options={{
        headerTitle: 'Feedback History',
      }} component={HistoryNavigation}/>

    </StackNavigator>
  );
};



const styles = StyleSheet.create({
  editButton: {
    backgroundColor: 'blue',
    width: 70,
    height: 30,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
  },
  editButtonText: {
    fontSize: 22,
    color: 'white'
  }
});

export default UserNavigator;
