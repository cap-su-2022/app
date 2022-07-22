import React, { useEffect, useState } from 'react';
import {
  FlatList,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { FPT_ORANGE_COLOR, RED, WHITE } from '@app/constants';
import { deviceHeight, deviceWidth } from '../../utils/device';
import {
  ChevronDoubleLeftIcon,
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
      <View
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        <Text style={styles.title}>{title}</Text>
        <View style={styles.bookingNowContainer}>
          <Text style={styles.bookingNowButtonText}>
            {detail ? detail : 'N/A'}
          </Text>
        </View>
      </View>
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
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.bigTitle}>Review Your Booking Information</Text>
          <View style={styles.bookingInformationContainer}>
            {InfoDetail('Start Day:', roomBooking.fromDay)}
            {InfoDetail('Slot', `Slot ${roomBooking.toSlotNum}`)}
            {InfoDetail('Room Name:', roomBooking.roomName)}
            <Text style={styles.title}>List Device</Text>
            {/*<FlatList*/}
            {/*  data={roomBooking.devices}*/}
            {/*  renderItem={(device) => Device(device)}*/}
            {/*/>*/}
            {roomBooking.devices.map((device) => (
              <Device device={device} />
            ))}
          </View>
          <Text style={styles.bigTitle}>Additional Booking Information</Text>
          <View style={styles.bookingInformationContainer}>
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
                  value={description}
                  placeholder="Your description ..."
                  keyboardType="default"
                />
              </View>
            </View>
          </View>

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
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    padding: 20,
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
    backgroundColor: 'rgba(240, 110, 40, 0.2)',
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
  durationButton: {
    margin: 5,
    backgroundColor: 'rgba(240, 110, 40, 0.2)',
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
    fontSize: deviceWidth / 23,
    fontWeight: '700',
    marginBottom: 5,
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
  },
  checkBox: {
    alignSelf: 'center',
    borderWidth: 3,
    borderColor: FPT_ORANGE_COLOR,
    borderRadius: 8,
  },
  footerContainer: {
    height: 80,
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
    padding: 20,
    borderWidth: 1,
    borderRadius: 15,
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 1,
    },
    borderColor: FPT_ORANGE_COLOR,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  bookingDescriptionContainer: {
    flex: 1,
    height: '100%',
    paddingHorizontal: 10,
    borderWidth: 2,
    borderColor: WHITE,
    fontSize: 20,
    fontWeight: '600',
    borderRadius: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: 'rgba(240, 110, 40, 0.2)',
  },
});
