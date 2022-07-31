import React, { useEffect } from 'react';
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

const AcceptFeedback: React.FC<any> = () => {
  const dispatch = useAppDispatch();
  const navigate = useAppNavigation();
  const { feedback } = useAppSelector((state) => state.feedback);
  const authUser = useAppSelector((state) => state.auth.authUser);

  const handleRejectBookingRequest = () => {
    dispatch(rejectBookingRequest(feedback.id))
      .unwrap()
      .then(() => navigate.replace('TRACK_BOOKING_ROOM'))
      .catch(() =>
        alert('Error while processing your request. Please try again')
      );
  };

  const handleAcceptBookingRequest = () => {
    dispatch(acceptBookingRequest(feedback.id))
      .unwrap()
      .then(() => navigate.navigate('SUCCESSFULLY_ACCEPTED_FEEDBACK'))
      .catch((e) => alert(e.message));
  };

  const handleRejectCheckout = () => {
    dispatch(rejectCheckoutBookingRequest(feedback.id))
      .unwrap()
      .then(() => navigate.replace('TRACK_BOOKING_ROOM'))
      .catch(() =>
        alert('Error while processing your request. Please try again')
      );
  };

  const handleAcceptCheckout = () => {
    dispatch(acceptCheckoutBookingRequest(feedback.id))
      .unwrap()
      .then(() => navigate.navigate('SUCCESSFULLY_ACCEPTED_FEEDBACK'))
      .catch((e) => alert(e.message));
  };

  const handleAcceptCheckin = () => {
    dispatch(acceptCheckinBookingRequest(feedback.id))
      .unwrap()
      .then(() => navigate.navigate('SUCCESSFULLY_ACCEPTED_FEEDBACK'))
      .catch((e) => alert(e.message));
  };

  const handleRejectCheckin = () => {
    dispatch(rejectCheckinBookingRequest(feedback.id))
      .unwrap()
      .then(() => navigate.replace('TRACK_BOOKING_ROOM'))
      .catch(() =>
        alert('Error while processing your request. Please try again')
      );
  };

  const handleAcceptAction = () => {
    if (feedback.status === BOOKED) {
      return handleAcceptCheckin();
    } else if (feedback.status === PENDING) {
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
    if (feedback.status === BOOKED) {
      return handleRejectCheckin();
    } else if (feedback.status === PENDING) {
      return handleRejectBookingRequest();
    } else {
      return handleRejectCheckout();
    }
  };

  const handleStatusMessageConvert = () => {
    switch (feedback.status) {
      case PENDING:
        return 'book';
      case BOOKED:
        return 'check-in';
      case CHECKED_IN:
        return 'check-out';
    }
  };

  const renderFooter = () => {
    if (
      authUser.role === 'Staff' &&
      (feedback.status === 'BOOKED' || feedback.status === 'PENDING')
    ) {
      return (
        <></>
      );
    }
    return feedback.status !== CANCELLED &&
    feedback.status !== CHECKED_OUT ? (
      <AcceptBookingFooter
        handleReject={() => handleRejectAction()}
        handleAccept={() => handleAcceptAction()}
      />
    ) : null;
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: WHITE }}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigate.pop()}>
            <ChevronLeftIcon
              style={styles.backNavigation}
              size={deviceWidth / 14}
              color={FPT_ORANGE_COLOR}
            />
          </TouchableOpacity>
          <Text style={styles.headerTitleText}>
            {feedback.status !== CANCELLED &&
            feedback.status !== CHECKED_OUT
              ? 'Incoming feedback'
              : 'Review feedback'}
          </Text>
        </View>
        <ScrollView
          style={{
            backgroundColor: WHITE,
          }}
          showsVerticalScrollIndicator={false}
        >
          <View>
            {authUser.role !== 'Staff' &&
            feedback.status !== CANCELLED &&
            feedback.status !== CHECKED_OUT ? (
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
            {authUser.role !== 'Staff' &&
            feedback.status !== CANCELLED &&
            feedback.status !== CHECKED_OUT ? (
              <Text style={styles.textStatus}>
                {feedback.createdBy} sent the feedback
              </Text>
            ) : null}
            <Text style={styles.informationHeaderTitle}>
              BOOKING INFORMATION
            </Text>
            <View style={styles.bookingInformationContainer}>
              <View style={styles.dataRowContainer}>
                <Text style={styles.titleText}>Created By</Text>
                <Text style={styles.valueText}>{feedback.createdBy}</Text>
              </View>

              <View style={styles.dataRowContainer}>
                <Text style={styles.titleText}>Created at</Text>
                <Text style={styles.valueText}>
                  {feedback.createdAt} -{' '}
                  {dayjs(new Date(feedback.createdAt)).format(
                    'DD/MM/YYYY'
                  )}
                </Text>
              </View>

              <Divider num={deviceWidth / 10} />

              <View style={styles.dataRowContainer}>
                <Text style={styles.titleText}>Feedback type</Text>
                <Text style={styles.valueText}>{feedback.feedbackType}</Text>
              </View>
            </View>


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
                  <Text style={styles.titleText}>Feeback ID</Text>
                  <Text style={styles.valueText}>{feedback.id}</Text>
                </View>

                  <>
                    <Divider num={deviceWidth / 10} />
                    <View style={styles.dataRowContainer}>
                      <Text style={styles.titleText}>Message</Text>
                      <Text style={styles.valueText}>
                        {feedback.feedbackMess}
                      </Text>
                    </View>
                  </>
              </View>

            </View>
          </View>
        </ScrollView>
        {renderFooter()}
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
  footer: {
    height: 80,
    backgroundColor: WHITE,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopColor: INPUT_GRAY_COLOR,
    borderTopWidth: 1,
  },
  cancelBookingRequestButton: {
    height: 50,
    width: deviceWidth / 1.35,
    borderRadius: 8,
    backgroundColor: FPT_ORANGE_COLOR,
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexDirection: 'row',
  },
  cancelBookingRequestButtonText: {
    fontWeight: '600',
    fontSize: deviceWidth / 20,
    color: WHITE,
  },
});

export default AcceptFeedback;