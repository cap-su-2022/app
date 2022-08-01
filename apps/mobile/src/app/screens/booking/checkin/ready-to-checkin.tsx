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
import {
  BLACK,
  FPT_ORANGE_COLOR,
  GRAY,
  INPUT_GRAY_COLOR,
  WHITE,
} from '@app/constants';
import { deviceHeight, deviceWidth } from '../../../utils/device';
import {
  ChevronLeftIcon,
  ClockIcon,
  HomeIcon,
  LibraryIcon,
  PencilIcon,
} from 'react-native-heroicons/outline';
import { SignatureViewRef } from 'react-native-signature-canvas';
import { useAppDispatch } from '../../../hooks/use-app-dispatch.hook';
import SignatureAlertModal from './signature-alert-modal';
import ReadyToCheckinBookingInformation from './booking-information';
import ReadyToCheckinMoreInformation from './more-information';
import ReadyToCheckinSignature from './signature';
import { attemptCheckinBookingRoom } from '../../../redux/features/room-booking/thunk/attempt-checkin-booking-room.thunk';
import { useAppSelector } from '../../../hooks/use-app-selector.hook';
import AlertModal from '../../../components/modals/alert-modal.component';
import QRCode from 'react-native-qrcode-svg';
import Divider from '../../../components/text/divider';
import dayjs from 'dayjs';

