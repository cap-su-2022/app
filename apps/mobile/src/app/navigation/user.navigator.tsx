import SettingsScreen from "../screens/settings.screen";
import EditProfile from "../screens/edit-profile.screen";
import React, {useRef, useState} from "react";
import {StackNavigator, StackScreen} from '../utils/utils';
import {StyleSheet, Text, TouchableOpacity} from "react-native";
import {FPT_ORANGE_COLOR} from "../constants/fpt-color";
import {useNavigation} from "@react-navigation/native";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import EditProfileScreen from "../screens/edit-profile.screen";
import EditDetailProfile from "../screens/edit-detail-profile.screen";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../redux/store";
import {updateProfile} from "../redux/userSlice";
import {FormikProps} from "formik";

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
    <StackNavigator initialRouteName="UserProfile">
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
