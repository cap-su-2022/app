import React, {useRef} from "react";
import {SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {BLACK, WHITE} from "../../constants/colors";
import {ChatAlt2Icon, LibraryIcon} from "react-native-heroicons/outline";
import {LocalStorageKeys, useStorage} from "../../utils/local-storage";
import {useNavigation} from "@react-navigation/native";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import Divider from "../../components/text/divider";

const HistoryScreen: React.FC = (props) => {
  const [authenticatedUser, setAuthenticatedUser] = useStorage(LocalStorageKeys.authenticatedUser);

  const scrollViewRef = useRef<null | ScrollView>(null);
  const navigate = useNavigation<NativeStackNavigationProp<any>>();

  return (
    <SafeAreaView>
      <ScrollView
        ref={(ref) => {
          scrollViewRef.current = ref;
        }}
        contentInsetAdjustmentBehavior="automatic"
        style={{
          height: 400
        }}
      >
    <View style={[styles.container]}>
      <View style={{
        marginLeft: 10,
        marginRight: 10,
        marginTop: 10,
        backgroundColor: WHITE,
        display: 'flex',
        flexDirection: 'column',
        height: 130,
        borderRadius: 8

      }}>
        <View style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          marginLeft: 10,
          marginTop: 10,
        }}>
          <View style={{
            backgroundColor: '#f2f2f2',
            padding: 8,
            borderRadius: 10,
            marginRight: 15,
          }}>
            <LibraryIcon color={BLACK}/>
          </View>
          <Text style={{
            marginLeft: 10,
            fontSize: 20,
            color: BLACK,
          }}>Booking Request History</Text>
        </View>
        <Divider num={50}/>
        <TouchableOpacity onPress={() => navigate.navigate("FeedbackHistory")} style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          margin: 10,
        }}>
          <View style={{
            backgroundColor: '#f2f2f2',
            padding: 8,
            borderRadius: 10,
            marginRight: 15,
          }}>
            <ChatAlt2Icon color={BLACK}/>
          </View>
          <Text style={{
            marginLeft: 10,
            fontSize: 20,
            color: BLACK
          }}>Feedback History</Text>
        </TouchableOpacity>
      </View>

    </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export const styles = StyleSheet.create({
  container: {
    display: 'flex',


  }
});

export default HistoryScreen;
