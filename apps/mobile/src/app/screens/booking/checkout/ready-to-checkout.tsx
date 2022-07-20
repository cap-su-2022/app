import React, { useEffect, useRef, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useAppNavigation } from '../../../hooks/use-app-navigation.hook';
import { BLACK, FPT_ORANGE_COLOR, GRAY, WHITE } from '@app/constants';
import { deviceHeight, deviceWidth } from '../../../utils/device';
import {
  ChevronDoubleRightIcon,
  DeviceMobileIcon,
  DeviceTabletIcon,
  ExclamationCircleIcon,
  ExclamationIcon,
  LibraryIcon,
} from 'react-native-heroicons/outline';
import Divider from '../../../components/text/divider';
import Signature, { SignatureViewRef } from 'react-native-signature-canvas';
import QRCode from 'react-native-qrcode-svg';
import AlertModal from '../../../components/modals/alert-modal.component';
import { enableScreens } from 'react-native-screens';
import { fetchCurrentCheckoutInformation } from '../../../redux/features/room-booking/thunk/fetch-current-checkout-information.thunk';
import { useAppDispatch } from '../../../hooks/use-app-dispatch.hook';
import dayjs from 'dayjs';
import { checkOutBookingRoom } from '../../../redux/features/room-booking/thunk/checkout-booking-room.thunk';

