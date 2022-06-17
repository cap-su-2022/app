import React from "react";

import {TabNavigator, TabScreen} from "@app/utils";
import {HomeRoute, QRScanRoute, UserNavigatorRoute} from "../utils/screen.navigator.utils";
import {HomeIcon, UserIcon} from "react-native-heroicons/solid";
import QRScan from "../screens/qr-scan.screen";
import QRScanButton from "../components/buttons/QRScanButton";
import UserNavigator from "./user.navigator";
import {Platform} from "react-native";
import { StackNavigator, StackScreen } from "@app/utils";
import HomeNavigator from "./home";

const MainNavigator = () => {
    return (
      <StackNavigator screenOptions={{
        headerShown: false
      }} initialRouteName={"INITIAL"}>
        <StackScreen name={"INITIAL"} component={HomeTabs}/>
        <StackScreen name={QRScanRoute.QRScan} component={QRScan}/>
      </StackNavigator>

    );
};

const HomeTabs: React.FC = () => {
  return (      <TabNavigator initialRouteName={HomeRoute.Home}
                              screenOptions={{
                                tabBarStyle: {
                                  height: Platform.OS === "android" ? 80 : 70
                                },
                                headerShown: false
                              }}>
    <TabScreen name={HomeRoute.Home} component={HomeNavigator} options={{
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
  </TabNavigator>);
}


export default MainNavigator;
