import React, {useRef, useState} from "react";
import {SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import * as IconOutline from "react-native-heroicons/outline";
import * as Icon from "react-native-heroicons/solid";
import {FPT_ORANGE_COLOR} from "../constants/fpt-color";
import {useNavigation} from "@react-navigation/native";


const SettingsScreen = () => {
  const scrollViewRef = useRef<null | ScrollView>(null);
  const navigate = useNavigation();
  return (
    <SafeAreaView>
      <ScrollView
        ref={(ref) => {
          scrollViewRef.current = ref;
        }}
        contentInsetAdjustmentBehavior="automatic"
        style={styles.scrollView}
      >
        <View style={[styles.header]}>
          <View style={[styles.headerTitle]}>
            <TouchableOpacity onPress={() => {
              navigate.navigate({
                name: 'EditUserProfile',
              });
            }} style={[styles.editProfileNavigation]}>
              <Text style={{
                color: '#fff'
              }}>Con Cac</Text>

            </TouchableOpacity>
            <IconOutline.UserCircleIcon color="black" size={40}/>
          </View>
          <View style={[styles.headerBody]}>
            <Icon.UserCircleIcon size={80} color="#f06e28"/>
            <Text style={[styles.userAvatarname]}>Ngô Nguyên Bằng</Text>
            <Text style={[styles.userEmail]}>bangnnse140937@fpt.edu.vn</Text>
          </View>
        </View>


      </ScrollView>
    </SafeAreaView>
  );
}

export default SettingsScreen;

export const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: '#ffffff',
  },
  header: {
    display: 'flex',
    marginLeft: 5,
    marginRight: 5,
    height: 200
  },
  userInfoIcon: {
    color: '#000',
    fontSize: 20
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
    fontSize: 12
  },
  editProfileNavigation: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: FPT_ORANGE_COLOR,
    borderRadius: 5,
    height: 30
  }
});
