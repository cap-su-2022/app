import React, { useEffect, useLayoutEffect, useState } from 'react';
import {
  SafeAreaView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { StackNavigator, StackScreen } from '@app/utils';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from './redux/store';
import LoginScreen from './screens/login.screen';
import MainNavigator from './navigation/main.navigator';
import { Spinner } from './components/spinners/spinner';
import axios from 'axios';
import { API_URL } from './constants/constant';
import { toggleSpinnerOff, toggleSpinnerOn } from './redux/features/spinner';
import CannotConnectToServer from './components/cannot-connect-server.component';

export const App = () => {
  const user = useSelector((state: RootState) => state.user);
  const isSpinnerLoading = useSelector(
    (state: RootState) => state.spinner.isLoading
  );
  const dispatch: AppDispatch = useDispatch();
  const [isPingTimedOut, setPingTimedOut] = useState<boolean>(false);

  const [initialRoute, setInitialRoute] = useState<string>('LOGIN_SCREEN');

  useLayoutEffect(() => {
    dispatch(toggleSpinnerOn());
    axios
      .get(`${API_URL}/health`, {
        timeout: 1500,
      })
      .catch((e) => {
        console.error(e);
        setPingTimedOut(true);
      })
      .finally(() => dispatch(toggleSpinnerOff()));
  }, []);

  return isPingTimedOut ? (
    <CannotConnectToServer
      isShown={isPingTimedOut}
      toggleShown={() => setPingTimedOut(false)}
    />
  ) : (
    <>
      <StatusBar barStyle="dark-content" />
      <NavigationContainer>
        <StackNavigator
          initialRouteName={initialRoute}
          screenOptions={{
            headerShown: false,
          }}
        >
          <StackScreen name={'LOGIN_SCREEN'} component={LoginScreen} />
          <StackScreen name={'MAIN'} component={MainNavigator} />
        </StackNavigator>

        {isSpinnerLoading ? <Spinner /> : null}
      </NavigationContainer>
    </>
  );
};

export default App;
