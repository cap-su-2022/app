import React from 'react';
import {
  StatusBar,
} from 'react-native';

import {NavigationContainer} from "@react-navigation/native";
import HomeScreen from "./screens/home.screen";
import {HomeIcon, UserIcon} from "react-native-heroicons/solid";
import QRScan from "./screens/qr-scan.screen";
import {TabNavigator, TabScreen, StackNavigator, StackScreen} from './utils/utils';
import UserNavigator from "./navigation/user.navigator";
import QRScanButton from "./components/buttons/QRScanButton";
import {HomeRoute, QRScanRoute, UserNavigatorRoute} from "./utils/screen.navigator.utils";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "./redux/store";
import LoginScreen from "./screens/login.screen";
import MainNavigator from "./navigation/main.navigator";


export const App = () => {

  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();


  return (
    <>
      <StatusBar barStyle="dark-content"/>
      <NavigationContainer>
        <StackNavigator initialRouteName={"LOGIN_SCREEN"} screenOptions={{
          headerShown: false
        }}>
          <StackScreen name={"LOGIN_SCREEN"} component={LoginScreen}/>
          <StackScreen name={"MAIN"} component={MainNavigator}/>

        </StackNavigator>


      </NavigationContainer>
    </>
  );
};


export default App;
