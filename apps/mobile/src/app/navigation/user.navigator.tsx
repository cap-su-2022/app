import SettingsScreen from "../screens/settings.screen";
import EditProfile from "../screens/edit-profile.screen";
import React from "react";
import {StackNavigator, StackScreen} from '../utils/utils';

const UserNavigator = () => {
  return (
    <StackNavigator initialRouteName="UserProfile">
      <StackScreen name="UserProfile" component={SettingsScreen}/>
      <StackScreen name="EditUserProfile"
                    options={{
                      title: 'My Profile'
                    }}
                    component={EditProfile}/>
    </StackNavigator>
  );
}

export default UserNavigator;