const RoomBookingReadyToCheckOut: React.FC<any> = () => {
  const navigate = useAppNavigation();
  const dispatch = useAppDispatch();

  const scrollView = useRef<ScrollView>(null);
  const signature = useRef<SignatureViewRef>(null);

  const [roomBooking, setRoomBooking] = useState<{
    id: string;
    description: string;
    status: string;
    bookingReason: string;
    requestedBy: string;
    requestedAt: string;
    acceptedBy: string;
    acceptedAt: string;
    checkinSlot: number;
    checkoutSlot: number;
    checkedInAt: string;
    roomName: string;
    roomType: string;
    checkinDate: string;
  }>(
    {} as {
      id: string;
      description: string;
      status: string;
      bookingReason: string;
      requestedBy: string;
      requestedAt: string;
      acceptedBy: string;
      acceptedAt: string;
      checkinSlot: number;
      checkoutSlot: number;
      checkedInAt: string;
      roomName: string;
      roomType: string;
      checkinDate: string;
    }
  );

  navigate.addListener('focus', (a) => {
    setHidden(false);
  });

  useEffect(() => {
    dispatch(fetchCurrentCheckoutInformation())
      .unwrap()
      .then((e) => {
        setRoomBooking(e);
        return e;
      })
      .then((e) => (!e.id ? navigate.navigate('NO_ROOM_CHECKOUT') : null))
      .catch(() => alert('Failed while fetching data'));
  }, []);

  useEffect(() => {
    return () => {
      setHidden(false);
    };
  }, []);
  const [isScrollEnabled, setScrollEnabled] = useState<boolean>(true);

  const [isHidden, setHidden] = useState(false);

  const [isErrorModalShown, setErrorModalShown] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('Error');

  const handleGetData = (e) => {};

  const handleCheckoutBookingRoom = () => {
    if (signature.current) {
      signature.current.readSignature();
      alert(roomBooking.id);
      dispatch(checkOutBookingRoom(roomBooking.id))
        .unwrap()
        .then(() => navigate.navigate('CHECKOUT_SUCCESSFULLY'))
        .catch((e) => alert('Failed while checking out booking room'));
    } else {
      alert('Please sign the signature');
    }
  };

  const ErrorAlertModal: React.FC = () => {
    return (
      <AlertModal
        isOpened={isErrorModalShown}
        height={deviceWidth / 1.25}
        width={deviceWidth / 1.25}
        toggleShown={() => setErrorModalShown(!isErrorModalShown)}
      >
        <View
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexGrow: 0.3,
          }}
        >
          <View>
            <ExclamationCircleIcon
              color={FPT_ORANGE_COLOR}
              size={deviceHeight / 13}
            />
            <Text
              style={{
                color: BLACK,
                fontSize: deviceWidth / 23,
                fontWeight: '500',
                textAlign: 'center',
              }}
            >
              {errorMessage}
            </Text>
          </View>
          <View>
            <TouchableOpacity
              style={{
                width: deviceWidth / 1.5,
                height: 50,
                borderRadius: 8,
                backgroundColor: FPT_ORANGE_COLOR,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Text
                style={{
                  fontSize: deviceWidth / 21,
                  fontWeight: '600',
                  color: WHITE,
                }}
              >
                Close
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </AlertModal>
    );
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <ScrollView
          scrollEnabled={isScrollEnabled}
          ref={scrollView}
          bounces
          style={styles.bodyContainer}
        >
          <View>
            <Text style={styles.bookingInforHeaderText}>BOOKING DETAIL</Text>
          </View>
          <View style={styles.bookingInforBody}>
            <View
              style={{
                marginTop: 10,
                marginLeft: 10,
                marginRight: 10,
              }}
            >
              <View style={styles.bookingInforHeader}>
                <View style={styles.roomIconContainer}>
                  <LibraryIcon
                    color={FPT_ORANGE_COLOR}
                    size={deviceWidth / 17}
                  />
                </View>
                <Text style={styles.bookingInforHeaderName}>
                  {roomBooking.roomName}
                </Text>
              </View>

              <View
                style={{
                  marginTop: 10,
                  marginBottom: 10,
                }}
              >
                <View style={styles.bookingInforSlotInfo}>
                  <View style={styles.slotStart}>
                    <Text style={styles.slotStartTimeText}>07:00</Text>
                    <Text style={styles.slotStartSlotText}>Slot 1</Text>
                  </View>

                  <View style={styles.slotNavigation}>
                    <ChevronDoubleRightIcon
                      size={deviceWidth / 12}
                      color={BLACK}
                    />
                  </View>
                  <View style={styles.slotEnd}>
                    <Text style={styles.slotEndTimeText}>17:30</Text>
                    <Text style={styles.slotEndSlotText}>Slot 6</Text>
                  </View>
                </View>
              </View>

              <Divider num={deviceWidth / 13} />

              <View
                style={{
                  marginTop: 10,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
              >
                <View style={styles.bookingInforDetail}>
                  <Text style={styles.bookingInforDetailTitle}>Booked by</Text>
                  <Text
                    style={{
                      fontSize: deviceWidth / 23,
                      fontWeight: '600',
                      color: BLACK,
                    }}
                  >
                    bangnn
                  </Text>
                </View>
                <View style={[styles.bookingInforDetail, { marginTop: 5 }]}>
                  <Text style={styles.bookingInforDetailTitle}>Booked at</Text>
                  <Text
                    style={{
                      fontSize: deviceWidth / 23,
                      fontWeight: '600',
                      color: BLACK,
                    }}
                  >
                    {dayjs(roomBooking.requestedAt).format('HH:mm DD/MM/YYYY')}
                  </Text>
                </View>
                <View style={[styles.bookingInforDetail, { marginTop: 5 }]}>
                  <Text style={styles.bookingInforDetailTitle}>
                    Checked-in at
                  </Text>
                  <Text
                    style={{
                      fontSize: deviceWidth / 23,
                      fontWeight: '600',
                      color: BLACK,
                    }}
                  >
                    {dayjs(roomBooking.checkedInAt).format('HH:mm DD/MM/YYYY')}
                  </Text>
                </View>
              </View>

              <Divider num={deviceWidth / 13} />

              <View
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: 10,
                }}
              >
                <View
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                  }}
                >
                  <QRCode size={deviceWidth / 5} value={roomBooking.id} />
                  <Text
                    style={{
                      color: BLACK,
                      marginTop: 5,
                    }}
                  >
                    {roomBooking.id}
                  </Text>
                </View>
                <Text
                  style={{
                    color: BLACK,
                    fontWeight: '500',
                  }}
                >
                  Use this code if you want to check-out at the librarian
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.deviceDetailContainer}>
            <Text style={styles.deviceDetailHeaderText}>DEVICE(S) DETAIL</Text>
            <View style={styles.deviceDetailWrapper}>
              <View style={styles.deviceContainer}>
                <View style={styles.deviceIconContainer}>
                  <DeviceMobileIcon
                    color={FPT_ORANGE_COLOR}
                    size={deviceWidth / 13}
                  />
                </View>
                <View style={styles.deviceDetailInfoContainer}>
                  <Text style={styles.deviceDetailName}>
                    Name: Charging Socket Station
                  </Text>
                  <Text style={styles.deviceDetailName}>Quantity: 2</Text>
                  <Text style={styles.deviceDetailName}>
                    Requested at: 12:12 15/06/2022
                  </Text>
                </View>
              </View>
            </View>
          </View>

          <View style={styles.signatureContainer}>
            <View style={styles.signatureWrapper}>
              <Text style={styles.signatureTitleHeader}>
                CHECK-OUT SIGNATURE
              </Text>
              <TouchableOpacity
                onPress={() => {
                  setHidden(true);
                  if (signature) {
                    signature.current.clearSignature();
                    signature.current.draw();
                  }
                }}
                style={styles.clearSignatureButton}
              >
                <Text style={styles.clearSignatureButtonText}>CLEAR</Text>
              </TouchableOpacity>
            </View>
            <View
              onTouchStart={() => (!isHidden ? setHidden(true) : null)}
              style={styles.signatureBoard}
            >
              {isHidden ? (
                <Signature
                  ref={signature}
                  onEmpty={() => {
                    scrollView.current.scrollTo({
                      x: undefined,
                      y: deviceHeight - 100,
                      animated: true,
                    });
                    setErrorMessage(
                      'You must sign first so as to proceed to check out!'
                    );
                    setErrorModalShown(true);
                  }}
                  onOK={(e) => handleGetData(e)}
                  onBegin={() => {
                    setScrollEnabled(false);
                  }}
                  onEnd={() => setScrollEnabled(true)}
                  style={{
                    borderRadius: 8,
                  }}
                />
              ) : null}
            </View>
          </View>
        </ScrollView>
        <View style={styles.footer}>
          <TouchableOpacity
            onPress={() => handleCheckoutBookingRoom()}
            style={styles.checkOutButton}
          >
            <Text style={styles.checkOutButtonText}>Proceed to check out</Text>
          </TouchableOpacity>
        </View>
      </View>
      <ErrorAlertModal />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    flexGrow: 1,
  },
  bookingInforHeaderText: {
    color: GRAY,
    fontSize: deviceWidth / 24,
    fontWeight: '600',
    display: 'flex',
    marginBottom: 5,
  },
  bookingInforBody: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: deviceWidth / 1.05,
    height: 410,
    backgroundColor: WHITE,
    borderRadius: 8,
  },
  bookingInforHeader: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  bookingInforHeaderName: {
    fontWeight: '600',
    fontSize: deviceWidth / 21,
    color: BLACK,
    marginLeft: 10,
  },
  bookingInforSlotInfo: {
    display: 'flex',
    justifyContent: 'space-around',
    flexDirection: 'row',
  },
  roomIconContainer: {
    height: 40,
    width: 40,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: FPT_ORANGE_COLOR,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  slotStart: {
    display: 'flex',
  },
  slotStartTimeText: {
    fontSize: deviceWidth / 17,
    fontWeight: '600',
    color: BLACK,
  },
  slotStartSlotText: {
    fontSize: deviceWidth / 23,
    fontWeight: '600',
    color: BLACK,
    textAlign: 'center',
  },
  slotNavigation: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  slotEnd: {
    display: 'flex',
  },
  slotEndTimeText: {
    fontSize: deviceWidth / 17,
    fontWeight: '600',
    color: BLACK,
  },
  slotEndSlotText: {
    fontSize: deviceWidth / 23,
    fontWeight: '600',
    color: BLACK,
    textAlign: 'center',
  },
  bookingInforDetail: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  bookingInforDetailTitle: {
    fontSize: deviceWidth / 23,
    fontWeight: '600',
  },
  bodyContainer: {
    marginLeft: 10,
    marginTop: 10,
    flex: 1,
  },
  footer: {
    height: 90,
    backgroundColor: WHITE,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkOutButton: {
    backgroundColor: FPT_ORANGE_COLOR,
    borderRadius: 8,
    height: 50,
    width: deviceWidth / 1.25,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkOutButtonText: {
    color: WHITE,
    fontSize: deviceWidth / 18,
    fontWeight: '600',
  },
  deviceContainer: {
    marginLeft: 10,
    marginRight: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  deviceDetailContainer: {
    marginTop: 20,
  },
  deviceDetailWrapper: {
    width: deviceWidth / 1.05,
    height: 100,
    backgroundColor: WHITE,
    borderRadius: 8,
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
  },
  deviceDetailInfoContainer: {
    display: 'flex',
    flexDirection: 'column',
    marginLeft: 10,
  },
  deviceDetailHeaderText: {
    color: GRAY,
    fontSize: deviceWidth / 23,
    fontWeight: '600',
    marginBottom: 5,
  },
  deviceIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: FPT_ORANGE_COLOR,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  deviceDetailName: {
    color: BLACK,
    fontWeight: '500',
  },
  signatureContainer: {
    marginTop: 20,
    height: 220,
  },
  signatureWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  signatureTitleHeader: {
    color: GRAY,
    fontWeight: '600',
    fontSize: deviceWidth / 23,
    marginBottom: 5,
  },
  clearSignatureButton: {
    backgroundColor: GRAY,
    borderRadius: 50,
    width: 55,
    height: 25,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  clearSignatureButtonText: {
    color: WHITE,
    fontSize: deviceWidth / 28,
    fontWeight: '600',
  },
  signatureBoard: {
    height: 150,
    width: deviceWidth / 1.05,
    backgroundColor: WHITE,
    borderRadius: 8,
  },
});

export default RoomBookingReadyToCheckOut;
