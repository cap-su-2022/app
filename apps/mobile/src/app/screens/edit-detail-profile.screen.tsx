import React, {Ref, useRef} from "react";
import {SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View} from "react-native";
import Asterik from "../components/text/asterik";
import {Formik, FormikProps,} from 'formik';
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../redux/store";
import {updateProfile} from "../redux/userSlice";

interface EditDetailProfileProps {
  formikRef: Ref<FormikProps<any>>,
}

const EditDetailProfile = (props: EditDetailProfileProps) => {
  const scrollViewRef = useRef<null | ScrollView>(null);

  const userState = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  const handleUserProfileUpdate = (values) => {
    dispatch(updateProfile({
      fullname: values.fullname,
      phone: values.phone,
      studentCode: values.studentCode,
    }));
  }

  const initialValues = {
    fullname: userState.user.fullname,
    phone: userState.user.phone,
    studentCode: userState.user.studentCode,
  }

  return (
    <SafeAreaView>
      <ScrollView
        ref={(ref) => {
          scrollViewRef.current = ref;
        }}
        contentInsetAdjustmentBehavior="automatic"
        style={styles.scrollView}
      >
        <Formik innerRef={props.formikRef} initialValues={initialValues}
        onSubmit={(values) => {
          handleUserProfileUpdate(values);
        }}>
          {({handleChange, handleBlur, handleSubmit, values}) => (
            <>
              <View style={[styles.header, styles.shadowBox]}>
                <View>
                  <Text style={[styles.textInputHeader]}>Họ & tên <Asterik/></Text>
                  <TextInput
                    style={[styles.textInput]}
                    value={values.fullname}
                    placeholder={"Vui lòng nhập họ và tên"}
                    onBlur={handleBlur("fullname")}
                    onChangeText={handleChange("fullname")}
                    autoCapitalize="none"
                    autoCorrect={false}
                  />
                </View>

                <View>
                  <Text style={[styles.textInputHeader]}>Số điện thoại <Asterik/></Text>
                  <TextInput
                    style={[styles.textInput]}
                    value={values.phone}
                    placeholder={"Vui lòng nhập số điện thoại"}
                    onBlur={handleBlur("phone")}
                    autoCapitalize="none"
                    autoCorrect={false}
                    onChangeText={handleChange("phone")}
                  />
                </View>

                <View>
                  <Text style={[styles.textInputHeader]}>Mã số sinh viên <Asterik/></Text>
                  <TextInput
                    placeholder={"Vui lòng nhập số điện thoại"}
                    onBlur={handleBlur("studentCode")}
                    autoCapitalize="none"
                    autoCorrect={false}
                    style={[styles.textInput]}
                    onChangeText={handleChange("studentCode")}
                    value={values.studentCode}/>
                </View>

              </View>
            </>
          )}

        </Formik>
      </ScrollView>
    </SafeAreaView>
  );
}

export default EditDetailProfile;

export const styles = StyleSheet.create({
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
    height: 250
  },
  textInputHeader: {
    margin: 5,
    fontSize: 14,
  },
  textInput: {
    width: 350,
    height: 40,
    borderWidth: 1,
    borderColor: 'rgb(206, 212, 218)',
    borderRadius: 5,
  }

});
