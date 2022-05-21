import React, {useState} from 'react';
import {
  StatusBar,
} from 'react-native';

import {NavigationContainer} from "@react-navigation/native";
import {StackNavigator, StackScreen} from '@app/utils';
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "./redux/store";
import LoginScreen from "./screens/login.screen";
import MainNavigator from "./navigation/main.navigator";
import {Spinner} from "./components/spinners/spinner";


export const App = () => {

  const user = useSelector((state: RootState) => state.user);
  const isSpinnerLoading = useSelector((state: RootState) => state.spinner.isLoading);
  const dispatch: AppDispatch = useDispatch();

  const [initialRoute, setInitialRoute] = useState<string>("LOGIN_SCREEN");


  return (
    <>
      <StatusBar barStyle="dark-content"/>
      <NavigationContainer>
        <StackNavigator initialRouteName={initialRoute} screenOptions={{
          headerShown: false
        }}>
          <StackScreen name={"LOGIN_SCREEN"} component={LoginScreen}/>
          <StackScreen name={"MAIN"} component={MainNavigator}/>

        </StackNavigator>

        {isSpinnerLoading ? <Spinner/> : null}
      </NavigationContainer>
    </>
  );
};


export default App;
