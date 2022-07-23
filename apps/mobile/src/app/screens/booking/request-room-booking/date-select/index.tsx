import React, {useMemo, useState} from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { CalendarIcon } from 'react-native-heroicons/outline';
import { FPT_ORANGE_COLOR, GRAY, WHITE } from '@app/constants';
import { useAppNavigation } from '../../../../hooks/use-app-navigation.hook';
import { useAppDispatch } from '../../../../hooks/use-app-dispatch.hook';
import { deviceWidth } from '../../../../utils/device';
import DateSelectMultiDateCheckbox from './multi-date';
import {useAppSelector} from "../../../../hooks/use-app-selector.hook";
import dayjs from "dayjs";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface RequestRoomBookingDateSelectProps {
  isChecked: boolean;
  handleCheck(): void;
}
const RequestRoomBookingDateSelect: React.FC<
  RequestRoomBookingDateSelectProps
> = (props) => {
  const navigate = useAppNavigation();
  const dispatch = useAppDispatch();
  const Today = useMemo(() => {
    return dayjs(new Date()).format('ddd DD/MM/YYYY');
  }, []);
  const roomBooking = useAppSelector(
    (state) => state.roomBooking.addRoomBooking
  );


  return (
    <View>
      <View style={styles.startDayContainer}>
        <View style={styles.inputStartDay}>
          <Text style={styles.title}>From date</Text>
          <TouchableOpacity
            style={styles.bookingNowContainer}
            onPress={() => {
              navigate.navigate('ROOM_BOOKING_CHOOSE_START_DAY');
            }}
          >
            <Text style={styles.bookingNowButtonText}>{roomBooking.fromDay || Today}</Text>
            <CalendarIcon size={25} color={FPT_ORANGE_COLOR} />
          </TouchableOpacity>
        </View>
        <DateSelectMultiDateCheckbox
          handleCheck={() => props.handleCheck()}
          isChecked={props.isChecked}
        />
      </View>

      {props.isChecked ? (
        <>
          <Text style={styles.title}>To date</Text>
          <TouchableOpacity
            style={[styles.bookingNowContainer, { width: deviceWidth / 1.2 }]}
            onPress={() => {
              navigate.navigate('ROOM_BOOKING_CHOOSE_END_DAY');
            }}
          >
            <Text style={styles.bookingNowButtonText}>{roomBooking.toDay || Today}</Text>
            <CalendarIcon size={25} color={FPT_ORANGE_COLOR} />
          </TouchableOpacity>
        </>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: deviceWidth / 23,
    fontWeight: '600',
    marginBottom: 6,
    marginLeft: 5,
  },
  startDayContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  inputStartDay: {
    display: 'flex',
    flexDirection: 'column',
  },
  bookingNowContainer: {
    width: deviceWidth / 1.5,
    height: 50,
    paddingHorizontal: 10,
    borderWidth: 2,
    borderColor: WHITE,
    fontSize: 20,
    fontWeight: '600',
    borderRadius: 10,
    marginBottom: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(240, 110, 40, 0.2)',
  },
  bookingNowButtonText: {
    fontSize: deviceWidth / 23,
    fontWeight: '600',
    color: GRAY,
  },
});

export default RequestRoomBookingDateSelect;
