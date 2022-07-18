import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useAppDispatch } from '../../../hooks/use-app-dispatch.hook';
import { useAppNavigation } from '../../../hooks/use-app-navigation.hook';
import {
  BLACK,
  FPT_ORANGE_COLOR,
  GRAY,
  INPUT_GRAY_COLOR,
  LIGHT_GRAY,
  WHITE,
} from '@app/constants';
import { deviceWidth } from '../../../utils/device';
import {
  CheckCircleIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ExclamationIcon,
  XCircleIcon,
  XIcon,
} from 'react-native-heroicons/outline';
import Divider from '../../../components/text/divider';
import { useAppSelector } from '../../../hooks/use-app-selector.hook';
import dayjs from 'dayjs';

const AcceptBooking: React.FC<any> = () => {
  const dispatch = useAppDispatch();
  const navigate = useAppNavigation();
  const { bookingRoom } = useAppSelector((state) => state.roomBooking);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: WHITE }}>
      <View
        style={{
          display: 'flex',
          flex: 1,
          justifyContent: 'space-between',
          flexDirection: 'column',
        }}
      >
        <ScrollView
          style={{
            backgroundColor: WHITE,
          }}
          showsVerticalScrollIndicator={false}
        >
          <View>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <TouchableOpacity onPress={() => navigate.pop()}>
                <ChevronLeftIcon
                  style={{
                    marginTop: -10,
                    marginLeft: 20,
                  }}
                  size={deviceWidth / 14}
                  color={FPT_ORANGE_COLOR}
                />
              </TouchableOpacity>
              <Text style={styles.headerTitleText}>
                Incoming Booking Request
              </Text>
            </View>
            <View style={styles.warningMessageContainer}>
              <ExclamationIcon
                color={FPT_ORANGE_COLOR}
                size={deviceWidth / 14}
                style={styles.warningMessageIcon}
              />
              <Text style={styles.warningMessageText}>
                Read the booking request information carefully before proceeding
                the next step!
              </Text>
            </View>
            <Text style={styles.informationHeaderTitle}>
              BOOKING INFORMATION
            </Text>
            <View
              style={{
                marginTop: 10,
                display: 'flex',
                width: deviceWidth / 1.1,
                borderRadius: 8,
                borderWidth: 1,
                borderColor: INPUT_GRAY_COLOR,
                alignSelf: 'center',
              }}
            >
              <View style={styles.dataRowContainer}>
                <Text style={styles.titleText}>Requested By</Text>
                <Text style={styles.valueText}>{bookingRoom.requestedBy}</Text>
              </View>
              <Divider num={deviceWidth / 10} />
              <View style={styles.dataRowContainer}>
                <Text style={styles.titleText}>Libary Room</Text>
                <Text style={styles.valueText}>{bookingRoom.roomName}</Text>
              </View>
              <Divider num={deviceWidth / 10} />

              <View style={styles.dataRowContainer}>
                <Text style={styles.titleText}>Check-in Time</Text>
                <Text style={styles.valueText}>
                  {bookingRoom.checkinSlot} -{' '}
                  {dayjs(new Date(bookingRoom.checkinDate)).format(
                    'DD/MM/YYYY'
                  )}
                </Text>
              </View>

              <Divider num={deviceWidth / 10} />

              <View style={styles.dataRowContainer}>
                <Text style={styles.titleText}>Check-out Time</Text>
                <Text style={styles.valueText}>
                  {' '}
                  {bookingRoom.checkoutSlot} -{' '}
                  {dayjs(new Date(bookingRoom.checkinDate)).format(
                    'DD/MM/YYYY'
                  )}
                </Text>
              </View>

              <Divider num={deviceWidth / 10} />

              <View style={styles.dataRowContainer}>
                <Text style={styles.titleText}>Requested devices</Text>
                <TouchableOpacity
                  onPress={() =>
                    navigate.navigate('ACCEPT_BOOKING_LIST_DEVICES')
                  }
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}
                >
                  <Text
                    style={{
                      color: FPT_ORANGE_COLOR,
                      fontSize: deviceWidth / 23,
                      fontWeight: '500',
                    }}
                  >
                    View devices
                  </Text>
                  <ChevronRightIcon
                    color={FPT_ORANGE_COLOR}
                    size={deviceWidth / 14}
                  />
                </TouchableOpacity>
              </View>

              <Divider num={deviceWidth / 10} />

              <View style={styles.dataRowContainer}>
                <Text style={styles.titleText}>Booking Reason</Text>
                <Text style={styles.valueText}>{bookingRoom.reason}</Text>
              </View>
            </View>

            <View
              style={{
                marginTop: 20,
              }}
            >
              <Text style={styles.informationHeaderTitle}>
                MORE INFORMATION
              </Text>
              <View
                style={{
                  marginTop: 10,
                  display: 'flex',
                  width: deviceWidth / 1.1,
                  borderRadius: 8,
                  borderWidth: 1,
                  borderColor: INPUT_GRAY_COLOR,
                  alignSelf: 'center',
                }}
              >
                <View style={styles.dataRowContainer}>
                  <Text style={styles.titleText}>Booking ID</Text>
                  <Text style={styles.valueText}>{bookingRoom.id}</Text>
                </View>
                <Divider num={deviceWidth / 10} />
                <View
                  style={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    margin: 10,
                    flexWrap: 'wrap',
                  }}
                >
                  <Text style={styles.titleText}>Requested At</Text>
                  <Text style={styles.valueText}>
                    {dayjs(new Date(bookingRoom.requestedAt)).format(
                      'DD/MM/YYYY HH:mm'
                    )}
                  </Text>
                </View>
                {bookingRoom.description ? (
                  <>
                    <Divider num={deviceWidth / 10} />
                    <View style={styles.dataRowContainer}>
                      <Text style={styles.titleText}>Description</Text>
                      <Text style={styles.valueText}>
                        {bookingRoom.description}
                      </Text>
                    </View>
                  </>
                ) : null}
              </View>

              <View
                style={{
                  marginTop: 20,
                }}
              >
                <Text
                  style={{
                    color: GRAY,
                    fontSize: deviceWidth / 23,
                    fontWeight: '600',
                    marginLeft: 20,
                  }}
                >
                  SIGNATURE
                </Text>
                <View
                  style={{
                    marginTop: 10,
                    display: 'flex',
                    width: deviceWidth / 1.1,
                    borderRadius: 8,
                    borderWidth: 1,
                    borderColor: INPUT_GRAY_COLOR,
                    alignSelf: 'center',
                    height: 150,
                  }}
                >
                  <View style={styles.dataRowContainer}></View>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>

        <View
          style={{
            height: 80,
            backgroundColor: WHITE,
            display: 'flex',
            justifyContent: 'space-evenly',
            alignItems: 'center',
            flexDirection: 'row',
          }}
        >
          <TouchableOpacity
            style={{
              width: deviceWidth / 2.5,
              height: 50,
              borderWidth: 2,
              borderColor: FPT_ORANGE_COLOR,
              borderRadius: 8,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'row',
            }}
          >
            <XCircleIcon color={FPT_ORANGE_COLOR} size={deviceWidth / 14} />
            <Text
              style={{
                marginLeft: 10,
                color: FPT_ORANGE_COLOR,
                fontSize: deviceWidth / 19,
                fontWeight: '600',
              }}
            >
              Reject
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              width: deviceWidth / 2.5,
              height: 50,
              backgroundColor: FPT_ORANGE_COLOR,
              borderRadius: 8,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'row',
            }}
          >
            <CheckCircleIcon color={WHITE} size={deviceWidth / 14} />
            <Text
              style={{
                marginLeft: 10,
                color: WHITE,
                fontSize: deviceWidth / 19,
                fontWeight: '600',
              }}
            >
              Accept
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headerTitleText: {
    color: BLACK,
    fontWeight: '600',
    fontSize: deviceWidth / 18,
    marginBottom: 20,
    marginTop: 10,
    marginLeft: 30,
  },
  warningMessageContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: FPT_ORANGE_COLOR,
  },
  warningMessageIcon: {
    marginTop: 10,
    marginLeft: 10,
  },
  warningMessageText: {
    color: FPT_ORANGE_COLOR,
    fontSize: deviceWidth / 25,
    fontWeight: '600',
    margin: 10,
  },
  informationHeaderTitle: {
    marginTop: 20,
    color: GRAY,
    fontSize: deviceWidth / 23,
    fontWeight: '600',
    marginLeft: 20,
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
});

export default AcceptBooking;
