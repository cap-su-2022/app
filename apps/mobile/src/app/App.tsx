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


export const App = () => {

  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();


  return (
    <>
      <StatusBar barStyle="dark-content"/>
      <NavigationContainer>
        {user.googleIdToken !== '' ? <TabNavigator initialRouteName={HomeRoute.Home}
                                                   screenOptions={{
                                                     headerShown: false
                                                   }}>
          <TabScreen name={HomeRoute.Home} component={HomeScreen} options={{
            tabBarIcon: () => <HomeIcon color="black" size={30}/>,
            tabBarLabel: () => null,
          }}/>
          <TabScreen name={QRScanRoute.QRScan} component={QRScan} options={{
            tabBarLabel: () => null,
            tabBarIcon: () => <QRScanButton/>
          }}/>
          <TabScreen name={UserNavigatorRoute} component={UserNavigator} options={{
            tabBarLabel: () => null,
            tabBarIcon: () => <UserIcon color="black" size={30}/>
          }}/>
        </TabNavigator> : <AuthenticationContainer/>}

      </NavigationContainer>
    </>
  );
};


const AuthenticationContainer = () => {
  return (
    <StackNavigator initialRouteName={"LOGIN_SCREEN"} screenOptions={{
      headerShown: false
    }}>
      <StackScreen name={"LOGIN_SCREEN"} component={LoginScreen}/>
    </StackNavigator>
  );
}

export default App;
