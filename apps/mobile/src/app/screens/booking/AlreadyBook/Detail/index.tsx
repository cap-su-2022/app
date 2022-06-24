import {BLACK, FPT_ORANGE_COLOR, GRAY, WHITE} from '@app/constants';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
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

  const InfoDetail = (props) => {
    return (
      <View>
        <Text style={{
          color: GRAY,
          fontSize: deviceWidth / 24,
          fontWeight: '600'
        }}>
          {props.title}
        </Text>
        <View style={{
          display: 'flex',
          height: 40,
          width: deviceWidth / 1.05,
          backgroundColor: WHITE,
          borderRadius: 8,
        }}>
          <Text style={{
            color: BLACK,
            fontWeight: '500',
            marginTop: 10,
            marginLeft: 10
          }}>{props.detail}</Text>
        </View>
      </View>
    )
  }

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
            <InfoDetail title={'Book At'} detail={dayjs(currentBookingRoom.bookedAt).format('HH:mm:ss DD/MM/YYYY')}/>
            <InfoDetail title={'Check-in at'} detail={dayjs(currentBookingRoom.timeCheckIn).format('HH:mm:ss DD/MM/YYYY') }/>
            <InfoDetail title={'Request at'} detail={dayjs(currentBookingRoom.requestedAt).format('HH:mm:ss DD/MM/YYYY')}/>
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
