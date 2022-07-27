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
  BOOKED,
  CANCELLED,
  CHECKED_IN,
  CHECKED_OUT,
  FPT_ORANGE_COLOR,
  GRAY,
  INPUT_GRAY_COLOR,
  LIGHT_GRAY,
  PENDING,
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
import AcceptBookingFooter from './footer';
import { acceptCheckinBookingRequest } from '../../../redux/features/room-booking/thunk/accept-checkin-booking-request.thunk';
import { rejectCheckinBookingRequest } from '../../../redux/features/room-booking/thunk/reject-checkin-booking-request.thunk';
import { acceptBookingRequest } from '../../../redux/features/room-booking/thunk/accept-booking-request.thunk';
import { rejectBookingRequest } from '../../../redux/features/room-booking/thunk/reject-booking-request.thunk';
import { acceptCheckoutBookingRequest } from '../../../redux/features/room-booking/thunk/accept-checkout-booking-request.thunk';
import { rejectCheckoutBookingRequest } from '../../../redux/features/room-booking/thunk/reject-checkout-booking-request.thunk';
import { fetchDeviceInUseByBookingRequestId } from '../../../redux/features/room-booking/thunk/fetch-devices-in-use-by-booking-request-id.thunk';

const AcceptBooking: React.FC<any> = () => {
  const dispatch = useAppDispatch();
  const navigate = useAppNavigation();
  const { bookingRoom } = useAppSelector((state) => state.roomBooking);

  const handleRejectBookingRequest = () => {
    dispatch(rejectBookingRequest(bookingRoom.id))
      .unwrap()
      .then(() => navigate.replace('TRACK_BOOKING_ROOM'))
      .catch(() =>
        alert('Error while processing your request. Please try again')
      );
  };

  const handleAcceptBookingRequest = () => {
    dispatch(acceptBookingRequest(bookingRoom.id))
      .unwrap()
      .then(() => navigate.navigate('SUCCESSFULLY_ACCEPTED_BOOKING_REQUEST'))
      .catch((e) => alert(e.message));
  };

  const handleRejectCheckout = () => {
    dispatch(rejectCheckoutBookingRequest(bookingRoom.id))
      .unwrap()
      .then(() => navigate.replace('TRACK_BOOKING_ROOM'))
      .catch(() =>
        alert('Error while processing your request. Please try again')
      );
  };

  const handleAcceptCheckout = () => {
    dispatch(acceptCheckoutBookingRequest(bookingRoom.id))
      .unwrap()
      .then(() => navigate.navigate('SUCCESSFULLY_ACCEPTED_BOOKING_REQUEST'))
      .catch((e) => alert(e.message));
  };

  const handleAcceptCheckin = () => {
    dispatch(acceptCheckinBookingRequest(bookingRoom.id))
      .unwrap()
      .then(() => navigate.navigate('SUCCESSFULLY_ACCEPTED_BOOKING_REQUEST'))
      .catch((e) => alert(e.message));
  };

  const handleRejectCheckin = () => {
    dispatch(rejectCheckinBookingRequest(bookingRoom.id))
      .unwrap()
      .then(() => navigate.replace('TRACK_BOOKING_ROOM'))
      .catch(() =>
        alert('Error while processing your request. Please try again')
      );
  };

  const handleAcceptAction = () => {
    if (bookingRoom.status === BOOKED) {
      return handleAcceptCheckin();
    } else if (bookingRoom.status === PENDING) {
      return handleAcceptBookingRequest();
    } else {
      return handleAcceptCheckout();
    }
  };

  const handleViewDevices = (id) => {
    dispatch(fetchDeviceInUseByBookingRequestId(id))
      .unwrap()
      .then((val) => {
        navigate.navigate('ACCEPT_BOOKING_LIST_DEVICES');
      });
  };

  const handleRejectAction = () => {
    if (bookingRoom.status === BOOKED) {
      return handleRejectCheckin();
    } else if (bookingRoom.status === PENDING) {
      return handleRejectBookingRequest();
    } else {
      return handleRejectCheckout();
    }
  };

  const handleStatusMessageConvert = () => {
    switch (bookingRoom.status) {
      case PENDING:
        return 'book';
      case BOOKED:
        return 'check-in';
      case CHECKED_IN:
        return 'check-out';
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: WHITE }}>
      <View style={styles.container}>
        <ScrollView
          style={{
            backgroundColor: WHITE,
          }}
          showsVerticalScrollIndicator={false}
        >
          <View>
            <View style={styles.header}>
              <TouchableOpacity onPress={() => navigate.pop()}>
                <ChevronLeftIcon
                  style={styles.backNavigation}
                  size={deviceWidth / 14}
                  color={FPT_ORANGE_COLOR}
                />
              </TouchableOpacity>
              <Text style={styles.headerTitleText}>
                {bookingRoom.status !== CANCELLED &&
                bookingRoom.status !== CHECKED_OUT
                  ? 'Incoming Booking Request'
                  : 'Review booking request'}
              </Text>
            </View>
            {bookingRoom.status !== CANCELLED &&
            bookingRoom.status !== CHECKED_OUT ? (
              <View style={styles.warningMessageContainer}>
                <ExclamationIcon
                  color={FPT_ORANGE_COLOR}
                  size={deviceWidth / 14}
                  style={styles.warningMessageIcon}
                />
                <Text style={styles.warningMessageText}>
                  Read the booking request information carefully before
                  proceeding the next step!
                </Text>
              </View>
            ) : null}
            {bookingRoom.status !== CANCELLED &&
            bookingRoom.status !== CHECKED_OUT ? (
              <Text style={styles.textStatus}>
                {bookingRoom.requestedBy} wants to{' '}
                {handleStatusMessageConvert()} the room {bookingRoom.roomName}
              </Text>
            ) : null}
            <Text style={styles.informationHeaderTitle}>
              BOOKING INFORMATION
            </Text>
            <View style={styles.bookingInformationContainer}>
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
                  onPress={() => handleViewDevices(bookingRoom.id)}
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

            {bookingRoom.status === CHECKED_OUT ? (
              <>
                <Text style={styles.informationHeaderTitle}>
                  CHECKED OUT INFORMATION
                </Text>
                <View style={styles.bookingInformationContainer}>
                  <View style={styles.dataRowContainer}>
                    <Text style={styles.titleText}>Checked-out At</Text>
                    <Text style={styles.valueText}>
                      {bookingRoom.checkoutSlot}
                    </Text>
                  </View>
                </View>
              </>
            ) : null}

            <View>
              <Text style={styles.informationHeaderTitle}>
                MORE INFORMATION
              </Text>
              <View
                style={[
                  styles.bookingInformationContainer,
                  { marginBottom: 20 },
                ]}
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

              {bookingRoom.status !== PENDING ? (
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
                  <View style={styles.signatureView}>
                    <View style={styles.dataRowContainer}></View>
                  </View>
                </View>
              ) : null}
            </View>
          </View>
        </ScrollView>
        {bookingRoom.status !== CANCELLED &&
        bookingRoom.status !== CHECKED_OUT ? (
          <AcceptBookingFooter
            handleReject={() => handleRejectAction()}
            handleAccept={() => handleAcceptAction()}
          />
        ) : null}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'column',
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  backNavigation: {
    marginTop: -10,
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
  textStatus: {
    fontWeight: '500',
    fontSize: deviceWidth / 23,
    alignSelf: 'center',
    marginTop: 10,
    textAlign: 'center',
  },
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
  signatureView: {
    marginTop: 10,
    display: 'flex',
    width: deviceWidth / 1.1,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: INPUT_GRAY_COLOR,
    alignSelf: 'center',
    height: 150,
  },
});

export default AcceptBooking;
