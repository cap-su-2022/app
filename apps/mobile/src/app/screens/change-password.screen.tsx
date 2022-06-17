import React, { Ref, useEffect, useRef, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Asterik from '../components/text/asterik';
import {
  FormikProps,
  FormikProvider,
  useFormik,
} from 'formik';
import * as Yup from 'yup';

import {
  PencilIcon,
  ViewListIcon,
} from "react-native-heroicons/outline";
import {
  BLACK,
  FPT_ORANGE_COLOR,
  WHITE
} from "@app/constants";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { deviceWidth } from "../utils/device";
import { doChangePassword } from "../redux/features/account/thunk/changePassword.thunk";
import { useAppDispatch } from "../hooks/use-app-dispatch.hook";
import { useAppNavigation } from "../hooks/use-app-navigation.hook";

interface ChangePasswordProps {
  formikRef: Ref<FormikProps<any>>;
}

const ChangePasswordScreen = (props: ChangePasswordProps) => {
  const scrollViewRef = useRef<null | ScrollView>(null);

  const dispatch = useAppDispatch();
  const navigate = useAppNavigation();

  const initialValues = {
    password: '',
  };

  const handleChangePassword = async (values) => {
    dispatch(
      doChangePassword({
     password: values.password
      })
    )
      .unwrap()
      .then(() => navigate.pop())
      .catch((e) => {
        alert(e.message);
      });
  };

  const changePasswordSchema = Yup.object().shape({
    password: Yup.string()
      .min(5, 'Too short!')
      .max(50, 'Too long!')
      .required('Required')
  });


  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: (values) => handleChangePassword(values),
    enableReinitialize: true,
    validationSchema: changePasswordSchema,
  });

  const ChangePasswordInput = () => {
    // @ts-ignore
    // @ts-ignore
    // @ts-ignore
    // @ts-ignore
    return (
      <ScrollView style={styles.scrollView}>
        <FormikProvider value={formik}>
          <View>
            <View
              style={{
                display: 'flex',
                backgroundColor: WHITE,
                marginTop: 10,
                height: 410,
                justifyContent: 'center',
              }}
            >
              <View
                style={{
                  marginLeft: 10,
                  width: deviceWidth / 1.1,
                }}
              >
                <Text style={[styles.textInputHeader]}>
                  New Password
                  <Asterik />
                </Text>
              </View>
              <View
                style={{
                  marginLeft: 10,
                  width: deviceWidth / 1.1,
                }}
              >
                <View style={styles.textInput}>
                  <View style={styles.iconContainer}>
                    <ViewListIcon color={BLACK} />
                  </View>
                  <TextInput
                    onChange={() => formik.handleChange('password')}
                    value={formik.values.password}
                    placeholder={'Please enter your password'}
                    onBlur={formik.handleBlur('password')}
                    onChangeText={formik.handleChange('password')}
                    autoCapitalize="none"
                    autoCorrect={false}
                    secureTextEntry={true}
                    // @ts-ignore
                    error={formik.errors.password}
                    touched={formik.touched.password}
                  />
                </View>
                {formik.errors.password && formik.touched.password ? (
                  <Text style={{ color: '#DC143C', fontWeight: '600' }}>
                    {formik.errors.password}
                  </Text>
                ) : null}
              </View>
            </View>
          </View>
        </FormikProvider>
      </ScrollView>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <ChangePasswordInput />

        <View style={styles.footerContainer}>
          <TouchableOpacity
            style={styles.updateProfileButton}
            onPress={() => formik.handleSubmit()}
          >
            <PencilIcon color={WHITE} />
            <Text style={styles.updateProfileButtonText}>Update Password</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ChangePasswordScreen;

export const styles = StyleSheet.create({
  iconContainer: {
    height: 50,
    width: 50,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInput: {
    borderRadius: 50,
    height: 50,
    borderWidth: 1,
    borderColor: 'rgb(206, 212, 218)',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    flexGrow: 1,
  },
  scrollView: {},
  shadowBox: {
    backgroundColor: 'white',
    shadowColor: 'black',
    shadowOpacity: 0.15,
    shadowOffset: {
      width: 1,
      height: 4,
    },
    shadowRadius: 12,
    padding: 24,
    marginBottom: 24,
  },
  header: {
    backgroundColor: '#ffffff',
    margin: 10,
    borderRadius: 5,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  myHeader: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  textInputHeader: {
    marginLeft: 10,
    fontSize: deviceWidth / 23,
    fontWeight: '600',
  },
  footerContainer: {
    backgroundColor: WHITE,
    height: 70,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  updateProfileButton: {
    width: deviceWidth / 1.25,
    height: 50,
    backgroundColor: FPT_ORANGE_COLOR,
    borderRadius: 8,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  updateProfileButtonText: {
    color: WHITE,
    fontSize: deviceWidth / 20,
    fontWeight: '600',
    marginLeft: 10,
  },
});
