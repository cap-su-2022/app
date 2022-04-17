import React, {useEffect} from 'react';

import {
  Modal,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import Background from "../components/blob-scene-haikei.svg";
import {FPT_ORANGE_COLOR} from "../constants/fpt-color";
import FPTULogo from '../components/LogoFPTU.svg';
import Asterik from "../components/text/asterik";
import Divider from "../components/text/divider";
import GoogleIcon from '../components/google-icon.svg';
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../redux/store";
import {persistGoogleIdToken} from "../redux/userSlice";
import {useNavigation} from "@react-navigation/native";
import {HomeRoute} from "../utils/screen.navigator.utils";
import {Spinner} from "../components/spinners/spinner";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import {handleGoogleSignin} from "../services/google.service";
import {AUTH_API, JSONFetcher, useLoginRequest} from "../utils/api.util";
import useSWR from 'swr';
import CheckAlive from "../components/check-alive.component";
import {Formik} from 'formik';
import * as Icon from "react-native-heroicons/solid";
import LoginErrorModal from "../components/modals/login-error.component";

const LoginScreen = () => {

    const user = useSelector((state: RootState) => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigation<NativeStackNavigationProp<any>>();

    const [isLoginLoading, setLoginLoading] = React.useState<boolean>(false);
    const [isError, setError] = React.useState<boolean>(false);
    const [isLoginFailure, setLoginFailure] = React.useState<boolean>(false);

    useEffect(() => {
      return () => {
        setLoginLoading(false);
      }
    });

    const handleLoginWithGoogle = async () => {
      setLoginLoading(true);
      const response = await handleGoogleSignin();
      const idToken = await response.user.getIdToken();
      if (idToken) {
        dispatch(persistGoogleIdToken(idToken));
        setLoginLoading(false);
        setTimeout(() => {
          navigate.navigate(HomeRoute.Home);
        }, 0);
      }
    };

    const initialValues = {
      username: '',
      password: ''
    }

    const handleSubmit = async (values) => {
      const response = await fetch("http://192.168.15.247:5000/api/v1/auth/signin", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "username": values.username,
          "password": values.password,
        }),
      });

      const data = await response.json();

      if (data?.error_description) {
        setLoginFailure(true);
      } else {
        setTimeout(() => {
          navigate.navigate(HomeRoute.Home);
        }, 0);
      }

    };


    return (
      <SafeAreaView style={[styles.container]}>

        <Background style={[styles.background]}/>
        <View style={[styles.loginContainer, styles.shadowProp]}>
          <View style={[styles.logoContainer]}>
            <FPTULogo height={100} width={150}/>
          </View>
          <Formik initialValues={initialValues} onSubmit={(values) => handleSubmit(values)}>
            {({handleChange, handleBlur, handleSubmit, values}) => (
              <>
                <View>
                  <View style={[styles.inputFieldTitleContainer]}>
                    <Text style={[styles.inputFieldTitle]}>Username </Text><Asterik/>
                  </View>
                  <TextInput
                    onBlur={handleBlur('username')}
                    onChangeText={handleChange('username')}
                    autoCapitalize="none"
                    autoCorrect={false}
                    value={values.username}
                    placeholder="Username"
                    style={[styles.inputField]}/>
                </View>
                <View>
                  <View style={[styles.inputFieldTitleContainer]}>
                    <Text style={[styles.inputFieldTitle]}>Password </Text><Asterik/>
                  </View>
                  <TextInput
                    onBlur={handleBlur('password')}
                    onChangeText={handleChange('password')}
                    autoCapitalize="none"
                    value={values.password}
                    autoCorrect={false}
                    secureTextEntry={true}
                    placeholder="Password"
                    style={[styles.inputField]}/>
                </View>
                <TouchableOpacity style={[styles.loginBtn]} onPress={() => handleSubmit()}>
                  <Text style={[styles.loginBtnText]}>Login</Text>
                </TouchableOpacity>
              </>
            )}

          </Formik>

          <View style={[styles.loginDividerContainer]}>
            <Divider num={10}/>
            <Text style={[styles.loginDividerText]}>Or continue with</Text>
            <Divider num={10}/>
          </View>

          <TouchableOpacity style={[styles.loginGoogleBtn]} onPress={() => handleLoginWithGoogle()}>
            <View style={[styles.loginGoogleBtnTextContainer]}>
              <GoogleIcon style={[styles.googleIcon]}/>
              <Text style={[styles.loginGoogleBtnText]}>Google</Text>
            </View>
          </TouchableOpacity>
        </View>
        {isLoginFailure ? <LoginErrorModal
          isFailure={isLoginFailure}
          title={"Invalid username or password."}
          description={"Please try again later"}
          handleCancelModal={setLoginFailure}/> : null}
        {isError ? <CheckAlive/> : null}
        {isLoginLoading ? <Spinner/> : null}
      </SafeAreaView>
    );
  }
;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
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
  modal: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    opacity: 0.5,
    backgroundColor: 'rgb(206, 212, 218)',
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default LoginScreen;
