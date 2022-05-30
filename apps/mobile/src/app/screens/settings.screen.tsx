import React, { useRef } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import * as IconOutline from 'react-native-heroicons/outline';
import { DocumentSearchIcon, LogoutIcon } from 'react-native-heroicons/outline';
import * as Icon from 'react-native-heroicons/solid';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { LocalStorageKeys, useStorage } from '../utils/local-storage';
import { BLACK, FPT_ORANGE_COLOR, LIGHT_GRAY, WHITE } from '@app/constants';

const SettingsScreen = () => {
  const scrollViewRef = useRef<null | ScrollView>(null);
  const navigate = useNavigation<NativeStackNavigationProp<any>>();

  const handleLogout = () => {
    setTimeout(() => {
      navigate.replace('LOGIN_SCREEN');
    }, 0);
  };

  return (
    <SafeAreaView>
      <ScrollView
        ref={(ref) => {
          scrollViewRef.current = ref;
        }}
        contentInsetAdjustmentBehavior="automatic"
      >
        <View style={[styles.header]}>
          <View style={[styles.headerTitle]}>
            <TouchableOpacity
              onPress={() => {
                navigate.navigate('EditUserProfile');
              }}
              style={[styles.editProfileNavigation]}
            >
              <Text
                style={{
                  color: '#fff',
                }}
              >
                Con Cac
              </Text>
            </TouchableOpacity>
            <IconOutline.UserCircleIcon color="black" size={40} />
          </View>
          <View style={[styles.headerBody]}>
            <Icon.UserCircleIcon size={80} color="#f06e28" />
            <Text style={[styles.userAvatarname]}>Ngô Nguyên Bằng</Text>
            <Text style={[styles.userEmail]}>bangnnse140937@fpt.edu.vn</Text>
          </View>
        </View>
        <View style={styles.logoutContainer}>
          <TouchableOpacity
            style={styles.logoutButton}
            onPress={() => navigate.navigate('History')}
          >
            <View style={styles.logoutIconContainer}>
              <DocumentSearchIcon color={BLACK} />
            </View>
            <Text style={styles.logoutText}>History</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.logoutContainer}>
          <TouchableOpacity
            style={styles.logoutButton}
            onPress={() => handleLogout()}
          >
            <View style={styles.logoutIconContainer}>
              <LogoutIcon color={BLACK} />
            </View>
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SettingsScreen;

export const styles = StyleSheet.create({
  logoutText: {
    fontSize: 20,
  },
  logoutIconContainer: {
    backgroundColor: LIGHT_GRAY,
    padding: 8,
    borderRadius: 10,
    marginRight: 15,
  },
  logoutContainer: {
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
    borderRadius: 5,
    height: 60,
    backgroundColor: WHITE,
  },
  logoutButton: {
    margin: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  header: {
    backgroundColor: WHITE,
    display: 'flex',
    marginLeft: 5,
    marginRight: 5,
    height: 160,
  },
  userInfoIcon: {
    color: BLACK,
    fontSize: 20,
  },
  headerTitle: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerBody: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  userAvatarname: {
    fontWeight: '500',
  },
  userEmail: {
    color: 'gray',
    fontSize: 12,
  },
  editProfileNavigation: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: FPT_ORANGE_COLOR,
    borderRadius: 5,
    height: 30,
  },
});
