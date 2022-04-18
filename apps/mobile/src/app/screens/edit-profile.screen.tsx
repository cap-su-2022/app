import React, {useRef, useState} from "react";
import {SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import * as IconOutline from "react-native-heroicons/outline";
import * as Icon from "react-native-heroicons/solid";
import {FPT_ORANGE_COLOR} from "../constants/fpt-color";
import Divider from "../components/text/divider";


const EditProfile = () => {
  const [whatsNextYCoord, setWhatsNextYCoord] = useState<number>(0);
  const scrollViewRef = useRef<null | ScrollView>(null);
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
          <View style={{
            margin: 10
          }}>
            <InputTextView title="Fullname" value="Ngô Nguyên Bằng"/>
            <Divider num={45}/>
            <InputTextView title="Số điện thoại" value="0961618601"/>
            <Divider num={45}/>
            <InputTextView title="Mã số sinh viên" value="SE140937"/>
          </View>
        </View>

        <View style={[styles.userDetail]}>
          <View style={{
            margin: 10
          }}>
            <InputTextView title="Ngày sinh" value="13/06/2000"/>
            <Divider num={45}/>
            <InputTextView title="Giới tính" value="Nam"/>
            <Divider num={45}/>
            <InputTextView title="Email" value="bangnnse140937@fpt.edu.vn"/>
            <Divider num={45}/>
            <InputTextView title="Chuyên ngành" value="Software Engineering"/>
          </View>
        </View>

        <View style={[styles.active]}>
          <View style={{
            margin: 10
          }}>
            <InputTextView title="Trạng thái" value="Đã xác thực"/>
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const InputTextView = (props) => {
  return (
    <View style={{
      margin: 10,
      marginTop: 20,
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between'
    }}>
      <Text style={{
        fontSize: 21,
        color: 'gray'
      }}>
        {props.title}
      </Text>
      <Text  style={{
        fontSize: 21,
      }}>
        {props.value}
      </Text>
    </View>
  );
}



export default EditProfile;

export const styles = StyleSheet.create({
  scrollView: {
  },
  header: {
    backgroundColor: '#ffffff',

    display: 'flex',
    marginTop: 10,
    height: 200
  },
  userInfoIcon: {
    color: '#000',
    fontSize: 20
  },
  userDetail: {
    backgroundColor: '#ffffff',

    display: 'flex',
    marginTop: 10,
    height: 270
  },
  active: {
    backgroundColor: '#ffffff',

    display: 'flex',
    marginTop: 10,
    height: 80
  },

});
