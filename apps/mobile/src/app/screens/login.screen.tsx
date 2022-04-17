import React from 'react';

import {Image, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import Background from "../components/blob-scene-haikei.svg";
import {FPT_ORANGE_COLOR} from "../constants/fpt-color";
import FPTULogo from '../components/LogoFPTU.svg';
import Asterik from "../components/text/asterik";
import Divider from "../components/text/divider";
import GoogleIcon from '../components/google-icon.svg';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../redux/store";
import {persistGoogleIdToken} from "../redux/userSlice";
import {useNavigation} from "@react-navigation/native";
import {HomeRoute} from "../utils/screen.navigator.utils";

GoogleSignin.configure({

  iosClientId: '1013204251190-74m7mtno9e3ge4fdie3422hotor5217c.apps.googleusercontent.com',
  webClientId: '1013204251190-74m7mtno9e3ge4fdie3422hotor5217c.apps.googleusercontent.com',
  offlineAccess: false
});
const LoginScreen = () => {


  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigation();

  const onGoogleButtonPress = async () => {
    await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true}); // <-- Add this
    const {idToken} = await GoogleSignin.signIn();
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    return auth().signInWithCredential(googleCredential);
  }

  return (
    <SafeAreaView style={{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      <Background style={[styles.background]}/>
      <View style={[styles.loginContainer, styles.shadowProp]}>
        <View style={[styles.logoContainer]}>
          <FPTULogo height={100} width={150}/>
        </View>
        <View>
          <View style={[styles.inputFieldTitleContainer]}>
            <Text style={[styles.inputFieldTitle]}>Username </Text><Asterik/>
          </View>
          <TextInput placeholder="Username" style={[styles.inputField]}/>
        </View>
        <View>
          <View style={[styles.inputFieldTitleContainer]}>
            <Text style={[styles.inputFieldTitle]}>Password </Text><Asterik/>
          </View>
          <TextInput secureTextEntry={true} placeholder="Password" style={[styles.inputField]}/>
        </View>
        <TouchableOpacity style={[styles.loginBtn]}>
          <Text style={[styles.loginBtnText]}>Login</Text>
        </TouchableOpacity>
        <View style={[styles.loginDividerContainer]}>
          <Divider num={10}/>
          <Text style={[styles.loginDividerText]}>Or continue with</Text>
          <Divider num={10}/>
        </View>

        <TouchableOpacity style={[styles.loginGoogleBtn]} onPress={() => {
          onGoogleButtonPress().then((auth) => {
            console.log(auth.user.getIdToken().then((token) => {
              dispatch(persistGoogleIdToken(auth.user.getIdToken()));
              console.log(user.googleIdToken);
              navigate.navigate(HomeRoute.Home);
            }));

          });
        }}>
          <View style={[styles.loginGoogleBtnTextContainer]}>
            <GoogleIcon style={[styles.googleIcon]}/>
            <Text style={[styles.loginGoogleBtnText]}>Google</Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  loginContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: 'rgb(248, 249, 250)',
    width: 350
  },
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 16,
    bottom: 0,
  },
  inputFieldTitleContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginLeft: 10
  },
  inputFieldTitle: {
    fontSize: 12,
    fontWeight: '500',
  },
  inputField: {
    margin: 10,
    width: 270,
    height: 35,
    borderWidth: 1,
    borderColor: 'rgb(206, 212, 218)',
    borderRadius: 5,
  },
  loginBtn: {
    margin: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: FPT_ORANGE_COLOR,
    width: 280,
    height: 40,
    borderColor: '#fff',
    borderRadius: 50,
    borderWidth: 1
  },
  loginBtnText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: "500",
  },
  loginGoogleBtn: {
    margin: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    width: 120,
    height: 40,
    borderColor: 'rgb(206, 212, 218)',
    borderRadius: 50,
    borderWidth: 1
  },
  loginGoogleBtnTextContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  googleIcon: {
    marginTop: 2,
    marginRight: 6
  },
  loginGoogleBtnText: {
    fontSize: 14,
    color: '#000'
  },
  logoContainer: {},
  loginDividerContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  loginDividerText: {
    fontSize: 10,
    color: 'rgb(134, 142, 150)',
    marginTop: 10,
    marginLeft: 6,
    marginRight: 6,
  },
  shadowProp: {
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
});

export default LoginScreen;
