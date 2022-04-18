import React from "react";

import {TabNavigator, TabScreen} from "../utils/utils";
import {HomeRoute, QRScanRoute, UserNavigatorRoute} from "../utils/screen.navigator.utils";
import HomeScreen from "../screens/home.screen";
import {HomeIcon, UserIcon} from "react-native-heroicons/solid";
import QRScan from "../screens/qr-scan.screen";
import QRScanButton from "../components/buttons/QRScanButton";
import UserNavigator from "./user.navigator";

const MainNavigator = () => {
    return (
      <TabNavigator initialRouteName={HomeRoute.Home}
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
      </TabNavigator>
    );
};

export default MainNavigator;
