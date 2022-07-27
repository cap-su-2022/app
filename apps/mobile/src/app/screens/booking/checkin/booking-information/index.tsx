import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Divider from '../../../../components/text/divider';
import { deviceWidth } from '../../../../utils/device';
import dayjs from 'dayjs';
import {
  BLACK,
  FPT_ORANGE_COLOR,
  GRAY,
  INPUT_GRAY_COLOR,
} from '@app/constants';
import { ChevronRightIcon } from 'react-native-heroicons/outline';
import { useAppNavigation } from '../../../../hooks/use-app-navigation.hook';
import { CurrentCheckinInformation } from '../../../../redux/models/current-checkin-information.model';
import { useAppSelector } from '../../../../hooks/use-app-selector.hook';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface ReadyToCheckinBookingInformationProps {}

const ReadyToCheckinBookingInformation: React.FC<
  ReadyToCheckinBookingInformationProps
> = (props) => {
  const navigate = useAppNavigation();
  const { currentCheckinInformation } = useAppSelector(
    (state) => state.roomBooking
  );
  return (
    <>
      <Text style={styles.informationHeaderTitle}>BOOKING INFORMATION</Text>
      <View style={styles.bookingInformationContainer}>
        <View style={styles.dataRowContainer}>
          <Text style={styles.titleText}>Requested By</Text>
          <Text style={styles.valueText}>
            {currentCheckinInformation.requestedBy}
          </Text>
        </View>
        <Divider num={deviceWidth / 10} />
        <View style={styles.dataRowContainer}>
          <Text style={styles.titleText}>Library Room</Text>
          <Text style={styles.valueText}>
            {currentCheckinInformation.roomName}
          </Text>
        </View>
        <Divider num={deviceWidth / 10} />

        <View style={styles.dataRowContainer}>
          <Text style={styles.titleText}>Check-in Time</Text>
          <Text style={styles.valueText}>
            Slot {currentCheckinInformation.checkinSlot} -{' '}
            {dayjs(new Date(currentCheckinInformation.checkinDate)).format(
              'DD/MM/YYYY'
            )}
          </Text>
        </View>

        <Divider num={deviceWidth / 10} />

        <View style={styles.dataRowContainer}>
          <Text style={styles.titleText}>Check-out Time</Text>
          <Text style={styles.valueText}>
            Slot {currentCheckinInformation.checkoutSlot} -{' '}
            {dayjs(new Date(currentCheckinInformation.checkinDate)).format(
              'DD/MM/YYYY'
            )}
          </Text>
        </View>

        <Divider num={deviceWidth / 10} />

        <View style={styles.dataRowContainer}>
          <Text style={styles.titleText}>Requested devices</Text>
          <TouchableOpacity
            onPress={() => navigate.navigate('ACCEPT_BOOKING_LIST_DEVICES')}
            style={styles.viewDevicesContainer}
          >
            <Text style={styles.viewDevicesText}>View devices</Text>
            <ChevronRightIcon
              color={FPT_ORANGE_COLOR}
              size={deviceWidth / 14}
            />
          </TouchableOpacity>
        </View>

        <Divider num={deviceWidth / 10} />

        <View style={styles.dataRowContainer}>
          <Text style={styles.titleText}>Booking Reason</Text>
          <Text style={styles.valueText}>
            {currentCheckinInformation.bookingReason}
          </Text>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  informationHeaderTitle: {
    marginTop: 20,
    color: GRAY,
    fontSize: deviceWidth / 23,
    fontWeight: '600',
    marginLeft: 20,
  },
  bookingInformationContainer: {
    marginTop: 10,
    display: 'flex',
    width: deviceWidth / 1.1,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: INPUT_GRAY_COLOR,
    alignSelf: 'center',
  },
  dataRowContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 10,
    flexWrap: 'wrap',
  },
  titleText: {
    color: GRAY,
    fontWeight: '400',
    fontSize: deviceWidth / 23,
  },
  valueText: {
    color: BLACK,
    fontSize: deviceWidth / 23,
    fontWeight: '500',
  },

  viewDevicesContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewDevicesText: {
    color: FPT_ORANGE_COLOR,
    fontSize: deviceWidth / 23,
    fontWeight: '500',
  },
});

export default ReadyToCheckinBookingInformation;