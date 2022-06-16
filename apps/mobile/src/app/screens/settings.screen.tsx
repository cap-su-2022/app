import React, { useEffect, useRef, useState } from "react";
import {
  Image, ImagePickerIOS,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import * as IconOutline from "react-native-heroicons/outline";
import { DocumentSearchIcon, LogoutIcon, UserCircleIcon } from "react-native-heroicons/outline";
import * as Icon from "react-native-heroicons/solid";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { BLACK, FPT_ORANGE_COLOR, LIGHT_GRAY, WHITE } from "@app/constants";
import { LOCAL_STORAGE, revokeUserSession } from "../utils/local-storage";
import { deviceWidth } from "../utils/device";
import axios from "axios";
import { API_URL } from "../constants/constant";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";

const SettingsScreen = () => {
  const scrollViewRef = useRef<null | ScrollView>(null);
  const navigate = useNavigation<NativeStackNavigationProp<any>>();

  const handleLogout = () => {
    revokeUserSession();
    setTimeout(() => {
      navigate.replace("LOGIN_SCREEN");
    }, 0);
  };

  const [avatarURL, setAvatarURL] = useState<string>(null);

  useEffect(() => {
    getAvatarURL();
  }, [avatarURL]);

  const getAvatarURL = async () => {
    const response = await axios.get(`${API_URL}/accounts/avatar`, {
      headers: {
        "Authorization": LOCAL_STORAGE.getString("accessToken")
      }
    });
    const data = await response.data;
    console.log(data);
    setAvatarURL(data);
  };

  const openImageLibrary = async () => {
    const result = await launchImageLibrary({
      maxHeight: 500,
      maxWidth: 500,
      mediaType: "photo"
    });
    console.log(result.assets[0].uri);
    const formData = new FormData();
    formData.append("file", JSON.stringify({
      uri: result.assets[0].uri,
      name: "123.png",
      type: "image/jpeg"
    }));

    try {
      const response = await axios.put(`${API_URL}/accounts/update/upload-avatar/profile`, {
        body: formData
      }, {
        headers: {
          "Authorization": LOCAL_STORAGE.getString("accessToken")
        }
      });
      const data = await response.data;
      console.log(data);
      getAvatarURL();
    } catch (e) {
      console.log(JSON.stringify(e.response));
    }
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
            {/*<TouchableOpacity
              onPress={() => navigate.navigate('EditUserProfile')}
              style={{
                height: 40,
                width: deviceWidth / 3,
                borderRadius: 50,
                borderWidth: 2,
                borderColor: FPT_ORANGE_COLOR,
                display: 'flex',
                justifyContent: 'flex-start',
                flexDirection: 'row',
                alignItems: 'center'
            }}>
              <IconOutline.UserCircleIcon
                color={FPT_ORANGE_COLOR}
                size={40}/>
              <Text style={{
                fontSize: deviceWidth / 23,
                fontWeight: '600',
                color: FPT_ORANGE_COLOR
              }}>
                Profile
              </Text>
            </TouchableOpacity>*/}
          </View>
          <View style={[styles.headerBody]}>
            {avatarURL ? <TouchableOpacity onPress={() => openImageLibrary()}>
              <Image source={{ uri: avatarURL }} style={{
                height: 80,
                width: 80,
                borderRadius: 50
              }
              } />
            </TouchableOpacity> : <Icon.UserCircleIcon size={80} color="#f06e28" />}
            <Text style={[styles.userAvatarname]}>Ngô Nguyên Bằng</Text>
            <Text style={[styles.userEmail]}>bangnnse140937@fpt.edu.vn</Text>
          </View>
        </View>
        <View style={styles.logoutContainer}>
          <TouchableOpacity
            style={styles.logoutButton}
            onPress={() => navigate.navigate('EditUserProfile')}
          >
            <View style={styles.logoutIconContainer}>
              <UserCircleIcon color={BLACK} />
            </View>
            <Text style={styles.logoutText}>My Profile</Text>
          </TouchableOpacity>
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
    color: BLACK,
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
    color: BLACK,
    fontWeight: '500',
  },
  userEmail: {
    color: BLACK,
    fontSize: 12,
  },
  editProfileNavigation: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: FPT_ORANGE_COLOR,
    borderRadius: 5,
    height: 30,
    marginLeft: 10,
    marginTop: 10
  },
});
