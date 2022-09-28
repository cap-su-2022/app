import React, { useEffect, useState } from 'react';
import {
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
  ChevronDoubleLeftIcon, DeviceTabletIcon, ExclamationCircleIcon,
  ExclamationIcon, LibraryIcon,
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
import { addNewLongTermRequestBooking } from '../../redux/features/room-booking/thunk/add-long-term-request-booking';
import AlertModal from "../../components/modals/alert-modal.component";
import {updateAutoBookingRequest} from "../../redux/features/room-booking-v2/slice";
import {performAutoBooking} from "../../redux/features/room-booking-v2/thunk/perform-auto-booking.thunk";
import {Agenda} from "react-native-calendars";

export const RoomBooking3: React.FC = () => {
  const navigate = useAppNavigation();
  const dispatch = useAppDispatch();
 // const roomBooking = useAppSelector(
   // (state) => state.roomBooking.addRoomBooking
  //);
  const [bookingReasonSelections, setBookingReasonSelections] = useState([]);
  const [bookingReason, setBookingReason] = useState<string>();
  const [genericMessage, setGenericMessage] = useState<string>();
  const [isGenericModalShown, setGenericModalShown] = useState<boolean>(false);
  const [description, setDescription] = useState<string>('');
  const requests = useAppSelector((state) => state.bookedRequest.request.requests);

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

  const handleNewRequestBooking = () => {

    dispatch(performAutoBooking({
      description: description,
      bookingReasonId: bookingReason,
      requests: requests
    })) .unwrap()
      .then(() => navigate.navigate('ROOM_BOOKING_SUCCESS'))
      .catch((e) => {
        alert(e.message);
        navigate.pop(3);
      });

  /*  dispatch(
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
      .then(() => navigate.navigate('ROOM_BOOKING_SUCCESS'))
      .catch((e) => {
        alert(e.message.message);
        navigate.pop(3);
      });*/
  };
/*
  const handleNewLongTermRequestBooking = () => {
    dispatch(
      addNewLongTermRequestBooking({
        bookingReasonId: bookingReason,
        checkinDate: roomBooking.fromDay,
        checkoutDate: roomBooking.toDay,
        checkinSlot: roomBooking.fromSlot,
        checkoutSlot: roomBooking.toSlot,
        description: description,
        listDevice: roomBooking.devices,
        roomId: roomBooking.roomId,
      })
    )
      .unwrap()
      .then(() => {
        setGenericMessage('Success Booking')
        setGenericModalShown(!isGenericModalShown)
      })
      .catch((e) => {
        alert(e.message.message);
        navigate.pop(3);
      });
  };*/

  const handleNextStep = () => {
    handleNewRequestBooking();
  };



  const GenericAlertModal = ({ message }) => {
    return (
      <AlertModal
        isOpened={isGenericModalShown}
        height={150}
        width={deviceWidth / 1.1}
        toggleShown={() => setGenericModalShown(!isGenericModalShown)}
      >
        <View
          style={{
            display: 'flex',
            flex: 1,
            flexGrow: 0.9,
            justifyContent: 'space-evenly',
            paddingHorizontal: 10,
          }}
        >
          <ExclamationCircleIcon
            style={{
              alignSelf: 'center',
            }}
            size={deviceWidth / 8}
            color={FPT_ORANGE_COLOR}
          />
          <Text
            style={{
              color: BLACK,
              fontWeight: '500',
              fontSize: deviceWidth / 23,
              textAlign: 'center',
            }}
          >
            {message}
          </Text>
          <TouchableOpacity
            onPress={() => navigate.replace('MAIN')}
            style={{
              backgroundColor: FPT_ORANGE_COLOR,
              height: 40,
              borderRadius: 8,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Text
              style={{
                fontWeight: '500',
                fontSize: deviceWidth / 23,
                color: WHITE,
              }}
            >
              Close
            </Text>
          </TouchableOpacity>
        </View>
      </AlertModal>
    );
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
      <View style={styles.historyContainer} key={props.device}>
        <View style={styles.bookingNowContainer}>
          <Text style={styles.bookingNowButtonText}>
            {props.device ? `${props.device.label}` : 'N/A'}
          </Text>
          <Text style={styles.bookingNowButtonText}>
            {props.device ? `Quantity: ${props.device.quantity}` : 'N/A'}
          </Text>
        </View>
      </View>
    );
  };

  const MyCustomList = (props) => {
    useEffect(() => {
      console.log(props);
    }, []);
    return (
      <ScrollView>
        {props.items?.map((item) => {
          const bookingRequests = Object.entries(item)[0][1] as any[];
          return (
            <View style={{
              alignSelf: 'center',
              width: deviceWidth / 1.05,
              backgroundColor: WHITE,
              borderBottomLeftRadius: 8,
              borderBottomRightRadius: 8,
              ...boxShadow(styles),
              paddingBottom: 10,
            }}>
              <Text style={{paddingVertical: 10, alignSelf: 'center', color: BLACK, fontSize: deviceWidth / 23, fontWeight: '600'}}>
                Booking request {bookingRequests.length > 1 ? 's' : ''} for {dayjs(Object.keys(item)[0]).format('ddd DD/MM/YYYY')}
              </Text>
              {bookingRequests?.map((request) => {
              return (
                <View style={{
                  alignSelf: 'center',
                  height: 80,
                  width: deviceWidth / 1.15,
                  borderRadius: 8,
                  borderColor: FPT_ORANGE_COLOR,
                  borderWidth: 2,
                  flexDirection: 'row',
                  backgroundColor: WHITE,
                  display: 'flex',
                  justifyContent: 'space-around',
                  alignItems: 'center'
                }}>
                  <View style={{
                    height: 50,
                    width: 50,
                    borderRadius: 50,
                    borderColor: FPT_ORANGE_COLOR,
                    borderWidth: 2,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}>
                    <LibraryIcon color={FPT_ORANGE_COLOR}/>
                  </View>
                    <View>
                      <View style={{flexDirection: 'row'}}>
                        <Text style={{color: GRAY, fontSize: deviceWidth / 24, fontWeight: '600'}}>
                          Check-in at:
                        </Text>
                        <Text style={{paddingLeft: 8, color: BLACK, fontSize: deviceWidth / 24, fontWeight: '600'}}>
                          {request.timeStart}
                        </Text>
                      </View>
                      <View style={{flexDirection: 'row'}}>
                        <Text style={{color: GRAY, fontSize: deviceWidth / 24, fontWeight: '600'}}>
                          Check-out at:
                        </Text>
                        <Text style={{paddingLeft: 8, color: BLACK, fontSize: deviceWidth / 24, fontWeight: '600'}}>
                          {request.timeEnd}
                        </Text>
                      </View>
                      <View style={{flexDirection: 'row'}}>
                        <Text style={{color: GRAY, fontSize: deviceWidth / 24, fontWeight: '600'}}>
                          Capacity:
                        </Text>
                        <Text style={{paddingLeft: 8, color: BLACK, fontSize: deviceWidth / 24, fontWeight: '600'}}>
                          {request.capacity}
                        </Text>
                      </View>
                    </View>
                  <View>
                    <TouchableOpacity style={{
                      height: 35,
                      width: 35,
                      borderRadius: 8,
                      borderWidth: 2,
                      borderColor: FPT_ORANGE_COLOR,
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center'
                    }} onPress={() => alert("View device")}>
                      <DeviceTabletIcon color={FPT_ORANGE_COLOR} size={deviceWidth / 16}/>
                    </TouchableOpacity>
                  </View>
                </View>

              );
              })}

            </View>
          );
        })}
      </ScrollView>
    );
  }

  const [agendaData, setAgendaData] = useState<unknown>();
  const [markedDates, setMarkedDates] = useState<any>();

  useEffect(() => {
    let agenda = {};
    agenda = requests?.map((request) => {
     return {
       ...agenda,
      [request.date]: [{...request, day: request.date}],
      };
    })
    console.log(JSON.stringify(agenda))
    setAgendaData(agenda);

    let marked = {};
    marked = requests?.map((request, index) => {
      return {
        ...marked,
        [request.date]: {
           selected: index === 0,
          marked: true,
        }
      }
    });
    console.log(marked);
    setMarkedDates(marked)
  }, [requests]);


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
          <Agenda
            renderList={listProps => {
              return <MyCustomList {...listProps} />;
            }}
            // The list of items that have to be displayed in agenda. If you want to render item as empty date
            // the value of date key has to be an empty array []. If there exists no value for date key it is
            // considered that the date in question is not yet loaded
            items={agendaData}
            onDayPress={(date) => alert("Chút code tiếp")}
            // Initially selected day
            selected={requests[0]?.date}
            // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
            minDate={requests[0]?.date}
            // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
            maxDate={requests[requests?.length - 1]?.date}
            // By default, agenda dates are marked if they have at least one item, but you can override this if needed
            markedDates={markedDates}
            contentContainerStyle={{
              marginBottom: 10,
            }}
          />
          <Text style={styles.informationHeaderTitle}>
            ADDITIONAL BOOKING INFORMATION
          </Text>
          <View style={{ padding: 10, backgroundColor: WHITE }}>
            <View
              style={[styles.bookingInformationContainer, boxShadow(styles)]}
            >
              {bookingReasonSelections ? <SelectBookingReason
                handleSetBookingRoomReason={(val) => setBookingReason(val)}
                bookingReason={bookingReason}
                bookingReasonSelections={bookingReasonSelections}
              /> : null}
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
      <GenericAlertModal message={genericMessage}/>
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
