import React, { useMemo } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { CalendarIcon } from 'react-native-heroicons/outline';
import { BLACK, FPT_ORANGE_COLOR, GRAY, WHITE } from '@app/constants';
import { useAppNavigation } from '../../../../hooks/use-app-navigation.hook';
import { deviceWidth } from '../../../../utils/device';
import DateSelectMultiDateCheckbox from './multi-date';
import { useAppSelector } from '../../../../hooks/use-app-selector.hook';
import dayjs from 'dayjs';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface RequestRoomBookingDateSelectProps {
  isChecked: boolean;
  handleCheck(): void;
}
const RequestRoomBookingDateSelect: React.FC<
  RequestRoomBookingDateSelectProps
> = (props) => {
  const navigate = useAppNavigation();
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
            <Text style={styles.bookingNowButtonText}>
              {dayjs(roomBooking.fromDay).format('ddd DD/MM/YYYY') || Today}
            </Text>
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
            <Text style={styles.bookingNowButtonText}>
              {roomBooking.toDay > roomBooking.fromDay
                ? dayjs(roomBooking.toDay).format('ddd DD/MM/YYYY')
                : dayjs(roomBooking.fromDay).format('ddd DD/MM/YYYY') ||
                  dayjs(roomBooking.fromDay).format('ddd DD/MM/YYYY')}
            </Text>
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
    color: BLACK,
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
