import React, { useEffect, useLayoutEffect, useState } from 'react';
import { AsyncStorage, StatusBar } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { StackNavigator, StackScreen } from '@app/utils';
import { useSelector } from 'react-redux';
import { RootState } from './redux/store';
import LoginScreen from './screens/login.screen';
import MainNavigator from './navigation/main.navigator';
import { Spinner } from './components/spinners/spinner';
import axios from 'axios';
import { API_URL } from './constants/constant';
import { toggleSpinnerOff, toggleSpinnerOn } from './redux/features/spinner';
import CannotConnectToServer from './components/cannot-connect-server.component';
import { LOCAL_STORAGE } from './utils/local-storage';
import { useAppDispatch } from './hooks/use-app-dispatch.hook';
import {
  setQuickAccessData,
  toggleNotification,
} from './redux/features/system/system.slice';
import { DEFAULT_QUICK_ACCESS } from './constants/quick-access-navigation.constant';
import { useAppSelector } from './hooks/use-app-selector.hook';
import { addUserAfterCloseApp } from './redux/features/auth/slice';
import messaging from '@react-native-firebase/messaging';

export const App = () => {
  const user = useSelector((state: RootState) => state.user);
  const isSpinnerLoading = useSelector(
    (state: RootState) => state.spinner.isLoading
  );
  const dispatch = useAppDispatch();
  const [isPingTimedOut, setPingTimedOut] = useState<boolean>(false);

  const [initialRoute, setInitialRoute] = useState<string>('LOGIN_SCREEN');
  const authUser = useAppSelector((state) => state.auth.authUser);

  const isEmpty = (user) => {
    for (const prop in user) {
      if (Object.prototype.hasOwnProperty.call(user, prop)) {
        return false;
      }
    }
  };

  const requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Authorization status:', authStatus);
    }
  };

  const getFCMToken = async () => {
    const fcmToken = await LOCAL_STORAGE.getString('fcmToken');
    console.log(fcmToken, 'old token');
    if (!fcmToken) {
      try {
        const fcmToken = await messaging().getToken();
        if (fcmToken) {
          console.log(fcmToken, 'new token');
          await LOCAL_STORAGE.set('fcmToken', fcmToken);
        }
      } catch (e) {
        console.log(e, 'Error in fcmToken');
      }
    }
  };
  const notificationListener = () => {
    messaging().onNotificationOpenedApp((remoteMessage) => {
      console.log(
        'notification caused app to open from background state: ',
        remoteMessage.notification
      );
    });

    messaging().onMessage(async (remoteMessage) => {
      console.log('notification on foreground state ', remoteMessage);
    });
  };

  useEffect(() => {
    console.log('aaaa');
    requestUserPermission().then((r) => console.log(r));
    notificationListener();
    getFCMToken().then((r) => console.log(r));
  }, []);

  useEffect(() => {
    if (!LOCAL_STORAGE.contains('QUICK_ACCESS')) {
      LOCAL_STORAGE.set('QUICK_ACCESS', JSON.stringify(DEFAULT_QUICK_ACCESS));
      dispatch(setQuickAccessData([]));
    } else {
      dispatch(
        setQuickAccessData(JSON.parse(LOCAL_STORAGE.getString('QUICK_ACCESS')))
      );
    }

    if (!LOCAL_STORAGE.contains('NOTIFICATION_BELL')) {
      LOCAL_STORAGE.set('NOTIFICATION_BELL', true);
    } else {
      dispatch(
        toggleNotification(
          LOCAL_STORAGE.getBoolean('NOTIFICATION_BELL').valueOf()
        )
      );
    }
  }, []);

  useEffect(() => {
    if (!isEmpty(authUser)) {
      const user = LOCAL_STORAGE.getString('user');
      if (typeof user !== 'undefined') {
        dispatch(addUserAfterCloseApp(JSON.parse(user)));
      }
    }
  }, []);

  useLayoutEffect(() => {
    dispatch(toggleSpinnerOn());
    axios
      .get(`${API_URL}/health`, {
        timeout: 1500,
      })
      .catch((e) => {
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
