import React, { useEffect, useState } from 'react';
import {
  FlatList,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  BLACK,
  FPT_ORANGE_COLOR,
  GRAY,
  INPUT_GRAY_COLOR,
  RED,
  WHITE,
} from '@app/constants';
import { deviceHeight, deviceWidth } from '../../utils/device';
import {
  ChevronDoubleLeftIcon,
  ExclamationIcon,
  TicketIcon,
} from 'react-native-heroicons/outline';
import { useAppNavigation } from '../../hooks/use-app-navigation.hook';
import { useAppSelector } from '../../hooks/use-app-selector.hook';
import { useAppDispatch } from '../../hooks/use-app-dispatch.hook';
import { addNewRequestBooking } from '../../redux/features/room-booking/thunk/add-new-request-booking';
import { fetchAllBookingReason } from '../../redux/features/booking-reason/thunk/fetch-all';
import { BookingRoomReason } from '../../redux/models/booking-reason-response';
import SelectBookingReason from './request-room-booking/select-booking-reason';
import { Device } from '../../redux/models/device.model';
import Divider from '../../components/text/divider';
import dayjs from 'dayjs';
import { boxShadow } from '../../utils/box-shadow.util';

export const RoomBooking3: React.FC = () => {
  const navigate = useAppNavigation();
  const dispatch = useAppDispatch();
  const roomBooking = useAppSelector(
    (state) => state.roomBooking.addRoomBooking
  );
  const [bookingReasonSelections, setBookingReasonSelections] = useState([]);
  const [bookingReason, setBookingReason] = useState<string>();
  const [description, setDescription] = useState<string>('');

  useEffect(() => {
    dispatch(fetchAllBookingReason())
      .unwrap()
      .then((value) => {
        transformBookingReasonToBookingReasonPicker(value);
      });
    return () => {
      setBookingReasonSelections([]);
    };
  }, []);

  const transformBookingReasonToBookingReasonPicker = (
    val: BookingRoomReason[]
  ) => {
    const bookingReasonSelection = val.map((bookingRoomReason) => {
      return {
        value: bookingRoomReason.id,
        label: bookingRoomReason.name,
      };
    });
    setBookingReasonSelections(bookingReasonSelection);
    handleSetBookingRoomReason(bookingReasonSelection[0].value);
  };

  const handleSetBookingRoomReason = (value) => {
    if (value === undefined || value === null) {
      setBookingReason('Other');
    } else {
      setBookingReason(value);
    }
  };

  const handleNextStep = () => {
    dispatch(
      addNewRequestBooking({
        bookingReasonId: bookingReason,
        checkinDate: roomBooking.fromDay,
        checkinSlot: roomBooking.fromSlot,
        checkoutSlot: roomBooking.fromSlot,
        description: description,
        listDevice: roomBooking.devices,
        roomId: roomBooking.roomId,
      })
    )
      .unwrap()
      .then((e) => console.log(e))
      .then(() => navigate.navigate('ROOM_BOOKING_SUCCESS'))
      .catch(() => {
        alert('This room has already been booked. Please book another room');
        navigate.pop(2);
      });
  };

  const InfoDetail = (title, detail) => {
    return (
      <>
        <View style={styles.dataRowContainer}>
          <Text style={styles.titleText}>{title}</Text>
          <Text style={styles.valueText}>{detail}</Text>
        </View>
        <Divider num={deviceWidth / 9} />
      </>
    );
  };

  const Device: React.FC<{
    device: any;
  }> = (props) => {
    return (
      <View style={styles.historyContainer} key={props.device.id}>
        <View style={styles.bookingNowContainer}>
          <Text style={styles.bookingNowButtonText}>
            {props.device ? props.device.label : 'N/A'}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: WHITE }}>
      <Text
        style={{
          alignSelf: 'center',
          color: BLACK,
          fontSize: deviceWidth / 19,
          fontWeight: '600',
          paddingVertical: 10,
        }}
      >
        Proceed to book
      </Text>
      <ScrollView
        style={{
          marginTop: Platform.OS === 'android' ? 20 : 0,
        }}
      >
        <View style={styles.container}>
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
          <Text style={styles.informationHeaderTitle}>BOOKING INFORMATION</Text>
          <View style={{ padding: 10 }}>
            <View
              style={[styles.bookingInformationContainer, boxShadow(styles)]}
            >
              {InfoDetail(
                'Start Day',
                dayjs(roomBooking.fromDay).format('ddd DD/MM/YYYY')
              )}
              {InfoDetail('Slot', `Slot ${roomBooking.toSlotNum}`)}
              {InfoDetail('Room Name', roomBooking.roomName)}
              <Text style={[styles.titleText, { margin: 10 }]}>
                List Device
              </Text>
              {roomBooking.devices.map((device) => (
                <Device device={device} />
              ))}
            </View>
          </View>
          <Text style={styles.informationHeaderTitle}>
            ADDITIONAL BOOKING INFORMATION
          </Text>
          <View style={{ padding: 10, backgroundColor: WHITE }}>
            <View
              style={[styles.bookingInformationContainer, boxShadow(styles)]}
            >
              <SelectBookingReason
                handleSetBookingRoomReason={(val) => setBookingReason(val)}
                bookingReason={bookingReason}
                bookingReasonSelections={bookingReasonSelections}
              />
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                }}
              >
                <Text style={styles.title}>Description</Text>
                <View style={styles.bookingDescriptionContainer}>
                  <TextInput
                    onChangeText={(val) => setDescription(val)}
                    numberOfLines={5}
                    multiline={true}
                    maxLength={250}
                    style={{ textAlignVertical: 'top' }}
                    value={description}
                    placeholder="Your description ..."
                    keyboardType="default"
                  />
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
      <View style={styles.footerContainer}>
        <TouchableOpacity
          onPress={() => navigate.pop()}
          style={styles.reviewAgainContainer}
        >
          <ChevronDoubleLeftIcon color={RED} />
          <Text style={styles.reviewAgainText}>Review again</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleNextStep()}
          style={styles.bookNowButton}
        >
          <TicketIcon color={WHITE} />
          <Text
            style={{
              color: WHITE,
              fontSize: deviceWidth / 18,
              fontWeight: '600',
            }}
          >
            Book Now
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    flexGrow: 1,
    backgroundColor: WHITE,
  },
  bookNowButton: {
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: FPT_ORANGE_COLOR,
    width: deviceWidth / 2.2,
    height: 50,
    flexDirection: 'row',
  },
  bookingNowContainer: {
    flex: 1,
    height: deviceHeight / 13,
    paddingHorizontal: 10,
    borderWidth: 2,
    borderColor: WHITE,
    fontSize: 20,
    fontWeight: '600',
    borderRadius: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
  },
  bookingNowButtonText: {
    fontSize: deviceWidth / 25,
    fontWeight: '500',
  },

  bookingLaterContainer: {
    width: 250,
    height: 50,
    backgroundColor: FPT_ORANGE_COLOR,
    marginTop: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  bookingLaterButtonText: {
    color: WHITE,
    fontWeight: '600',
    fontSize: deviceWidth / 20,
  },
  historyContainer: {
    backgroundColor: WHITE,
  },
  historyText: {
    fontWeight: '700',
  },
  slotStart: {
    display: 'flex',
    flexDirection: 'row',
  },
  slotPicker: {
    margin: 5,
    backgroundColor: '#f2f2f2',
    height: 50,
    width: deviceWidth / 1.5,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
  durationButtonText: {
    fontSize: 24,
    fontWeight: '600',
  },
  title: {
    fontSize: deviceWidth / 26,
    fontWeight: '500',
    marginBottom: 5,
  },
  checkBox: {
    alignSelf: 'center',
    borderWidth: 3,
    borderColor: FPT_ORANGE_COLOR,
    borderRadius: 8,
  },
  footerContainer: {
    height: 80,
    borderTopWidth: 1,
    borderTopColor: INPUT_GRAY_COLOR,
    backgroundColor: WHITE,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  reviewAgainContainer: {
    display: 'flex',
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    borderWidth: 2,
    borderColor: RED,
    width: deviceWidth / 2.2,
    height: 50,
  },
  reviewAgainText: {
    fontSize: deviceWidth / 18,
    fontWeight: '600',
    color: RED,
  },
  bigTitle: {
    fontSize: deviceWidth / 20,
    fontWeight: '700',
    marginBottom: 5,
    marginVertical: 10,
  },
  bookingInformationContainer: {
    backgroundColor: WHITE,
    padding: 10,
    borderRadius: 15,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  bookingDescriptionContainer: {
    flex: 1,
    paddingHorizontal: 10,
    borderWidth: 2,
    borderColor: WHITE,
    fontSize: 20,
    fontWeight: '600',
    borderRadius: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#f2f2f2',
    height: Platform.OS === 'android' ? undefined : deviceHeight / 5.5,
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
