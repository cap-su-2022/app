import {BLACK, FPT_ORANGE_COLOR, GRAY, WHITE} from '@app/constants';
import { deviceWidth } from 'apps/mobile/src/app/utils/device';
import React, {useEffect} from 'react';
import {SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {LibraryIcon, XCircleIcon} from "react-native-heroicons/outline";
import {useAppNavigation} from "../../../../hooks/use-app-navigation.hook";
import {useAppDispatch} from "../../../../hooks/use-app-dispatch.hook";
import {cancelRoomBookingById} from "../../../../redux/features/room-booking/thunk/cancel-room-booking-by-id.thunk";
import {useAppSelector} from "../../../../hooks/use-app-selector.hook";
import dayjs from "dayjs";

const AlreadyBookDetail: React.FC<any> = (props) => {

  const currentBookingRoom = useAppSelector((state) => state.roomBooking.currentBookingRoom);

  const navigate = useAppNavigation();
  const dispatch = useAppDispatch();

  useEffect(() => {
  }, []);

  const handleCancelBookingRoom = () => {
    dispatch(cancelRoomBookingById(currentBookingRoom.id))
      .unwrap()
      .catch(console.log);
  }

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        justifyContent: 'space-between'
      }}>
        <ScrollView style={{
          height: 300,
        }}>
          <View style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <View style={{
              height: 60,
              width: 60,
              borderRadius: 50,
              borderWidth: 2,
              borderColor: FPT_ORANGE_COLOR,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              <LibraryIcon color={FPT_ORANGE_COLOR} size={deviceWidth / 12}/>
            </View>
            <Text style={{
              color: BLACK,
              fontSize: deviceWidth / 19,
              fontWeight: '600'
            }}>Room {currentBookingRoom.roomName}</Text>
          </View>

          <View style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}>
            <Text style={{
              color: GRAY,
              fontSize: deviceWidth / 26,
              fontWeight: '600',
              display: 'flex',
              alignSelf: 'flex-start',
              marginLeft: 10
            }}>TIME TO CHECK-IN</Text>
            <View style={{
              height: 50,
              width: deviceWidth / 1.05,
              borderRadius: 8,
              backgroundColor: WHITE,
              justifyContent: 'center',

            }}>
              <Text style={{marginLeft: 10, fontWeight: '500', color: BLACK}}>{dayjs(currentBookingRoom.timeCheckIn).format('HH:mm:ss DD/MM/YYYY')}</Text>
            </View>
          </View>
        </ScrollView>
        <View style={{
          height: 90,
          backgroundColor: WHITE,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <TouchableOpacity
            onPress={() => handleCancelBookingRoom()}
            style={{
            height: 50,
            width: deviceWidth / 1.25,
            backgroundColor: FPT_ORANGE_COLOR,
            borderRadius: 8,
            display: 'flex',
            justifyContent: 'space-evenly',
            alignItems: 'center',
            flexDirection: 'row'
          }}>
            <XCircleIcon color={WHITE} size={deviceWidth / 13}/>
            <Text style={{
              color: WHITE,
              fontWeight: '600',
              fontSize: deviceWidth / 21
            }}>
              Cancel this booking room
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {

  }
});

export default AlreadyBookDetail;
