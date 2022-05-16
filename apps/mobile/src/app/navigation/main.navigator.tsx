import React from "react";

import {TabNavigator, TabScreen} from "@app/utils";
import {HomeRoute, QRScanRoute, UserNavigatorRoute} from "../utils/screen.navigator.utils";
import HomeScreen from "../screens/home.screen";
import {HomeIcon, UserIcon} from "react-native-heroicons/solid";
import QRScan from "../screens/qr-scan.screen";
import QRScanButton from "../components/buttons/QRScanButton";
import UserNavigator from "./user.navigator";
import {Platform} from "react-native";
import HomeNavigator from "./home.navigator";

const MainNavigator = () => {
    return (
      <TabNavigator initialRouteName={HomeRoute.Home}
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
      </TabNavigator>
    );
};

export default MainNavigator;