const RoomBookingReadyToCheckIn: React.FC<any> = () => {
  const navigate = useAppNavigation();
  const dispatch = useAppDispatch();

  const scrollView = useRef<ScrollView>(null);
  const signature = useRef<SignatureViewRef>(null);

  navigate.addListener('focus', (a) => {
    setHidden(false);
  });

  useEffect(() => {
    return () => {
      setHidden(false);
    };
  }, []);
  const [isScrollEnabled, setScrollEnabled] = useState<boolean>(true);

  const [isHidden, setHidden] = useState(false);

  const [isErrorModalShown, setErrorModalShown] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('Error');

  const bookingRoom = useAppSelector(
    (state) => state.roomBooking.currentCheckinInformation
  );

  const [isQRModalShown, setQRModalShown] = useState<boolean>(false);

  useEffect(() => {
    return () => {
      setQRModalShown(false);
      setErrorModalShown(false);
    };
  }, []);

  const handleGetData = () => {
    dispatch(
      attemptCheckinBookingRoom({
        id: bookingRoom.id,
      })
    )
      .unwrap()
      .then(() => setQRModalShown(!isQRModalShown))
      .catch(() => {
        setErrorMessage(
          'Failed while processing your request. Please try again.'
        );
        setErrorModalShown(true);
      });
  };

  const handleCheckinBookingRoom = () => {
    if (signature.current) {
      signature.current.readSignature();
      //    dispatch((currentCheckinInformation.id))
      //   .unwrap()
      //    .then(() => navigate.navigate('CHECKOUT_SUCCESSFULLY'))
      //    .catch((e) => alert('Failed while checking out booking room'));
    } else {
      setErrorMessage('Please sign the signature');
      setErrorModalShown(true);
    }
  };

  const ReadyToCheckinHeader: React.FC<any> = () => {
    return (
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backNavigation}
          onPress={() => navigate.pop()}
        >
          <ChevronLeftIcon size={deviceWidth / 14} color={FPT_ORANGE_COLOR} />
        </TouchableOpacity>
        <Text style={styles.headerTitleText}>
          Attempt to checkin booking room
        </Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: WHITE }}>
      <AlertModal
        isOpened={isQRModalShown}
        height={deviceHeight / 1.9}
        width={deviceWidth / 1.1}
        toggleShown={() => setQRModalShown(!isQRModalShown)}
      >
        <View
          style={{
            display: 'flex',
            justifyContent: 'space-evenly',
            alignItems: 'center',
            flexDirection: 'column',
            flex: 1,
            flexGrow: 0.9,
            paddingHorizontal: 10,
          }}
        >
          <View
            style={{
              alignItems: 'center',
            }}
          >
            <QRCode value={bookingRoom.id} size={deviceWidth / 2.5} />
            <Divider num={deviceWidth / 12} />
          </View>

          <View>
            <Text
              style={{
                fontSize: deviceWidth / 23,
                fontWeight: '600',
                textAlign: 'center',
              }}
            >
              Please let the librarian scan this QR in order to checkin
            </Text>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: deviceWidth / 1.4,
              }}
            >
              <LibraryIcon size={deviceWidth / 14} color={BLACK} />
              <Text
                style={{
                  fontWeight: '500',
                }}
              >
                Room {bookingRoom.roomName}
              </Text>
            </View>

            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: deviceWidth / 1.4,
              }}
            >
              <ClockIcon size={deviceWidth / 14} color={BLACK} />
              <Text
                style={{
                  fontWeight: '500',
                }}
              >
                Checkin at Slot {bookingRoom.checkinSlot}{' '}
                {dayjs(bookingRoom.checkinDate).format('ddd DD/MM/YYYY')}
              </Text>
            </View>

            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: deviceWidth / 1.4,
              }}
            >
              <ClockIcon size={deviceWidth / 14} color={BLACK} />
              <Text
                style={{
                  fontWeight: '500',
                }}
              >
                Checkout at Slot {bookingRoom.checkoutSlot}{' '}
                {dayjs(bookingRoom.checkinDate).format('ddd DD/MM/YYYY')}
              </Text>
            </View>
          </View>
        </View>
        <View
          style={{
            display: 'flex',
            justifyContent: 'space-evenly',
            alignItems: 'center',
            flexDirection: 'row',
            width: deviceWidth / 1.15,
          }}
        >
          <TouchableOpacity
            onPress={() => setQRModalShown(!isQRModalShown)}
            style={{
              height: 50,
              borderRadius: 8,
              width: deviceWidth / 3,
              display: 'flex',
              justifyContent: 'space-evenly',
              alignItems: 'center',
              borderColor: FPT_ORANGE_COLOR,
              borderWidth: 2,
              flexDirection: 'row',
            }}
          >
            <PencilIcon size={deviceWidth / 18} color={FPT_ORANGE_COLOR} />
            <Text
              style={{
                color: FPT_ORANGE_COLOR,
                fontWeight: '600',
                fontSize: deviceWidth / 23,
              }}
            >
              Sign again
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigate.replace('MAIN')}
            style={{
              height: 50,
              width: deviceWidth / 2.5,
              backgroundColor: FPT_ORANGE_COLOR,
              borderRadius: 8,
              display: 'flex',
              justifyContent: 'space-evenly',
              alignItems: 'center',
              flexDirection: 'row',
            }}
          >
            <HomeIcon size={deviceWidth / 18} color={WHITE} />
            <Text
              style={{
                color: WHITE,
                fontWeight: '600',
                fontSize: deviceWidth / 23,
              }}
            >
              Back to home
            </Text>
          </TouchableOpacity>
        </View>
      </AlertModal>
      <ReadyToCheckinHeader />
      <View style={styles.container}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          scrollEnabled={isScrollEnabled}
          ref={scrollView}
          bounces={false}
        >
          <ReadyToCheckinBookingInformation />
          <ReadyToCheckinMoreInformation />

        </ScrollView>
        <View style={styles.footer}>
          <TouchableOpacity
            onPress={() => handleGetData()}
            style={styles.checkOutButton}
          >
            <Text style={styles.checkOutButtonText}>Proceed to check in</Text>
          </TouchableOpacity>
        </View>
      </View>
      <SignatureAlertModal
        message={errorMessage}
        handleShown={() => setErrorModalShown(!isErrorModalShown)}
        isShown={isErrorModalShown}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexGrow: 1,
    flex: 1,
    justifyContent: 'space-between',
  },
  headerTitleText: {
    color: BLACK,
    fontWeight: '600',
    fontSize: deviceWidth / 21,
  },
  informationHeaderTitle: {
    marginTop: 20,
    color: GRAY,
    fontSize: deviceWidth / 23,
    fontWeight: '600',
    marginLeft: 20,
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
  },
  backNavigation: {
    display: 'flex',
    marginRight: 20,
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

  footer: {
    height: 80,
    backgroundColor: WHITE,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopColor: INPUT_GRAY_COLOR,
    borderTopWidth: 1,
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

export default RoomBookingReadyToCheckIn;
